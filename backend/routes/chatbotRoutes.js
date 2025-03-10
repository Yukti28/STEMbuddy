import express from 'express';
import { textChat, getChatHistory } from '../controllers/chatbotController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/text', authMiddleware, textChat); // Handle text messages
router.get('/history', authMiddleware, getChatHistory); // Retrieve chat history

export default router;

//this router is used to define the routes for the chatbot
//it calls the middleware to check if the user is authenticated