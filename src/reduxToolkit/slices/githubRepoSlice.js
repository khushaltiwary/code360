import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Endpoint base URL
const BASE_URL = "http://your-python-backend-url/api"; // Replace with your actual backend URL

// Fetch documentation
export const generateDocumentation = createAsyncThunk('github/generateDocumentation', async (requestData) => {
    const response = await axios.post(`${BASE_URL}/github/generate-documentation`, requestData);
    return response.data; // Return the result
});

// Fetch code review
export const generateCodeReview = createAsyncThunk('github/generateCodeReview', async (requestData) => {
    const response = await axios.post(`${BASE_URL}/github/generate-code_review`, requestData);
    return response.data;
});

// Fetch unit test
export const generateUnitTest = createAsyncThunk('github/generateUnitTest', async (requestData) => {
    const response = await axios.post(`${BASE_URL}/github/generate_unit_test`, requestData);
    return response.data;
});

// Fetch code enhancement
export const generateCodeEnhancement = createAsyncThunk('github/generateCodeEnhancement', async (requestData) => {
    const response = await axios.post(`${BASE_URL}/github/generate_code_enhancement`, requestData);
    return response.data;
});

// Create the slice
const githubRepoSlice = createSlice({
    name: 'githubRepo',
    initialState: {
        repos: [],
        loading: false,
        error: null,
        jobStatus: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateDocumentation.pending, (state) => {
                state.loading = true;
                state.error = null;  // Reset any previous errors
            })
            .addCase(generateDocumentation.fulfilled, (state, action) => {
                state.loading = false;
                state.jobStatus = action.payload;  // Store job status or response
            })
            .addCase(generateDocumentation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;  // Set error message
            })
            .addCase(generateCodeReview.pending, (state) => {
                state.loading = true;
                state.error = null;  // Reset any previous errors
            })
            .addCase(generateCodeReview.fulfilled, (state, action) => {
                state.loading = false;
                state.jobStatus = action.payload;  // Update job status
            })
            .addCase(generateCodeReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;  // Set error message
            });
        // Add handlers for unit test and code enhancement here similarly
    },
});

// Export the actions and reducer
export default githubRepoSlice.reducer;