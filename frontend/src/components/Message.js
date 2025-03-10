import React from "react";
import { Box, Typography } from "@mui/material";

const Message = ({ text, sender }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: sender === "user" ? "flex-end" : "flex-start",
        mb: 1
      }}
    >
      <Typography
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: sender === "user" ? "primary.main" : "grey.300",
          color: sender === "user" ? "white" : "black",
          maxWidth: "75%"
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Message;

// The Message component is a simple functional component that renders a message bubble with the provided text and sender information.
// The component uses the Material-UI Box and Typography components to create the message bubble with appropriate styling based on the sender.