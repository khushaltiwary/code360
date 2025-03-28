import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Endpoint base URL
const BASE_URL = "http://34.8.212.114"; // Replace with your actual backend URL

// Check repository privacy
export const checkRepoPrivacy = createAsyncThunk(
  "github/checkRepoPrivacy",
  async (repoUrl) => {
    const response = await axios.post(`${BASE_URL}/check-repo-privacy`, {
      repo_url: repoUrl,
    });
    return response.data.is_private;
  }
);

// Fetch documentation
// export const generateDocumentation = createAsyncThunk(
//   "github/generateDocumentation",
//   async (requestData , { rejectWithValue }) => {
//     // Log the request data being sent
//     console.log("Request Data for Documentation Generation:", requestData);

//     try {
//       // Sending the POST request
//       const response = await axios.post(
//         `${BASE_URL}/github/generate-documentation`,
//         requestData
//       );

//       // Log the HTTP response
//       console.log("Response from Documentation Generation:", response);

//       // Log the response status and data
//       console.log("Response Status:", response.status);
//       console.log("Response Data:", response.data);

//       console.log("Status Code:", response.status);
//       console.log("Response:", JSON.stringify(response.data, null, 2));

//       if (response.status !== 200) {
//         console.error("Documentation generation request failed!");
//         return rejectWithValue("Request failed!");
//       }

//       const job_id = response.data.job_id;
//       console.log("Job ID:", job_id);

//       // Polling job status
//       console.log("2. Polling job status...");

//       let pollCount = 0;
//       const maxPolls = 30;
//       const pollInterval = 15000; // 15 seconds

//       const pollJobStatus = async () => {
//         pollCount++;
//         console.log(`Poll #${pollCount}...`);
//         try {
//           const statusResponse = await axios.get(
//             `${BASE_URL}/github/job-status/${job_id}`
//           );
//           console.log("Status Code:", statusResponse.status);

//           if (statusResponse.status !== 200) {
//             console.error(
//               "Failed to get job status:",
//               statusResponse.statusText
//             );
//             return rejectWithValue("Failed to fetch job status!");
//           }

//           const statusData = statusResponse.data;
//           console.log("Job Status:", statusData.status);
//           console.log("Job Status:", statusData.status);
//           console.log("Response:", JSON.stringify(statusData, null, 2));

//           if (statusData.status === "completed") {
//             console.log("Job processing finished!");
//             if (statusData.documentation_urls) {
//               console.log("3. Documentation URLs:");
//               Object.entries(statusData.documentation_urls).forEach(
//                 ([file_path, urls]) => {
//                   console.log(`File: ${file_path}`);
//                   console.log(`Markdown URL: ${urls.markdown_url}`);
//                   console.log(`DOCX URL: ${urls.docx_url || "N/A"}`);
//                 }
//               );
//             }
//             return statusData;
//           }

//           if (statusData.status === "failed") {
//             console.error("Job failed!");
//             return rejectWithValue("Job processing failed.");
//           }

//           if (pollCount < maxPolls) {
//             setTimeout(pollJobStatus, pollInterval);
//           } else {
//             console.log(
//               `Giving up after ${maxPolls} polls. Job is still processing.`
//             );
//             return rejectWithValue(
//               "Job is still processing after maximum polling."
//             );
//           }
//         } catch (error) {
//           console.error("Error during polling:", error);
//           return rejectWithValue("Error during polling.");
//         }
//       };

