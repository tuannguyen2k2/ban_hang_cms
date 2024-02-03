import { createSlice } from '@reduxjs/toolkit';
import { createFailureActionType } from '../utils';
export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        profile: null,
    },
    reducers: {
        login: (state, action) => {},
        getProfile: (state, action) => {
            state.profile = action.payload;
        },
    },
});

export const { login, getProfile, getProfileFailure } = accountSlice.actions;
export default accountSlice.reducer;
