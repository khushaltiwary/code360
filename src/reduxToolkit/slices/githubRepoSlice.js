import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Endpoint base URL
const BASE_URL = "http://34.8.212.114"; // Replace with your actual backend URL

// Fetch documentation
export const generateDocumentation = createAsyncThunk('github/generateDocumentation', async (requestData) => {
   
    // Log the request data being sent
    console.log("Request Data for Documentation Generation:", requestData);
 
    try {
        // Sending the POST request
        const response = await axios.post(`${BASE_URL}/github/generate-documentation`, requestData);
       
        // Log the HTTP response
        console.log("Response from Documentation Generation:", response);
       
        // Log the response status and data
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
 
        return response.data; // Return the result
       
    } catch (error) {
        // Log any errors that occur during the request
        console.error("Error occurred during documentation generation:", error);
       
        // If the error response exists, log that too
        if (error.response) {
            console.error("Error Response Data:", error.response.data);
            console.error("Error Response Status:", error.response.status);
        } else {
            console.error("Error Message:", error.message);
        }
 
        // Rethrow the error to be caught in extraReducers of your slice
        throw error;
    }
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