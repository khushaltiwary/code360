import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch public repositories by username
export const fetchPublicRepo = createAsyncThunk('api/fetchPublicRepo', async (username) => {
    const response = await axios.get(`http://your-backend-url/github/generate-documentation?username=${username}`);
    if (!response.ok) throw new Error('Failed to fetch public repositories.');
    return response.data;
});

// Fetch private repositories with token
export const fetchPrivateRepo = createAsyncThunk('api/fetchPrivateRepo', async ({ username, token }) => {
    const response = await axios.post(`http://your-backend-url/github/generate-documentation`, {
        username,
        headers: {
            Authorization: `Bearer ${token}`, // Use the token for authorization
        },
    });
    if (!response.ok) throw new Error('Failed to fetch private repositories. Check your token.');
    return response.data;
});

const githubRepoSlice = createSlice({
    name: 'githubRepo',
    initialState: {
        repos: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        // Handle pending, fulfilled, and rejected states
        builder
            .addCase(fetchPublicRepo.pending, (state) => { state.loading = true; })
            .addCase(fetchPublicRepo.fulfilled, (state, action) => { state.loading = false; state.repos = action.payload; })
            .addCase(fetchPublicRepo.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
            .addCase(fetchPrivateRepo.pending, (state) => { state.loading = true; })
            .addCase(fetchPrivateRepo.fulfilled, (state, action) => { state.loading = false; state.repos = action.payload; })
            .addCase(fetchPrivateRepo.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
    },
});

// Export the reducer
export default githubRepoSlice.reducer;