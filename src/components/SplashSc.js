import React, { useEffect } from "react";

const SplashSc = ({ onFinish }) => {

    useEffect(() => {
        // Automatically navigate after a delay
        const timer = setTimeout(() => {
            onFinish();
        }, 3000); // Show splash for 3 seconds

        return () => clearTimeout(timer); // Clear timer if the component is unmounted
    }, [onFinish]);

    // Inline styles for the splash screen
    const splashScreenStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        backgroundColor: '#f0f0f0', // Background color
        transition: 'opacity 0.5s', // Smooth transition for fade out
    };

    const titleStyle = {
        fontSize: '2.5rem',
        margin: '0',
    };

    const paragraphStyle = {
        fontSize: '1.2rem',
    };


    return (
        <div style={splashScreenStyle}>
            <h1 style={titleStyle}>Welcome to My App!</h1>
            <p style={paragraphStyle}>Loading...</p>
            {/* You can add an animation or logo here */}
        </div>
    );
};


export default SplashSc;