import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//Function to generate a text response using OpenAI's GPT-4 model
export const generateTextResponse = async (text) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o", // use gpt 4.0 model for generating response
            messages: [{ role: "system", content: `You are a highly knowledgeable tutor specializing in science,math,engineering and technology. 
                      Your goal is to help students by providing clear, accurate, and subject-related answers.Keep responses educational, concise, and engaging.give accurate answer to all questions
                      If the user asks about non-STEM topics (e.g., sports, politics, or entertainment), respond with:
                      "❌ Sorry, I can only answer STEM-related questions."` },
                      { role: "user", content: text }],//Prompt to configure chatbot
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Text Response Error:", error);
        return "Sorry, I couldn't process your request."; //Fallback response in case of error
    }
};

//this function is used to generate a text response using OpenAI's GPT-4 model
//it takes the user's text input and generates a response based on the input
//here openai api key is used to generate the response and that key is stored in the .env file
