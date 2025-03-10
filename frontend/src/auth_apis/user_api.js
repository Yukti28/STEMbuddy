import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import config from "../config/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${config.apiBaseUrl}/api/auth/login`, { email, password });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user in localStorage
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const getUserEmail = () => {
  // Logic to get the user email from login credentials
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.email : null;
};

// The AuthProvider component is a context provider that stores the user state and provides login and logout functions.
// The login function sends a POST request to the server to authenticate the user.
// The logout function clears the user state and removes the user from localStorage.