//       pollJobStatus();
//     } catch (error) {
//       console.error(
//         "Error occurred during documentation generation:",
//         error.message
//       );
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const generateDocumentation = createAsyncThunk(
  "github/generateDocumentation",
  async (requestData, { rejectWithValue }) => {
    console.log("Request Data for Documentation Generation:", requestData);

    try {
      const response = await axios.post(
        `${BASE_URL}/github/generate-documentation`,
        requestData
      );

      console.log("Response from Documentation Generation:", response);
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.status !== 200) {
        console.error("Documentation generation request failed!");
        return rejectWithValue("Request failed!");
      }

      const job_id = response.data.job_id;
      console.log("Job ID:", job_id);

      console.log("2. Polling job status...");

      let pollCount = 0;
      const maxPolls = 30;
      const pollInterval = 15000; // 15 seconds

      const pollJobStatus = async () => {
        while (pollCount < maxPolls) {
          pollCount++;
          console.log(`Poll #${pollCount}...`);

          try {
            const statusResponse = await axios.get(
              `${BASE_URL}/github/job-status/${job_id}`
            );

            console.log("Status Code:", statusResponse.status);

            if (statusResponse.status !== 200) {
              console.error(
                "Failed to get job status:",
                statusResponse.statusText
              );
              return rejectWithValue("Failed to fetch job status!");
            }

            const statusData = statusResponse.data;
            console.log("Job Status:", statusData.status);
            console.log("Response:", JSON.stringify(statusData, null, 2));

            if (statusData.status === "completed") {
              console.log("Job processing finished!");
              if (statusData.documentation_urls) {
                console.log("3. Documentation URLs:");
                Object.entries(statusData.documentation_urls).forEach(
                  ([file_path, urls]) => {
                    console.log(`File: ${file_path}`);
                    console.log(`Markdown URL: ${urls.markdown_url}`);
                    console.log(`DOCX URL: ${urls.docx_url || "N/A"}`);
                  }
                );
              }
              return {
                status: statusData.status,
                documentation_urls: statusData.documentation_urls,
              };
            }

            if (statusData.status === "failed") {
              console.error("Job failed!");
              return rejectWithValue("Job processing failed.");
            }
          } catch (error) {
            console.error("Error during polling:", error);
            return rejectWithValue("Error during polling.");
          }

          await new Promise((resolve) => setTimeout(resolve, pollInterval));
        }

        console.log(
          `Giving up after ${maxPolls} polls. Job is still processing.`
        );
        return rejectWithValue(
          "Job is still processing after maximum polling."
        );
      };

      // Await the completion of polling to ensure data is returned properly
      return await pollJobStatus();
    } catch (error) {
      console.error(
        "Error occurred during documentation generation:",
        error.message
      );
      return rejectWithValue(error.message);
    }
  }
);

// Fetch code review
// export const generateCodeReview = createAsyncThunk(
//   "github/generateCodeReview",
//   async (requestData) => {
//     // Log the request data being sent
//     console.log("Request Data for Code Review Generation:", requestData);

//     try {
//       // Sending the POST request
//       const response = await axios.post(
//         `${BASE_URL}/github/generate-code_review`,
//         requestData
//       );

//       // Log the HTTP response
//       console.log("Response from Code Review Generation:", response);

//       // Log the response status and data
//       console.log("Response Status:", response.status);
//       console.log("Response Data:", response.data);

//       const jobId = response.data.job_id;
//       console.log("Job ID:", jobId);

//        return await pollJobStatus(jobId, BASE_URL, rejectWithValue);
//     } catch (error) {
//       // Log any errors that occur during the request
//       console.error("Error occurred during code review generation:", error);

//       // If the error response exists, log that too
//       if (error.response) {
//         console.error("Error Response Data:", error.response.data);
//         console.error("Error Response Status:", error.response.status);
//       } else {
//         console.error("Error Message:", error.message);
//       }

//       // Rethrow the error to be caught in extraReducers of your slice
//       throw error;
//     }
//   }
// );

export const generateCodeReview = createAsyncThunk(
  "github/generateCodeReview",
  async (requestData, { rejectWithValue }) => {
    // Log the request data being sent
    console.log("Request Data for Code Review Generation:", requestData);

    try {
      // Sending the POST request
      const response = await axios.post(
        `${BASE_URL}/github/generate-code_review`,
        requestData
      );

      // Log the HTTP response
      console.log("Response from Code Review Generation:", response);
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.status !== 200) {
        console.error("Code review generation request failed!");
        return rejectWithValue("Request failed!");
      }

      const jobId = response.data.job_id;
      console.log("Job ID:", jobId);

      // Use the reusable polling function
      return await pollJobStatus(jobId, BASE_URL, rejectWithValue);
    } catch (error) {
      console.error("Error occurred during code review generation:", error);

      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);
      } else {
        console.error("Error Message:", error.message);
      }

      // Use rejectWithValue for consistent error handling with createAsyncThunk
      return rejectWithValue(error.message);
    }
  }
);

