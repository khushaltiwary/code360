import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from 'react-router-dom';

const WhiteboardSc = ({children}) => {
    //const [currentComponent, setCurrentComponent] = useState(<HomeSc />);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const drawerItems = [
        { text: "Home 🏠 ", path: "/home" }, // Assuming UpcomingFeatures is imported
        { text: "Upcoming Features ✨ ", path: "/upcomingFeatures" }, // Assuming UpcomingFeatures is imported
        // More items can be added here
    ];

    
    // Function to open and close the drawer
     const toggleDrawer = (open) => {
        setDrawerOpen(open); // Simplified to directly set state
    };

    /*// Function to handle card selection and loading other components
    const loadComponent = (component) => {
        setCurrentComponent(component);
    };*/

    return (
        <Box sx={styles.whiteboardContainer}>
        {/* Pass toggleDrawer without arrow function to keep it simple */}
        <Navbar toggleDrawer={() => toggleDrawer(true)} /> 

        {/* Drawer to show menu items */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}
            >
                <List>
                    {drawerItems.map((item) => (
                        <ListItem button key={item.text} component={Link} to={item.path}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
        <Box >{/* Only add css to this box when you want to apply it to all components in HomeS*/}
            {children} {/* Render the current component here */}
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