import axios from "axios";
import natural from "natural";
import dotenv from "dotenv";

dotenv.config();

const tokenizer = new natural.WordTokenizer();

// Sample test questions
const questions = [
    "What is pythagoras theorem",
    "What is a prime number?",
    "What is the difference between rational and irrational numbers?",
    
];

// Sample email and subject
const sampleEmail = "bob@example.com";
const sampleSubject = "Math";

// Function to generate reference answers using OpenAI API
const generateReferenceAnswer = async (question) => {
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-4o",
            messages: [
                { role: "system", content: "Provide a clear and accurat answer to user.Your goal is to help students by providing clear, accurate, and subject-related answers" },
                { role: "user", content: question }
            ]
        }, {
            headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error(`❌ Error generating reference answer for "${question}"`);
        return "";
    }
};

// Function to get chatbot's answer
const getChatbotAnswer = async (question) => {
    try {
        const response = await axios.post("http://localhost:4001/api/chatbot/text", {
            email: sampleEmail,        // ✅ Added email
            subject: sampleSubject,    // ✅ Added subject
            text: question             // ✅ Added text (question)
        });

        return response.data.reply.trim();
    } catch (error) {
        console.error(`❌ Error getting chatbot answer for "${question}"`);
        return "";
    }
};

// Function to calculate text similarity score
const calculateAccuracy = (chatbotAnswer, referenceAnswer) => {
    const chatbotTokens = tokenizer.tokenize(chatbotAnswer);
    const referenceTokens = tokenizer.tokenize(referenceAnswer);

    const matchedTokens = chatbotTokens.filter((word) =>
        referenceTokens.includes(word)
    );

    return ((matchedTokens.length / referenceTokens.length) * 100).toFixed(2);
};

// Evaluate Chatbot Accuracy
const evaluateAccuracy = async () => {
    let totalScore = 0;

    for (const question of questions) {
        const referenceAnswer = await generateReferenceAnswer(question);
        const chatbotAnswer = await getChatbotAnswer(question);

        const accuracy = calculateAccuracy(chatbotAnswer, referenceAnswer);

        console.log(`\n❓ Question: ${question}`);
        console.log(`✅ Reference Answer: ${referenceAnswer}`);
        console.log(`🤖 Chatbot Answer: ${chatbotAnswer}`);
        console.log(`📊 Accuracy Score: ${accuracy}%`);

        totalScore += parseFloat(accuracy);
    }

    const averageAccuracy = (totalScore / questions.length).toFixed(2);
    console.log(`\n🔥 Final Accuracy: ${averageAccuracy}%`);
};

evaluateAccuracy();
