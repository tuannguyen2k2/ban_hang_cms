import { createSelector } from '@reduxjs/toolkit';

export const profileSelector = (state) => state.account.profile;
export const selectActionLoading = (type) =>
    createSelector(
        (state) => state.app[type],
        (loading) => loading
    );
