import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { generateDocumentation , selectDocumentationStatus, selectDocumentationUrls} from "../reduxToolkit/slices/githubRepoSlice";

const DownloadSc = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { title, description, apiEndpoint } = location.state || {
    title: "",
    description: "",
    apiEndpoint: "",
  };
  const [progress, setProgress] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const [loading, setLoading] = useState(true); // New state for loading
  const [randomFacts, setRandomFacts] = useState([]); // State for random facts
  const [currentFact, setCurrentFact] = useState(""); // Current displayed fact

  //Selected to access Redux state
  const documentationStatus = useSelector(selectDocumentationStatus);
  const documentationUrls = useSelector(selectDocumentationUrls);
  //const progress = documentationStatus === "completed" ? 100 : 0;

  const BASE_URL = "http://34.8.212.114";
  const dummyApiEndpoint = "http://localhost:8000/"; // Dummy API endpoint

  const [fileUrls, setFileUrls] = useState({});
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);


   // Sample random facts
   const facts = [
    "🚀 Generate documents in a snap – speed up your workflows with just a click!",
    "🔍 Code reviews made easy – catch bugs before they become problems!",
    "📊 Gain insights at a glance with real-time reporting features!",
    "📝 Create stunning architecture diagrams effortlessly – visualize your ideas!",
    "✨ Seamlessly transform designs into code – unleash your creativity!",
    "🔄 Optimize workflows and enhance team collaboration – work smarter together!",
    "♻️ Automated reporting keeps everyone in the loop – never miss a beat!",
    "💡 Enhance code quality with AI-powered suggestions – code like a pro!",
    "🌱 Future-proof your projects with scalable features that grow with you!",
    "🎉 Unlock endless possibilities – new features rolling out soon for a smarter experience!"
];

  const statusResponse = useSelector(
    (state) => state.githubRepo.statusResponse
  );

  useEffect(() => {
    setRandomFacts(facts);
    // Set the first random fact when the component mounts
    setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);

    // Change the fact every 3 seconds while loading
    const factInterval = setInterval(() => {
      setCurrentFact(facts[Math.floor(Math.random() * facts.length)]);
    }, 3000); // Change fact every 3 seconds

    // Check when status is completed, set file URLs and other necessary actions
    if (documentationStatus === "completed") {
      setLoading(false);
    }

    return () => {
      clearInterval(factInterval); // Clean up on unmount
    };

  }, [documentationStatus]);


  //useEffect(() => {
  //  if (statusResponse) {
  //    console.log("Status Response:", statusResponse);
