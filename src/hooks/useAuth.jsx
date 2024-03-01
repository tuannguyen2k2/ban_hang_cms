import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { UserRole } from '../constants';
import { profileSelector } from '../selector';
import { getCacheAccessToken } from '../services/userService';
import { getProfile } from '../store/slice/accountSlice';
import useActionLoading from './useActionLoading';
import useFetchAction from './useFetchAction';

const useAuth = () => {
    const profile = useSelector(profileSelector);
    const token = getCacheAccessToken();

    const immediate = !!token && !profile;

    useFetchAction(getProfile, { immediate });

    const { loading } = useActionLoading(getProfile.type);

    const role = profile?.role;
    const isAdmin = useCallback(() => {
        return role === UserRole.ADMIN;
    }, [role]);
    const isUser = useCallback(() => {
        return role === UserRole.USER;
    }, [role]);

    return {
        isAdmin,
        isUser,
        isAuthenticated: !!profile,
        profile,
        token,
        loading: immediate || loading,
    };
};

export default useAuth;
