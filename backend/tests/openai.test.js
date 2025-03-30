import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables
//Function to test API integration
const testOpenAI = async () => {
    try {
        console.log("\n Testing OpenAI API Integration...");

        const res = await axios.post("http://localhost:4001/api/chatbot/text", {
            email:"bob@example.com" ,
            text: "What is the sun ,explain to me?",
            subject: "Science"
        });

        console.log("\n OpenAI Response:");
        console.log(res.data.reply);
        console.log("\n testcase passed !!!!!")
    } catch (error) {
        console.error("\n Test Failed:", error.response ? error.response.data : error.message);
    }
};

// Run the test
testOpenAI();
