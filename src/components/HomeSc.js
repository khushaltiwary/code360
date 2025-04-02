import React, { useState } from "react";
import {
  Typography,
  Container,
  TextField,
  Box,
  Button,
  LinearProgress,
} from "@mui/material";
import { Grid2, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  generateDocumentation,
  generateCodeReview,
  generateUnitTest,
  generateCodeEnhancement,
  checkRepoPrivacy,
} from "../reduxToolkit/slices/githubRepoSlice";

const HomeSc = () => {
  //Navigate function to navigate to DownloadSc when button on feature card is clicked.
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, jobStatus, isRepoPrivate } = useSelector(
    (state) => state.githubRepo
  ); // Replace with the correct state path

  const branch = "master";

  //Git Link Logic and States Related to Validation of Git Link

  const [gitRepoLink, setGitRepoLink] = useState("");
  const [isValidGitHubLink, setIsValidGitHubLink] = useState(false); // State to track if the GitHub link is valid

  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  // const [isPrivate, setIsPrivate] = useState(false);

  //States to set Workflow after button is clicked and Progress bar is completed.

  const [progress, setProgress] = useState(0); // State for progress bar
  const [HideItems, setHideItems] = useState(false); // State to Hide items after progress bar is done i.e manage visibility
  const [randomFact, setRandomFact] = useState(""); // State for displaying a random fact
  const [ShowItems, setShowItems] = useState(false); // State for Showing Items after Progress bar visibility
  const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(false); // State to disalbe Input Text field

  const [isMainFeaturesDisabled, setIsMainFeaturesDisabled] = useState(true); // Initially disabled

  const [canScroll, setCanScroll] = useState(false); // Control scrolling

  const [repository_url, setrepository_url] = useState("");

  const handleLinkChange = (event) => {
    const url = event.target.value;
    setGitRepoLink(url);
    const githubLinkPattern =
      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+\/?$/;
    //check if URL is empty or not matching GitHub pattern
    setIsValidGitHubLink(url.trim() !== "" && githubLinkPattern.test(url));
  };

  //Hardcoded Random Facts to show along with Progress Bar.
  const randomFacts = [
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

  //Copy Button Logic and Workflow after Button is Clicked

  const handleCopyClick = () => {
    if (!isValidGitHubLink) return;
    navigator.clipboard.writeText(gitRepoLink)
      .then(() => {
        setCanScroll(true); // Allow scrolling after copying

        // Show the progress bar
        setProgress(0); // Reset progress to 0

        // Display a random fact
        const factInterval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * randomFacts.length);
          setRandomFact(randomFacts[randomIndex]);
        }, 1000); // Change fact every second

        // Progress Bar Logic
        const progressInterval = setInterval(() => {
          setProgress((oldProgress) => {
            if (oldProgress >= 100) {
              clearInterval(progressInterval);
              clearInterval(factInterval); // Stop changing facts
              alert("Link copied successfully to Google Storage bucket!");
              setIsMainFeaturesDisabled(false); // Enable main features after alert
              // Auto scroll to the main features section after the alert
              setTimeout(() => {
                document.getElementById('main-features').scrollIntoView({ behavior: 'smooth' });
              }, 0);
              return 100;
            }
            return oldProgress + 1; // Increment progress
          });
        }, 100); // Update progress every 100ms
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  //Main feature section Features -

  const features = [
    {
      title: "Test Cases",
      description: "🧪 Auto-generate robust test cases to ensure bug-free code.",
      apiEndpoint: "github/generateUnitTest",
    },
    {
      title: "Code Review",
      description: "🔍 AI-powered reviews to catch bugs and optimize your code.",
      apiEndpoint: "github/generateCodeReview",
    },
    {
      title: "Documentation & Enhancements",
      description: "📚 Generate clean docs and enhance code effortlessly.",
      apiEndpoint: "github/generateDocumentation",
    },
    {
      title: "All Reviews",
      description: "🤖 Generate all types of reviews for your code.",
      apiEndpoint: "github/automateWorkflow",
    },
  ];

  const handleFeatureClick = (feature) => {
    switch (feature.title) {
      case "Code Documentation":
        console.log("Button is clicked Documentation");
        dispatch(
          generateDocumentation({
            repository_url: gitRepoLink,
            branch,
            repo_token: token,
          })
        );
        break;

      case "Code Review":
        console.log("Button is clicked Code Review");
        dispatch(
          generateCodeReview({
            repository_url: gitRepoLink,
            branch,
            repo_token: token,
          })
        );
        break;

      case "Test Cases":
        console.log("Button is clicked Test Cases");
        dispatch(
          generateUnitTest({
            repository_url: gitRepoLink,
            branch,
            repo_token: token,
          })
        );
        break;

      case "Code Enhancements":
        console.log("Button is clicked Code Enhancements");
        dispatch(
          generateCodeEnhancement({
            repository_url: gitRepoLink,
            branch,
            repo_token: token,
          })
        );
        break;

      default:
        console.error(`No action defined for feature: ${feature.title}`);
        // Optionally, show a message to the user or log additional info
        break;
    }

    // Navigate to the DownloadSc page, passing feature data as state
    navigate("/download", {
      state: {
        title: feature.title,
        description: feature.description,
        apiEndpoint: feature.apiEndpoint,
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "77vh",
      }}
    >
      <Container
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: canScroll ? "auto" : "hidden", // Control overflow
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "1 0 auto",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem 1rem",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            360° Code Analytics
          </Typography>
          <Typography paragraph>
            Your one-step solution for all your recurring business needs.
          </Typography>

          <TextField
            error={!isValidGitHubLink && gitRepoLink.trim() !== ""}
            helperText={
              !isValidGitHubLink && gitRepoLink.trim() !== ""
                ? "Please enter a valid GitHub repository link."
                : ""
            }
            variant="outlined"
            fullWidth
            placeholder="Paste Your Repo Link Here - Gitlab/ Github link"
            value={gitRepoLink}
            onChange={handleLinkChange}
            disabled={false} // Keep enabled for editing
            sx={{
              "& .MuiInputBase-input": {
                textAlign: "center",
              },
              marginTop: "1rem",
              marginBottom: "1rem",
              width: "40%",
            }}
          />

          <TextField
            placeholder="GitHub Access Token"
            variant="outlined"
            fullWidth
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            sx={{
              "& .MuiInputBase-input": { textAlign: "center" },
              marginBottom: "1rem",
              width: "40%",
            }}
          />



          <Button
            variant="contained"
            onClick={handleCopyClick}
            sx={{
              marginTop: "1rem",
              backgroundColor: "#46beaa",
              color: "#FFF",
              "&:hover": { backgroundColor: "#3fa695" },
            }}
            disabled={false} // Keep enabled for the initial click
          >
            Copy Code to Google Storage Bucket
          </Button>
        </Box>

        {/* Show the progress bar and facts conditionally */}
        {progress > 0 && progress < 100 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "70%", // Set width to 70%
              margin: "2rem auto", // Center horizontally
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                width: "100%", // Full width of the container
                marginBottom: "1rem",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#46beaa", // Eye-catching color
              }}
            >
              {randomFact}
            </Typography>
          </Box>
        )}

        {/* Second part of home screen - feature list */}
        {/* Second part of home screen - feature list */}
        <Box
          id="main-features"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "1rem",
            pointerEvents: isMainFeaturesDisabled ? "none" : "auto", // Disable interactions
            opacity: isMainFeaturesDisabled ? 0.5 : 1, // Dim the section when disabled
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Main Features
          </Typography>

          {/* First row with three features */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center the cards horizontally
              alignItems: "stretch", // Ensure all cards have the same height
              gap: "1.5rem", // Add spacing between cards
              width: "100%", // Full width of the container
              maxWidth: "1200px", // Limit the maximum width for better alignment
              marginBottom: "1.5rem", // Add spacing below the first row
            }}
          >
            {features.slice(0, 3).map((feature, index) => (
              <Card
                key={index}
                sx={{
                  flex: "1 1 30%", // Ensure all cards take equal width
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "left",
                  background: "linear-gradient(white, #f0f8ff)",
                  transition: "0.3s",
                  display: "flex",
                  flexDirection: "column", // Ensure content stacks vertically
                  justifyContent: "space-between", // Space out content evenly
                  minHeight: "250px", // Set a minimum height for all cards
                  "&:hover": {
                    boxShadow: isMainFeaturesDisabled
                      ? "none"
                      : "0 8px 20px rgba(0, 0, 0, 0.2)",
                    transform: isMainFeaturesDisabled ? "none" : "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "1rem" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      flexGrow: 1, // Ensure the description takes up available space
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#46beaa",
                    color: "#FFF",
                    "&:hover": { backgroundColor: "#3fa695" },
                    marginTop: "1rem",
                  }}
                  onClick={() => handleFeatureClick(feature)}
                  disabled={isMainFeaturesDisabled} // Disable buttons when features are disabled
                >
                  Explore
                </Button>
              </Card>
            ))}
          </Box>

          {/* Second row with one centered feature */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Center the single card horizontally
              alignItems: "center", // Center the card vertically
              width: "100%", // Full width of the container
            }}
          >
            {features.slice(3, 4).map((feature, index) => (
              <Card
                key={index}
                sx={{
                  flex: "0 0 30%", // Ensure the card takes 30% width (same as the first row cards)
                  borderRadius: "12px",
                  padding: "20px",
                  textAlign: "left",
                  background: "linear-gradient(white, #f0f8ff)",
                  transition: "0.3s",
                  display: "flex",
                  flexDirection: "column", // Ensure content stacks vertically
                  justifyContent: "space-between", // Space out content evenly
                  minHeight: "250px", // Set a minimum height for the card
                  margin: "0 auto", // Center the card horizontally
                  "&:hover": {
                    boxShadow: isMainFeaturesDisabled
                      ? "none"
                      : "0 8px 20px rgba(0, 0, 0, 0.2)",
                    transform: isMainFeaturesDisabled ? "none" : "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "1rem" }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      flexGrow: 1, // Ensure the description takes up available space
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: "#46beaa",
                    color: "#FFF",
                    "&:hover": { backgroundColor: "#3fa695" },
                    marginTop: "1rem",
                  }}
                  onClick={() => handleFeatureClick(feature)}
                  disabled={isMainFeaturesDisabled} // Disable buttons when features are disabled
                >
                  Explore
                </Button>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeSc;
