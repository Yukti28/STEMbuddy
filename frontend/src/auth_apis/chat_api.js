import axios from 'axios';
import config from '../config/config';
import { getUserEmail } from './user_api';

export const getChatHistory = async (subject) => {
    const token = localStorage.getItem('token');
    const email = getUserEmail();

    try {
        const response = await axios.get(`${config.apiBaseUrl}/api/chatbot/history`, {
            params: { subject },
            headers: { Authorization: `Bearer ${token}`, Email: email }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching chat history:', error.response?.data || error.message);
        throw error;
    }
};

export const sendTextMessage = async (text, subject) => {
    const token = localStorage.getItem('token');
    const email = getUserEmail();

    try {
        const response = await axios.post(
            `${config.apiBaseUrl}/api/chatbot/text`,
            { text, subject },
            { headers: { Authorization: `Bearer ${token}`, Email: email } },
            
        );
        return response.data.reply;
    } catch (error) {
        console.error('Error sending message:', error.response?.data || error.message);
        throw error;
    }
};

//this file help to get chat history and send text message to the chatbot.
// getChatHistory function fetches chat history from the server for a given subject.
//and sendTextMessage function sends a text message to the chatbot for a given subject.
//The functions use the axios library to make HTTP requests to the server.