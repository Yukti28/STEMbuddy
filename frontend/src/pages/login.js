import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../auth_apis/user_api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid user or credentials");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: "#008B8B" }}>STEMbuddy Chatbot</Typography>
      <Box sx={{ width: '100%', p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "#F0F8FF" }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        {error && <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" fullWidth type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2, backgroundColor: "#4682B4" }}>Login</Button>
      </Box>
    </Container>
  );
};

export default Login;

// The Login component is a functional component that renders a login form with email and password fields.
// The component uses the Material-UI TextField and Button components to create the form elements with appropriate styling.
