import React, { useState } from "react";
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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from '../assets/Worldline-Coconut-Horizontal.png';

const HomeSc = () => {

    //Navigate function to navigate to DownloadSc when button on feature card is clicked.
    const navigate = useNavigate();

   

    //Git Link Logic and States Related to Validation of Git Link

    const [gitRepoLink, setGitRepoLink] = useState("");
    const [isValidGitHubLink, setIsValidGitHubLink] = useState(false); // State to track if the GitHub link is valid
    const [personalAccessToken, setPersonalAccessToken] = useState(""); // State for PAT

    const handleLinkChange = (event) => {
        const url = event.target.value;
        setGitRepoLink(url);
        const githubLinkPattern =
            /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+\/?$/;
        //check if URL is empty or not matching GitHub pattern
        setIsValidGitHubLink(url.trim() !== "" && githubLinkPattern.test(url));
    };

    //States to set Workflow after button is clicked and Progress bar is completed.

    const [progress, setProgress] = useState(0); // State for progress bar
    const [HideItems, setHideItems] = useState(false); // State to Hide items after progress bar is done i.e manage visibility
    const [randomFact, setRandomFact] = useState(""); // State for displaying a random fact
    const [ShowItems, setShowItems] = useState(false); // State for Showing Items after Progress bar visibility
    const [isTextFieldDisabled, setIsTextFieldDisabled] = useState(false); // State to disalbe Input Text field


    //Hardcoded Random Facts to show along with Progress Bar.
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
    ];


    //Copy Button Logic and Workflow after Button is Clicked
    const handleCopyClick = () => {
        if (!isValidGitHubLink) return; // Prevent copying if the link is invalid
        navigator.clipboard
            .writeText(gitRepoLink) // Copy the URL to clipboard
            .then(() => {
                console.log("Copied link:", gitRepoLink);

                // Text field is enabled initially
                setIsTextFieldDisabled(false);

                // States For Progress bar
                setHideItems(true);

                setProgress(0);

                // Do not show Items(any thing that should be displayed after complition of Progress bar) initialy.
                setShowItems(false);

                //Progress Bar Logic -
                const progressInterval = setInterval(() => {
                    setProgress((oldProgress) => {
                        if (oldProgress >= 100) {
                            clearInterval(progressInterval); // Stop the timer when progress is 100
                            setHideItems(false); // Hide the progress bar after complection
                            setShowItems(true); //Show Items when progress is completed
                            setIsTextFieldDisabled(true); // Disable the text field
                            alert("Link copied successfully to Google Storage bucket!");
                            return 100;
                        }

                        console.log("Progress updated to:", oldProgress);

                        return oldProgress + 1; // Increment for a longer duration
                    });
                }, 100);

                // Facts Showing Logic -

                const factInterval = setInterval(() => {
                    // Separate interval for random facts
                    const randomFactIndex = Math.floor(
                        Math.random() * randomFacts.length
                    );
                    setRandomFact(randomFacts[randomFactIndex]);
                }, 2000); // Display a new random fact every 3 seconds

                setTimeout(() => {
                    clearInterval(factInterval); // Stop updating facts when progress is finished
                }, 25000);
            })

            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };


    //Main feature section Features -
    const features = [
        {
            title: "Test Cases",
            description: "Description of Test Cases",
            apiEndpoint: "/api/feature1",
        },
        {
            title: "Code Review ",
            description: "Description Code Review",
            apiEndpoint: "/api/feature2",
        },
        {
            title: "Code Enhancements",
            description: "Description of Code Enhancements",
            apiEndpoint: "/api/feature3",
        },
        {
            title: "Code Documentation",
            description: "Description of Code Documentation",
            apiEndpoint: "/api/feature4",
        },
    ];


    const handleFeatureClick = (feature) => {
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


            {/* Main Content */}
            <Container
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    
                }}
            >
                {!ShowItems && (
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
                        <Typography
                            variant="h4"
                            align="center"
                            gutterBottom
                            sx={{ fontWeight: "bold" }}
                        >
                            360° Code Analytics
                        </Typography>
                        <Typography paragraph align="center">
                            Your one step solution to all your boring business needs.
                        </Typography>

                        {/* Git Repository Link Input */}

                        <TextField
                            error={!isValidGitHubLink && gitRepoLink.trim() !== ""} // Error state if the link is invalid
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
                        {/* Personal Access Token Input */}
                        <TextField
                          placeholder="GitHub Access Token"
                          variant="outlined"
                          fullWidth
                          //value={personalAccessToken}
                          //onChange={(e) => setPersonalAccessToken(e.target.value)}
                          sx={{
                            "& .MuiInputBase-input": {
                              textAlign: "center",
                            },
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

                        {HideItems && (
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
                                    sx={{
                                        marginTop: "0.5rem",
                                        textAlign: "center",
                                        width: "100%",
                                    }}
                                >
                                    {randomFact} {/* random fact below the progress bar */}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}

                {/* Conditional Rendering for Main Feature Section */}
                {ShowItems && (
                    <Box
                        sx={{
                            display: "flex",
                            flex: "1 0 auto",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            overflowY: "auto",
                            paddingBottom: "1rem",
                        }}
                    >
                        <Typography variant="h4" align="center" gutterBottom>
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
                                                description: "All 360 Analytics Reports ",
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

            
        </Box>
    );
};

export default HomeSc;