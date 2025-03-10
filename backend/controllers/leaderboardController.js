import User from '../models/User.models.js';

export const getLeaderboard = async (req, res) => {
    try {
        let { subject } = req.query;
        if (!subject) return res.status(400).json({ message: "Subject is required" });

        const validSubjects = ["Science", "Engineering", "Technology", "Math"];
        
        if (!validSubjects.includes(subject)) {
            return res.status(400).json({ message: "Invalid subject" });
        }

        // Fetch top 3 users sorted by questions asked in the given subject
        const topUsers = await User.find({ [`questioncounter.${subject}`]: { $exists: true } })
            .sort({ [`questioncounter.${subject}`]: -1, createdAt: 1 })
            .limit(3);

        // If no users found, return empty list
        if (!topUsers.length) {
            return res.json([]);
        }

        res.json(topUsers.map(user => ({
            name: user.name,
            email: user.email,
            questionsAsked: user.questioncounter?.[subject] ?? 0
        })));
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: 'Error fetching leaderboard', error: error.message });
    }
};

//this controller is used to get the top 3 users who asked the most questions in a given subject
//the users are sorted by the number of questions asked in the given subject
//here it requires the subject as a query parameter