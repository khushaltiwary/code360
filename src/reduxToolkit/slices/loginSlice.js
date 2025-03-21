import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    errors: {}
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.isAuthenticated = true; // Set user authenticated status
            state.user = action.payload;   // Store user information
            state.errors = {};              // Clear any errors
        },
        loginFailure(state, action) {
            state.isAuthenticated = false; // Ensure user is not authenticated on failure
            state.errors = action.payload;  // Store error messages
        },
        logout(state) {
            state.isAuthenticated = false; // Log out user
            state.user = null;              // Clear user info
        },
    },
});

// Export actions for use in components
export const { loginSuccess, loginFailure, logout } = loginSlice.actions;

// Export the reducer to be integrated into the store
export default loginSlice.reducer;