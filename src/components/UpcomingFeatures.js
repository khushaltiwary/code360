import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
} from '@mui/material';

const features = [
    {
        title: "Generate Architecture Diagram",
        description: "Visualize your application's architecture with just a click.",
    },
    {
        title: "Generate Workflows",
        description: "Define and create custom workflows for efficient processing.",
    },
    {
        title: "Generate Code from Architecture",
        description: "Automatically produce code from defined architecture diagrams.",
    },
    {
        title: "Code Interaction",
        description: "Interact with generated code effortlessly and make adjustments directly.",
    },
];

const UpcomingFeatures = () => {
    return (
        <Box sx={styles.container}>
            <Typography variant="h4" component="h1" sx={styles.title}>
                Upcoming Features
            </Typography>
            <Typography variant="body1" sx={styles.subtitle}>
                Stay tuned for our exciting new features!
            </Typography>
            <Grid container spacing={3} sx={styles.gridContainer}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card elevation={3} sx={styles.card}>
                            <CardContent>
                                <Typography variant="h6" component="h2" sx={styles.featureTitle}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" sx={styles.featureDescription}>
                                    {feature.description}
                                </Typography>
                                <Button variant="contained" sx={styles.button}>
                                    Notify Me
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const styles = {
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        padding: "2rem 3rem",
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        height:"67vh",
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#46beaa', // Main theme color
    },
    subtitle: {
        marginBottom: '24px',
        color: '#666',
    },
    gridContainer: {
        marginBottom: '20px',
    },
    card: {
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'left',
        background: 'linear-gradient(white, #f0f8ff)',
        transition: '0.3s',
        height: '200px', // Fixed height for all cards
        '&:hover': {
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            transform: 'scale(1.02)',
        },
    },
    featureTitle: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '8px',
    },
    featureDescription: {
        color: '#777',
        marginBottom: '16px',
    },
    button: {
        backgroundColor: '#46beaa',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#39a493',
        },
    },
};

export default UpcomingFeatures;