import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    LinearProgress,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const SplashSc = () => {

    const navigate = useNavigate(); // Initialize useNavigate


    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false); // State to control loading

    useEffect(() => {
        let interval;

        if (loading) {
            // Progress updating function
            interval = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            navigate('/login'); // Navigate to LoginSc after completing progress
                        }, 500); // Add a slight delay for UX
                        return 100; // Ensure it reaches 100%
                    }
                    return Math.min(oldProgress + 5, 100); // Increment progress
                });
            }, 150);
        }

        return () => {
            clearInterval(interval);
        };
    }, [loading, navigate]);


    const handleStart = () => {
        setLoading(true); // Start loading when the button is clicked
        setProgress(0); // Reset progress to 0
    };



    return (
        <Box sx={styles.splashContainer}>
            <Typography sx={styles.welcomeTitle}>Welcome</Typography>
            <Typography sx={styles.appName}>360 Code Analysis</Typography>
            <Typography sx={styles.description}>
                <i>Generate AI enabled - code reviews, reports, test-cases & documentation.</i>
            </Typography>
            <Box sx={styles.progressContainer}>
                <LinearProgress variant="determinate" value={progress} sx={styles.progressBar} />
                <Typography sx={styles.percentage}>{progress}%</Typography>
            </Box>
            <Button
                variant="contained"
                sx={styles.button}
                onClick={handleStart} // Button action to trigger progress start
            >
                Start
            </Button>
        </Box>
    );
};

const styles = {
    splashContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#46beaa", // Main theme color
        backgroundImage: "url('/path-to-your-logo.png')", // Replace with your logo path
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "#fff", // White text color for contrast
        textAlign: "center",
        padding: 2,
    },
    welcomeTitle: {
        fontSize: "3rem",
        fontWeight: "bold",
        margin: "0",
        marginBottom: "10px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Adding shadow for futuristic appeal
    },
    appName: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        margin: "0",
        marginBottom: "5px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Adding shadow for futuristic appeal
    },
    description: {
        fontSize: "1.5rem",
        margin: "15px 0",
        fontStyle: "italic", // Italics for description
        color: "#fff", // Keeping the color as white to maintain contrast
    },
    button: {
        marginTop: "20px",
        backgroundColor: "#fff",
        color: "#46beaa",
        '&:hover': {
            backgroundColor: "#e0e0e0",
        },
    },
    progressContainer: {
        width: '70%', // Set width for the progress container
        display: 'flex',
        alignItems: 'center',
        marginTop: '20px',
        position: 'relative',
    },
    progressBar: {
        flexGrow: 1,
        marginRight: '10px',
        backgroundColor: '#fff', // Bar's background color
    },
    percentage: {
        color: '#fff', // Color for the text
        fontWeight: 'bold',
    }
};

export default SplashSc;