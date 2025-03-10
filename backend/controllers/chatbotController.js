import { generateTextResponse } from '../utils/openaiUtils.js';
import User from '../models/User.models.js';
import Chat from '../models/chat.models.js';

export const textChat = async (req, res) => {
    try {
        const { text, subject } = req.body;
        if (!text) return res.status(400).json({ message: "Text input is required" });
        if (!subject) return res.status(400).json({ message: "Subject selection is required" });

        // Generate OpenAI response
        let responseText;
        try {
            responseText = await generateTextResponse(text);
        } catch (error) {
            console.error("OpenAI Error:", error);
            responseText = "Sorry, I couldn't process your request.Please try again later.";
        }

        
        // Save chat history
        let chat = await Chat.findOne({ user: req.user._id, subject });
        if (!chat) chat = new Chat({ user: req.user._id, subject, message: [] });

        chat.message.push({ text, sender: 'user' });    // Save user message
        chat.message.push({ text: responseText, sender: 'bot' });   // Save bot response
        await chat.save();

        // Update user question count for the selected subject
        await User.findByIdAndUpdate(req.user._id, { $inc: { [`questioncounter.${subject}`]: 1 } });

        res.json({ reply: responseText });
    } catch (error) {
        console.error("Error in textChat:", error);
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
};

export const getChatHistory = async (req, res) => {
    try {
        const { subject } = req.query;
        if (!subject) return res.status(400).json({ message: "Subject is required ,plese select one subject" });

        const chat = await Chat.findOne({ user: req.user._id, subject });
        res.json(chat ? chat.message : []);  // Return chat history if available for that subject
    } catch (error) {
        console.error("Error in getChatHistory:", error);
        res.status(500).json({ message: 'Error retrieving chat history', error: error.message });
    }
};

//this controller is used to handle the chat between the user and the chatbot
//it takes the user input text and the subject as input and generates a response using the openai api
//it saves the chat history and updates the user question counter for the selected subject