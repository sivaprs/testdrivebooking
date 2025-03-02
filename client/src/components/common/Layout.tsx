import React, { ReactNode } from "react";
import { Box, CssBaseline, Container } from "@mui/material";

import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />

      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px", // Push content down (same height as AppBar)
          mb: "50px", // Space for footer
          overflowY: "auto",
          fontSize: "12px",
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>

      {/* Fixed Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
