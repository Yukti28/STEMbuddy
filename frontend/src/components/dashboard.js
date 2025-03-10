import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./sidebar";
import Home from "./home";
import Profile from "./Profile";
import Chatbot from "./Chatbot";
import Leaderboard from "./Leaderboard";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Home");

  const renderComponent = () => {
    switch (activePage) {
      case "Home": return <Home />;
      case "Profile": return <Profile />;
      case "Chatbot": return <Chatbot />;
      case "Leaderboard": return <Leaderboard />;
    
      default: return <Home />;
    }
  };

  return (
    <Box sx={{ display: "flex" ,height: '100vh',width: '100vw'}}>
      <CssBaseline />
      <Sidebar setActivePage={setActivePage} />
      <Box component="main" sx={{ flexGrow: 1, p: 0, m: 0 }}>
        {renderComponent()}
      </Box>
    </Box>
  );
};

export default Dashboard;

// The Dashboard component is the main component that renders the sidebar and the active page based on the user's selection.
// The component uses the useState hook to manage the active page state.

