import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, IconButton, MenuItem, Select } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { getChatHistory, sendTextMessage } from "../auth_apis/chat_api";
import Message from "./Message";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState(""); // Selected subject
  const [subjects] = useState(["Math", "Science", "Technology", "Engineering"]); // Available subjects

  // Speech Recognition Setup
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Load chat history when subject changes
  useEffect(() => {
    if (subject) {
      fetchHistory(subject);
    }
  }, [subject]);

  const fetchHistory = async (selectedSubject) => {
    try {
      const history = await getChatHistory(selectedSubject);
      setMessages(history);
    } catch (error) {
      console.error("Failed to load chat history");
    }
  };

  // Handle sending message (Text)
  const handleSend = async () => {
    if (!input.trim() || !subject) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botReply = await sendTextMessage(input, subject);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message", error.response?.data || error.message);
    }
    setInput(""); // Clear input field
  };

  // Handle Voice Input Submission
  useEffect(() => {
    if (!listening && transcript) {
      handleVoiceSubmit();
    }
  }, [transcript, listening]);

  const handleVoiceSubmit = async () => {
    if (!transcript.trim() || !subject) 
        return;

    setMessages((prev) => [...prev, { text: transcript, sender: "user" }]);

    try { //Sending text input to backend
      const botReply = await sendTextMessage(transcript, subject);
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending voice message", error.response?.data || error.message);
    }

    resetTranscript();
  };
//Function to start and stop recording
  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        backgroundImage: 'linear-gradient(rgba(10, 30, 90, 0.55), rgba(0, 85, 130, 0.75)), url(/home4.jpg)',
        backgroundSize: 'cover', // Ensure the image covers the entire area
        backgroundPosition: 'center', // Center the image
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "#F0F8FF" }}>
        <Typography variant="h5" align="center">STEMbuddy</Typography>

        {/* Subject Selection */}
        <Select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>Select a subject</MenuItem>
          {subjects.map((subj) => (
            <MenuItem key={subj} value={subj}>{subj}</MenuItem>
          ))}
        </Select>

        {/* Chat History */}
        <Box sx={{ height: 400, overflowY: "auto", p: 2, bgcolor: "#F0F8FF", borderRadius: 2 }}>
          {messages.map((msg, index) => (
            <Message
              key={index}
              text={msg.text}
              sender={msg.sender}
              sx={{
                backgroundColor: msg.sender === "user" ? "#A7C7E7" : "#5DA9A8",
                color: msg.sender === "user" ? "#000" : "#fff",
                padding: 1,
                borderRadius: 1,
                marginBottom: 1,
                textAlign: msg.sender === "user" ? "right" : "left",
              }}
            />
          ))}
        </Box>

        {/* Input & Controls */}
        <Box sx={{ display: "flex", mt: 2 }}>
          <TextField
            fullWidth
            label="Type a message..."
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton onClick={handleMicClick} color={listening ? "error" : "primary"}>
            <MicIcon />
          </IconButton>
          <Button onClick={handleSend} variant="contained" endIcon={<SendIcon />} disabled={!subject} sx={{ backgroundColor: "#4682B4" }}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;

// The Chatbot component is a chat interface that allows users to interact with a chatbot.
// The component displays a chat history, input field, and controls for sending messages.
// The chat history is fetched from the server based on the selected subject.
// The component uses the react-speech-recognition library to enable voice input.

