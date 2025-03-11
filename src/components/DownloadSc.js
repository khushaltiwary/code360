import React, { useEffect, useState } from "react";
import { Box, Typography, LinearProgress, Button,Dialog, DialogContent, DialogTitle,CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const DownloadSc = () => {
  const location = useLocation();
  const { title, description, apiEndpoint } = location.state || {
    title: "",
    description: "",
    apiEndpoint: "",
  };
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  const dummyApiEndpoint = "https://jsonplaceholder.typicode.com/posts"; // Dummy API endpoint

  useEffect(() => {
    let progressInterval;

    //if (apiEndpoint) {
    // Simulate progress for demonstration purposes
    progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          // You can handle completion logic here
          return 100;
        }
        return Math.min(prevProgress + 10, 100);
      });
    }, 500); // Increment every 500ms
    //}

    return () => {
      clearInterval(progressInterval); // Clean up interval on component unmount
    };
  }, [apiEndpoint]);

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
    // Implement the logic for previewing the content
    alert("Download initiated!");
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "2rem auto",
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "80%", mr: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress
        )}%`}</Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        {progress === 100 && (
          <Box sx={{
            display: "flex",
            //alignItems: "center",
            marginTop: "1rem",
            justifyContent: "center",
          }}>
            <Button
              variant="contained"
              onClick={handleDownloadClick}
              sx={{
                margin: '0 1rem',
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
                margin: '0 1rem',
                backgroundColor: "#46beaa",
                color: "#FFF",
                "&:hover": { backgroundColor: "#3fa695" },
              }}
            >
              Preview
            </Button>
          </Box>
        )}
      </Box>
      {/* Dialog for Preview */}
      <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="md" fullWidth>
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
        <Box sx={{ padding: '1rem', textAlign: 'center' }}>
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
  );
};

export default DownloadSc;
