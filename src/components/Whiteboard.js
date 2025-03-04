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



const WhiteboardSc = () => {
    return (
        <>

        </>
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

export default WhiteboardSc;