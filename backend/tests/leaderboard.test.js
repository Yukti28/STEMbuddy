import axios from "axios";
//Function to test leaderboard
const testLeaderboard = async () => {
    try {
        console.log("\n Fetching Leaderboard...");

        const res = await axios.get("http://localhost:4001/api/leaderboard?subject=Science");

        console.log("Leaderboard Response:");
        console.log(res.data);
    } catch (error) {
        console.error("Test Failed:", error.response ? error.response.data : error.message);
    }
};

// Run the test
testLeaderboard();