// Fetch unit test
export const generateUnitTest = createAsyncThunk(
  "github/generateUnitTest",
  async (requestData) => {
    const response = await axios.post(
      `${BASE_URL}/github/generate_unit_test`,
      requestData
    );
    return response.data;
  }
);

// Fetch code enhancement
export const generateCodeEnhancement = createAsyncThunk(
  "github/generateCodeEnhancement",
  async (requestData) => {
    const response = await axios.post(
      `${BASE_URL}/github/generate_code_enhancement`,
      requestData
    );
    return response.data;
  }
);

// Polling function for job status
const pollJobStatus = async (
  jobId,
  baseUrl,
  rejectWithValue,
  maxPolls = 30,
  pollInterval = 15000
) => {
  console.log("2. Polling job status...");
  let pollCount = 0;

  while (pollCount < maxPolls) {
    pollCount++;
    console.log(`Poll #${pollCount}...`);

    try {
      const statusResponse = await axios.get(
        `${baseUrl}/github/job-status/${jobId}`
      );
      console.log("Status Code:", statusResponse.status);

      if (statusResponse.status !== 200) {
        console.error("Failed to get job status:", statusResponse.statusText);
        return rejectWithValue("Failed to fetch job status!");
      }

      const statusData = statusResponse.data;
      console.log("Job Status:", statusData.status);
      console.log("Response:", JSON.stringify(statusData, null, 2));

      if (statusData.status === "completed") {
        console.log("Job processing finished!");
        if (statusData.documentation_urls) {
          console.log("Documentation URLs:");
          Object.entries(statusData.documentation_urls).forEach(
            ([file_path, urls]) => {
              console.log(`File: ${file_path}`);
              console.log(`Markdown URL: ${urls.markdown_url}`);
              console.log(`DOCX URL: ${urls.docx_url || "N/A"}`);
            }
          );
        }
        return {
          status: statusData.status,
          documentation_urls: statusData.documentation_urls,
        };
      }

      if (statusData.status === "failed") {
        console.error("Job failed!");
        return rejectWithValue("Job processing failed.");
      }
    } catch (error) {
      console.error("Error during polling:", error);
      return rejectWithValue("Error during polling.");
    }

    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  console.log(`Giving up after ${maxPolls} polls. Job is still processing.`);
  return rejectWithValue("Job is still processing after maximum polling.");
};

// Create the slice
const githubRepoSlice = createSlice({
  name: "githubRepo",
  initialState: {
    repos: [],
    loading: false,
    error: null,
    statusResponse: null,
    jobStatus: null,
    isRepoPrivate: false,
    documentationStatus: null,
    documentationUrls: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkRepoPrivacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkRepoPrivacy.fulfilled, (state, action) => {
        state.loading = false;
        state.isRepoPrivate = action.payload; // Update privacy status
      })
      .addCase(checkRepoPrivacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(generateDocumentation.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset any previous errors
      })
      .addCase(generateDocumentation.fulfilled, (state, action) => {
        state.loading = false;
        state.statusResponse = action.payload; // Store job status or response
        state.documentationStatus = action.payload.status; // Extract and store status
        state.documentationUrls = action.payload.documentation_urls; // Extract and store documentation URLs
      })
      .addCase(generateDocumentation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(generateCodeReview.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset any previous errors
      })
      .addCase(generateCodeReview.fulfilled, (state, action) => {
        state.loading = false;
        state.statusResponse = action.payload; // Store job status or response
        state.documentationStatus = action.payload.status; // Extract and store status
        state.documentationUrls = action.payload.documentation_urls; // Extract and store documentation URLs
      })
      .addCase(generateCodeReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      });
    // Add handlers for unit test and code enhancement here similarly
  },
});

// Export the actions and reducer
export const selectstatusResponse = (state) => state.githubRepo.statusResponse;
export const selectDocumentationStatus = (state) =>
  state.githubRepo.documentationStatus;
export const selectDocumentationUrls = (state) =>
  state.githubRepo.documentationUrls;
export default githubRepoSlice.reducer;
