import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { showAppLoading, hideAppLoading, toggleActionLoading } from '../store/slice/appSlice';
import useActionLoading from './useActionLoading';
import { createFailureActionType, createSuccessActionType } from '../store/utils';
import { loadingType } from '../constants';

const handleByType = (typeConfig, handler) => {
    if (!typeConfig) {
        return;
    }

    if (Array.isArray(typeConfig)) {
        for (let type of typeConfig) {
            handler?.[type]?.();
        }
    } else {
        handler?.[typeConfig]?.();
    }
};

const coverFunction = (func, data, ...restParams) => {
    if (typeof func !== 'function') {
        return data;
    }

    return func(data, ...restParams);
};

const useFetchAction = (
    action,
    { immediate = false, prepareSuccessData, payload, loading = loadingType.REDUX } = {}
) => {
    const dispatch = useDispatch();
    const isLoading = useActionLoading(action.type);

    const execute = async (payload = {}) => {
        handleByType(loading, {
            [loadingType.REDUX]: () => dispatch(toggleActionLoading({ type: action.type, isLoading: true })),
            [loadingType.APP]: () => dispatch(showAppLoading()),
        });

        try {
            const response = await new Promise((resolve, reject) => {
                dispatch(
                    action({
                        ...payload,
                        onCompleted: (response) => resolve(response?.data || {}),
                        onError: reject,
                    })
                );
            });

            dispatch({
                type: createSuccessActionType(action.type),
                payload: coverFunction(prepareSuccessData, response, payload),
            });
        } catch (error) {
            console.log({ error });
            dispatch({ type: createFailureActionType(action.type), payload: error });
        } finally {
            handleByType(loading, {
                [loadingType.REDUX]: () => dispatch(toggleActionLoading({ type: action.type, isLoading: false })),
                [loadingType.APP]: () => dispatch(hideAppLoading()),
            });
        }
    };

    useEffect(() => {
        if (immediate) {
            execute(payload);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { execute, loading: isLoading };
};

useFetchAction.LOADING_TYPE = loadingType;

export default useFetchAction;
