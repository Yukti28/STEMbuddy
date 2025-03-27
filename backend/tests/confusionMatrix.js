import axios from "axios";
import natural from "natural";
import dotenv from "dotenv";

dotenv.config();

const tokenizer = new natural.WordTokenizer();

// Sample test questions
const questions = [
    // "What is Pythagoras' theorem?",
    // "What is a prime number?",
    // "What is the difference between rational and irrational numbers?",
    
    "What is the formula for Newton's second law of motion?",
    "What is the formula for gravity?",
    "What is the full form of DNA?",
   
];

// Sample email and subject
const sampleEmail = "bob@example.com";
const sampleSubject = "Science";

// Function to generate reference answers using OpenAI API
const generateReferenceAnswer = async (question) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "Provide clear, accurate, and subject-related answers." },
                    { role: "user", content: question },
                ],
            },
            {
                headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error(`Error generating reference answer for "${question}"`);
        return "";
    }
};

// Function to get chatbot's answer
const getChatbotAnswer = async (question) => {
    try {
        const response = await axios.post(
            "http://localhost:4001/api/chatbot/text",
            {   text: question ,
                email: sampleEmail,
                subject: sampleSubject,
                
            }
        );

        return response.data.reply.trim();
    } catch (error) {
        console.error(`Error getting chatbot answer for "${question}"`);
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

// **Evaluate Chatbot Accuracy and Display Confusion Matrix**
const evaluateAccuracy = async () => {
    let tp = 0, fp = 0, fn = 0, tn = 0;  // **Manually Track Confusion Matrix Values**

    for (const question of questions) {
        const referenceAnswer = await generateReferenceAnswer(question);
        const chatbotAnswer = await getChatbotAnswer(question);

        // Calculate accuracy percentage
        const accuracy = calculateAccuracy(chatbotAnswer, referenceAnswer);
        const isCorrect = accuracy >= 70; //Define accuracy threshold

        if (isCorrect) {
            tp++;  // True Positive: Correctly Predicted as Correct
        } else {
            fn++;  // False Negative: Incorrectly Predicted as Incorrect
        }

        console.log(`\n Question: ${question}`);
        console.log(`Reference Answer: ${referenceAnswer}`);
        console.log(` Chatbot Answer: ${chatbotAnswer}`);
        console.log(` Accuracy Score: ${accuracy}%`);
        console.log(` Classified as: ${isCorrect ? "✅ Correct" : "❌ Incorrect"}`);
    }

    // ** Manually Display Confusion Matrix**
    console.log("\n Confusion Matrix:");
    console.log(`                  |Predicted: Correct|Predicted: Incorrect|`);
    console.log(`----------------------------------------------------`);
    console.log(`Actual: Correct   |        ${tp}         |        ${fn}        |`);
    console.log(`Actual: Incorrect |        ${fp}         |        ${tn}        |`);

    // Calculate Performance Metrics
    const accuracy = ((tp + tn) / (tp + tn + fp + fn) * 100).toFixed(2);
    const precision = ((tp / (tp + fp || 1)) * 100).toFixed(2);
    const recall = ((tp / (tp + fn || 1)) * 100).toFixed(2);
    const f1Score = ((2 * precision * recall) / (parseFloat(precision) + parseFloat(recall) || 1)).toFixed(2);

    console.log("\n Chatbot Performance Metrics:");
    console.log(` Accuracy: ${accuracy}%`);
    console.log(` Precision: ${precision}%`);
    console.log(` Recall: ${recall}%`);
    console.log(` F1-Score: ${f1Score}%`);
};

evaluateAccuracy();
