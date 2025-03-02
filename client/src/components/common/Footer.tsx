import React from "react";
import { Box } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "25px",
        bgcolor: "primary.main",
        color: "white",
        textAlign: "end",
        lineHeight: "25px",
        paddingRight: "10px",
        fontSize: "10px",
      }}
    >
      © 2025 Test Drive Booking
    </Box>
  );
};

export default Layout;
