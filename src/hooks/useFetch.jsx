import { sendRequest } from '../services/api';
import { useCallback, useEffect, useState } from 'react';
import { apiUrl } from '../constants';
import useIsMounted from './useIsMounted';

const useFetch = (apiConfig, { immediate = false, mappingData, params = {}, pathParams = {} } = {}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const isMounted = useIsMounted();
    const execute = useCallback(
        async ({ onCompleted, onError, ...payload } = {}, cancelType) => {
            if (isMounted()) {
                setLoading(true);
                setError(null);
            }
            try {
                const { data } = await sendRequest(apiConfig, { params, pathParams, ...payload }, cancelType);
                if (!data.result && data.statusCode !== 200) {
                    throw data;
                }
                if (isMounted()) {
                    !cancelType && setData(mappingData ? mappingData(data) : data);
                }
                onCompleted?.(data);
                return data;
            } catch (error) {
                if (isMounted()) {
                    !cancelType && setError(error);
                }
                onError?.(error);
                return error;
            } finally {
                if (isMounted()) {
                    !cancelType && setLoading(false);
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [apiConfig]
    );
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { loading, execute, data, error, setData };
};

export default useFetch;