//
  //    // If status is completed, set progress to 100%
  //    if (statusResponse.status === "completed") {
  //      setProgress(100);
  //      // Set file URLs from the response
  //      if (statusResponse.documentation_urls) {
  //        setFileUrls(statusResponse.documentation_urls);
  //      }
  //    }
  //  }
  //}, [statusResponse]);

  // useEffect(() => {
  //   let progressInterval;

  //   if (apiEndpoint) {
  //     console.log("API Endpoint recieved in Download Sc ", { apiEndpoint });
  //     // Simulate progress for demonstration purposes
  //     progressInterval = setInterval(() => {
  //       setProgress((prevProgress) => {
  //         if (prevProgress >= 100) {
  //           clearInterval(progressInterval);
  //           // You can handle completion logic here
  //           return 100;
  //         }
  //         return Math.min(prevProgress + 10, 100);
  //       });
  //     }, 100); // Increment every 500ms
  //   }

  //   return () => {
  //     clearInterval(progressInterval); // Clean up interval on component unmount
  //   };
  // }, [apiEndpoint]);

  const handlePreviewClick = () => {
    if (dummyApiEndpoint) {
      fetch(dummyApiEndpoint)
        .then((response) => response.json())
        .then((data) => {
          setPreviewData(data);
          setPreviewOpen(true);
        })
        .catch((err) => {
          console.error("Error fetching preview data:", err);
        });
    } else {
      alert("No API endpoint provided!");
    }
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const handleDownloadClick = () => {
    if (!Object.keys(documentationUrls).length) {
      alert("No files available for download yet.");
      return;
    }
    setDownloadDialogOpen(true);
  };

  const handleFileClick = (url) => {
    window.open(url, "_blank"); // Open URL in a new tab
  };

  //useEffect(() => {
  //  let pollInterval;
  //  const pollJobStatus = async () => {
  //    try {
  //      const response = await axios.get(`${BASE_URL}/github/job-status/${jobId}`);
  //      console.log("Polling job status:", response.data.status);
  //
  //      if (response.data.status === "completed") {
  //        clearInterval(pollInterval);
  //        setProgress(100); // Set progress to 100 once job is completed
  //        setFileUrls(response.data.documentation_urls || {});
  //      } else if (response.data.status === "failed") {
  //        clearInterval(pollInterval);
  //        console.error("Job failed: ", response.data);
  //      }
  //    } catch (error) {
  //      console.error("Error during polling:", error);
  //    }
  //  };
  //    const job_id = response.data.job_id;
  //    console.log("Job ID:", job_id);
  //
  //  // Start polling if jobId is provided
  //  if (jobId) {
  //    pollInterval = setInterval(pollJobStatus, 5000); // Poll every 5 seconds
  //  }
  //
  //  return () => {
  //    clearInterval(pollInterval);
  //  };
  //}, [jobId, BASE_URL]);

  return (
    <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "77vh",
    }}
  >
    <Box
      sx={{
        padding: "3rem",
        margin: "5rem ",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333" }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        align="center"
        paragraph
        sx={{ color: "#666" }}
      >
        {description}
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ marginTop: "1rem" }}>
            Analysing the documents, please wait...
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "1rem" }}>
            Our Product : {currentFact}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <Button
            variant="contained"
            onClick={handleDownloadClick}
            sx={{
              margin: "0 1rem",
              backgroundColor: "#46beaa",
              color: "#FFF",
              "&:hover": { backgroundColor: "#3fa695" },
            }}
          >
            Download {title}
          </Button>
          <Button
            variant="contained"
            onClick={handlePreviewClick}
            sx={{
              margin: "0 1rem",
              backgroundColor: "#46beaa",
              color: "#FFF",
              "&:hover": { backgroundColor: "#3fa695" },
            }}
          >
            Preview
          </Button>
        </Box>
      )}

      <Dialog
        open={downloadDialogOpen}
        onClose={() => setDownloadDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Files Available for Download</DialogTitle>
        <DialogContent dividers>
          {documentationUrls &&
            Object.entries(documentationUrls).map(([fileName, urls]) => (
              <Box key={fileName} sx={{ marginBottom: "1rem" }}>
                <Typography variant="h6">{fileName}</Typography>
                <Button
                  onClick={() => handleFileClick(urls.markdown_url)}
                  sx={{ marginRight: "1rem" }}
                >
                  Markdown URL
                </Button>
                <Button onClick={() => handleFileClick(urls.docx_url)}>
                  DOCX URL
                </Button>
              </Box>
            ))}
        </DialogContent>
      </Dialog>

      {/* Dialog for Preview */}
      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Preview</DialogTitle>
        <DialogContent dividers>
          {previewData ? (
            <Typography variant="body1">
              {JSON.stringify(previewData, null, 2)}
            </Typography>
          ) : (
            <CircularProgress />
          )}
        </DialogContent>
        <Box sx={{ padding: "1rem", textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleDownloadClick}
            sx={{
              backgroundColor: "#46beaa",
              color: "#FFF",
              "&:hover": { backgroundColor: "#3fa695" },
            }}
          >
            Download
          </Button>
        </Box>
      </Dialog>
    </Box>
  </Container>
  );
};

export default DownloadSc;
