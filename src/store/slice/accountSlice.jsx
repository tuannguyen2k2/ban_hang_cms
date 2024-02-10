import { createSlice } from '@reduxjs/toolkit';
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
        logout: (state, action) => {
            state.profile = null;
        },
    },
});

export const { login, getProfile, logout } = accountSlice.actions;
export default accountSlice.reducer;
