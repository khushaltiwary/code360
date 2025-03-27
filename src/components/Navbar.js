import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/Worldline-Coconut-Horizontal.png"; // Adjust the path to your logo
import { Link } from "react-router-dom";

const Navbar = ({ toggleDrawer }) => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#46beaa" }}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => toggleDrawer(true)} // Ensure toggleDrawer is called correctly
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Code Analytics
                </Typography>
                <Link to="/home">
                <img src={logo} alt="Company Logo" style={{ height: "40px", cursor: "pointer" }} />
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;