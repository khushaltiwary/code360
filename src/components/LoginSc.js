import React from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const LoginSc = () => {

     const navigate = useNavigate(); // Initialize useNavigate

    return (
        <Box sx={styles.container}>
            <Card elevation={5} sx={styles.card}>
                <CardContent>
                    <Typography variant="h5" component="div" sx={styles.title}>
                      360° Code Analytics
                    </Typography>

                    <Typography variant="body2" sx={styles.paragraph}>
                        Please enter your credentials to continue.
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            required
                            fullWidth
                            sx={styles.input}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            sx={styles.input}
                        />
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" 
                    sx={styles.button}
                    onClick={()=> navigate('/home')}
                    >
                        Login
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};


// Styles defined outside the component
const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46beaa',
        padding: 2,
    },
    card: {
        maxWidth: 400,
        borderRadius: 8,
        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s',
        backgroundColor: '#ffffff', // Use white background for the card for better contrast
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 1,
        color: '#46beaa', // Title color to match the theme
        paddingBottom: 0.5,
        textAlign: 'center',
    },
    paragraph: {
        color: '#555', // Darker color for better readability
        marginBottom: 2,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        marginEnd:10,
        marginBottom: 5,
        backgroundColor: '#46beaa',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#39a493', // Darker shade for hover effect
        },
    },
    input: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.3)', // Darker border color
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: '#46beaa', // Color change on hover
        },
        '& .MuiInputLabel-root': {
            color: 'rgba(0, 0, 0, 0.7)', // Label color
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#46beaa', // Focused label color
        },
    }
};

export default LoginSc;