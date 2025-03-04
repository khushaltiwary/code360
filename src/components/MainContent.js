import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  Button,
  LinearProgress,
  Link,
  Divider,
} from "@mui/material";
import { useState } from "react";

const MainContent = ({ title, description , button }) => {
  const [gitRepoLink, setGitRepoLink] = useState("");

  //added for timer
  const [progress, setProgress] = useState(0); // State for progress bar
  const [showProgress, setShowProgress] = useState(false); // State to control progress bar visibility
  const [randomFact, setRandomFact] = useState(""); // State for displaying a random fact

  // State for Download button visibility
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  // State to disalbe Input Text field
  const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(false);

  //these lines chnaged for validation
  const [isValidGitHubLink, setIsValidGitHubLink] = useState(false); // State to track if the GitHub link is valid
  const handleLinkChange = (event) => {
    const url = event.target.value;
    setGitRepoLink(url);

    //these lines chnaged for validation
    // Regular expression to validate if the URL is a GitHub link
    const githubLinkPattern =
      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+\/?$/;
    //check if URL is empty or not matching GitHub pattern
    setIsValidGitHubLink(url.trim() !== "" && githubLinkPattern.test(url));
  };

  //added for timer
  const randomFacts = [
    "Solution utilizes GitLab CI/CD as a DevOps platform to streamline software development processes.",
    "The integration involves the GEN AI 'GEMINI FLASH' model for automated test generation.",
    "The goal is to enhance efficiency and code quality by automating test case creation.",
    "Automated generation includes unit tests, code reviews, and code enhancements.",
    "Developers initiate the process by committing code to the repository.",
    "Upon code commit, the CI/CD pipeline is triggered, invoking Vertex AI.",
    "The GEN AI model automatically generates unit tests and code snippets.",
    "Vertex AI reviews the code, providing comments and suggestions for improvements.",
    "The integration ensures relevant documentation is generated for the new code.",
    "Efficiency is improved by significantly reducing time required for test generation and code reviews.",
    "The quality of code improves through automated, consistent, and thorough test cases and reviews.",
    "Coding standards are maintained, reducing technical debt and improving maintainability.",
    "The process can easily scale with an expanding codebase and development team.",
    "Automation supports consistent quality and efficiency across development activities.",
  ]; // List of tech-related random facts

  const handleCopyClick = () => {
    //this line is added for validation
    if (!isValidGitHubLink) return; // Prevent copying if the link is invalid

    navigator.clipboard
      .writeText(gitRepoLink) // Copy the URL to clipboard
      .then(() => {
        alert("Link copied successfully to Google Storage bucket!"); // Alert on success
        console.log("Copied link:", gitRepoLink); // Log the copied link

        //added for timer
        setShowProgress(true);
        setProgress(0);

        // Hide download button initially
        setShowDownloadButton(false);

        // Text field is enabled initially
        setIsTextFieldDisabled(false);

        //added for timer
        const progressInterval = setInterval(() => {
          // Interval to update progress
          setProgress((oldProgress) => {
            if (oldProgress >= 100) {
              clearInterval(progressInterval); // Stop the timer when progress is 100
              setShowProgress(false); // Hide the progress bar after complection
              setShowDownloadButton(true); //Show download button when progress is complete
              setIsTextFieldDisabled(true); // Disable the text field
              return 100;
            }
            console.log("Progress updated to:", oldProgress);

            return oldProgress + 1; // Increment progress by a smaller amount for a longer duration
          });
        }, 100); // Update progress every 0.5 second for smoother transitions

        // added for the facts to show
        const factInterval = setInterval(() => {
          // Separate interval for random facts
          const randomFactIndex = Math.floor(
            Math.random() * randomFacts.length
          );
          setRandomFact(randomFacts[randomFactIndex]); // Set a new random fact
        }, 2000); // Display a new random fact every 3 seconds

        setTimeout(() => {
          clearInterval(factInterval); // Stop updating facts when progress is finished
        }, 25000); // Stop the fact updates with 25 seconds since increase is slow
      })

      .catch((err) => {
        console.error("Failed to copy: ", err); // If there's an error
      });
  };

  const handleDownload = () => {
    // Implement  download logic here
    alert("Download initiated!");
    // trigger file downloads  with `URL.createObjectURL` or other means)
  };

  const handlePreview = () => {
    alert("Preview functionality is not yet implemented!"); // Placeholder for preview logic
    //Implement Preview Logic Here
  };
  return (
    <Container
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
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
          height: "60vh",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography paragraph align="center">
          {description}
        </Typography>

        {/* Git Repository Link Input */}

        <TextField
          //these lines are added for validation
          error={!isValidGitHubLink && gitRepoLink.trim() !== ""} // Display an error state if the link is invalid
          helperText={
            !isValidGitHubLink && gitRepoLink.trim() !== ""
              ? "Please enter a valid GitHub repository link."
              : ""
          }
          variant="outlined"
          fullWidth
          //label="Paste Your Repo Link Here - Gitlab/ Github link"
          placeholder="Paste Your Repo Link Here - Gitlab/ Github link"
          value={gitRepoLink}
          onChange={handleLinkChange}
          disabled={isTextFieldDisabled} // Disable if true
          sx={{
            "& .MuiInputBase-input": {
              textAlign: "center",
            },
            marginTop: "1rem",
            marginBottom: "1rem",
            width: "40%",
          }}
        />

        {/* Conditional rendering for Copy button or Download button */}
        {!showDownloadButton ? ( // Check if Download button should be displayed
          <Button
            variant="contained"
            onClick={handleCopyClick}
            sx={{
              marginTop: "1rem",
              backgroundColor: "#46beaa",
              color: "#FFF",
              "&:hover": { backgroundColor: "#3fa695" },
            }}
            disabled={!isValidGitHubLink} // disable button if link is invalid
          >
            {button}
          </Button>
        ) : (
          <Box sx={{ display: "flex", marginTop: "1rem", gap: "1rem" }}>
            {" "}
            <Button
              variant="contained"
              onClick={handleDownload}
              sx={{
                backgroundColor: "#46beaa",
                color: "#FFF",
                "&:hover": { backgroundColor: "#3fa695" },
              }}
            >
              Download
            </Button>
            <Button
              variant="contained"
              onClick={handlePreview}
              sx={{
                backgroundColor: "#46beaa",
                color: "#FFF",
                "&:hover": { backgroundColor: "#3fa695" },
              }}
            >
              Preview
            </Button>
          </Box>
        )}

        {showProgress && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: "1rem",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ flexGrow: 1 }}
              />
              <Typography
                variant="body2"
                sx={{
                  marginLeft: "10px",
                  color: "black",
                  whiteSpace: "nowrap",
                }}
              >
                {`${Math.round(progress)}%`} {/* current progress percentage */}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ marginTop: "0.5rem", textAlign: "center", width: "100%" }}
            >
              {randomFact} {/* random fact below the progress bar */}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};
export default MainContent;
