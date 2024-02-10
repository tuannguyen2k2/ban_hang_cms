import { useSelector } from 'react-redux';

import { selectActionLoading } from '../selector/index';

const useActionLoading = (actionType) => {
    const loading = useSelector(selectActionLoading(actionType));

    return { loading };
};

export default useActionLoading;
