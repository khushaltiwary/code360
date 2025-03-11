// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#46beaa",
                color: "black",
                textAlign: "center",
                padding: "1rem 0",
                width: "100%",
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
    );
};

export default Footer;