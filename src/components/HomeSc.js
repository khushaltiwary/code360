import React from "react";
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
import { Grid2, Card, CardContent } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import logo from "../assets/Worldline-Coconut-Horizontal.png"; // Adjust the path to your logo

const HomeSc = () => {
  const drawerItems = [
    { text: "Generate Test Cases ", path: "/testcase" },
    { text: "Generate Docs", path: "/doc" },
    { text: "Generate Review ", path: "/review" },
    { text: "Generate Enhancements ", path: "/enhance" },
  ];

  //All states here
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [gitRepoLink, setGitRepoLink] = useState("");

  const features = [
    {
      title: "Test Cases",
      description: "Description of Test Cases",
      apiEndpoint: "/api/feature1",
    },
    { title: "Code Review ", description: "Description Code Review" },
    {
      title: "Code Enhancements",
      description: "Description of Code Enhancements",
    },
    {
      title: "Code Documentation",
      description: "Description of Code Documentation",
    },
  ];

  //added for timer
  const [progress, setProgress] = useState(0); // State for progress bar
  const [showProgress, setShowProgress] = useState(false); // State to control progress bar visibility
  const [randomFact, setRandomFact] = useState(""); // State for displaying a random fact

  // State for Download button visibility
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  // State to disalbe Input Text field
  const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

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

  const handleFeatureClick = (feature) => {
    alert(feature.title + " " + "functionality is not yet implemented!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* App Bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          //height:"13vh"
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#46beaa" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="black"
              onClick={toggleDrawer(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
              Code Analytics
            </Typography>
            <img src={logo} alt="Company Logo" style={{ height: "40px" }} />
          </Toolbar>
        </AppBar>
      </Box>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {drawerItems.map((item) => (
              <ListItem button key={item.text}>
                <RouterLink
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary={item.text} />
                </RouterLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
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
            //width: "100%",
            display: "flex",
            flex: "1 0 auto",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem 1rem",
            //backgroundColor: "#f9f9f9",
            //boxShadow: 1,
            height: "60vh",
            //marginBottom: "2rem"
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Home - Code 360 Analytics
          </Typography>
          <Typography paragraph align="center">
            Your one step solution to all your boring business needs.
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
            <Button
              variant="contained"
              onClick={handleCopyClick}
              sx={{
                marginTop: "1rem",
                backgroundColor: "#46beaa",
                color: "#FFF",
                "&:hover": { backgroundColor: "#3fa695" },
              }}
              disabled={isTextFieldDisabled} // disable button 
            >
              Copy Code to Google Storage Bucket
            </Button>
          

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
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
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
                  {`${Math.round(progress)}%`}{" "}
                  {/* current progress percentage */}
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
        {showDownloadButton && <Divider sx={{ width: "100%", my: 2 }} />}

        {/* Conditional Rendering for Main Feature Section */}
        {showDownloadButton && (
          <Box
            sx={{
              display: "flex",
              flex: "1 0 auto",
              height: "100vh",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflowY: "auto",
              marginTop: "-8rem",
              paddingBottom: "1rem",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              //sx={{ fontWeight: "bold" }}
            >
              Main Features
            </Typography>

            {/* "Download All Reports" card, separate from the grid */}
            <Box sx={{ display: "flex", justifyContent: "center", marginY: 3 }}>
              <Card
                sx={{
                  elevation: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    //height: 200, // Ensures adequate spacing for centering
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "1rem" }}
                  >
                    All Reports
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: "1rem" }}
                  >
                    A compiled report of all features.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#46beaa",
                      color: "#FFF",
                      "&:hover": { backgroundColor: "#3fa695" },
                    }}
                    onClick={() =>
                      handleFeatureClick({
                        title: "All Reports",
                        apiEndpoint: "/api/download-reports",
                      })
                    }
                  >
                    All Reports
                  </Button>
                </CardContent>
              </Card>
            </Box>

            <Grid2 container spacing={4}>
              {features.map((feature, index) => (
                <Grid2 item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      elevation: 3,
                      transition: "0.3s",
                      "&:hover": { boxShadow: 6 },
                    }}
                  >
                    <CardContent sx={{ padding: "20px" }}>
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
                        sx={{ marginBottom: "1rem" }}
                      >
                        {feature.description}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            backgroundColor: "#46beaa",
                            color: "#FFF",
                            "&:hover": { backgroundColor: "#3fa695" },
                          }}
                          onClick={() => handleFeatureClick(feature)}
                        >
                          {feature.title}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#46beaa",
          color: "black",
          textAlign: "center",
          padding: "1rem 0",
          width: "100%",
          //height: "10vh",
          paddingTop: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            typography: "body1",
            "& > :not(style) ~ :not(style)": {
              ml: 2,
            },
          }}
          //onClick={preventDefault}
        >
          <Link href="#" underline="hover" sx={{ color: "black" }}>
            {"Privacy"}
          </Link>
          <Link href="#" underline="hover" sx={{ color: "black" }}>
            {"Terms of use"}
          </Link>
          <Link href="#" underline="hover" sx={{ color: "black" }}>
            {"Contact"}
          </Link>
        </Box>
        <Typography variant="body1">
          © {new Date().getFullYear()} Code 360 Analytics
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeSc;
