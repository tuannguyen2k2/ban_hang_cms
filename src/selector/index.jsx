import { createSelector } from '@reduxjs/toolkit';

export const accountSelector = (state) => state.account;
export const selectActionLoading = (type) =>
    createSelector(
        (state) => state.app[type],
        (loading) => loading
    );
