import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth_apis/user_api";
import Login from "./pages/login";
import Dashboard from "./components/dashboard";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

// The App component is the main component that sets up the routing for the application.
// The component uses the BrowserRouter component from react-router-dom to enable routing in the application.
// The AuthProvider component is used to provide authentication context to the application.