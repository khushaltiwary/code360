import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeSc from "./HomeSc";

const WhiteboardSc = () => {
    const [currentComponent, setCurrentComponent] = useState(<HomeSc />);
    const [drawerOpen, setDrawerOpen] = useState(false);


    // Function to open and close the drawer
    const toggleDrawer = (open) => (event) => {
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
        setDrawerOpen(open);
      };

    // Function to handle card selection and loading other components
    const loadComponent = (component) => {
        setCurrentComponent(component);
    };

    return (
        <Box sx={styles.whiteboardContainer}>
            <Navbar toggleDrawer={toggleDrawer} loadComponent={loadComponent} /> {/* Pass loadComponent as a prop */}
            <Box sx={styles.contentArea}>
                {currentComponent} {/* Render the current component here */}
            </Box>
            <Footer />
        </Box>
    );
};

// Styles for the WhiteboardCr component
const styles = {
    whiteboardContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    contentArea: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
};

export default WhiteboardSc;