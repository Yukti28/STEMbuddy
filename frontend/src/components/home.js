import React from "react";
import { Typography, Box, Container } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: 'linear-gradient(rgba(10, 30, 90, 0.55), rgba(0, 85, 130, 0.75)), url(/home4.jpg)',




        backgroundSize: 'cover', // Ensure the image covers the entire area
        backgroundPosition: 'center', // Center the image
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff', // Contrast color for text
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow for better readability
        padding: 4,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Welcome to STEMbuddy Chatbot!
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, fontStyle: 'italic' }}>
          Your personal assistant for all your educational needs.
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, textDecoration: 'underline' }}>
          What can STEMbuddy do for you?
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Answer questions related to Science, Math, Technology, and Engineering.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Provide detailed explanations and step-by-step solutions.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Offer personalized study tips and resources.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - Keep track of your progress and performance.
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          - And much more!
        </Typography>
        <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>
          Get started now and enhance your learning experience with STEMbuddy !
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;

// The Home component is a simple functional component that displays a welcome message and a brief description of the Tutor Chatbot application.
// The component uses the Box and Typography components from Material-UI to create a visually appealing layout.