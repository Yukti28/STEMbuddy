import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SmartToy from "@mui/icons-material/SmartToy";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../auth_apis/user_api";

const Sidebar = ({ setActivePage }) => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("Home");

  const menuItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Profile", icon: <PersonIcon /> },
    { text: "Chatbot", icon: <SmartToy /> },
    { text: "Leaderboard", icon: <LeaderboardIcon /> },
  ];

  const handleItemClick = (text) => {
    setActiveTab(text);
    setActivePage(text);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#102A43", // Sidebar background color
          color: "#E0FBFC", // Text color
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleItemClick(item.text)}
            selected={activeTab === item.text}
            sx={{
              backgroundColor: activeTab === item.text ? "#A7C7E7" : "#1E3A5F", // Active tab highlight and Inactive tabs color
              color: activeTab === item.text ? "#102A43" : "#E0FBFC", // Text color
              "&:hover": {
                backgroundColor: "#A7C7E7", // Hover color
                color: "#102A43",
              },
            }}
          >
            <ListItemIcon sx={{ color: activeTab === item.text ? "#102A43" : "#E0FBFC" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={logout}
          sx={{
            backgroundColor: "#1E3A5F",
            color: "#E0FBFC",
            "&:hover": {
              backgroundColor: "#A7C7E7",
              color: "#102A43",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#E0FBFC" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

// The Sidebar component is a functional component that renders the sidebar menu items.
// The component uses the Drawer, List, ListItem, ListItemText, and ListItemIcon components from Material-UI to create the sidebar layout.