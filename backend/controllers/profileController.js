import User from '../models/User.models.js';

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            name: user.name,
            email: user.email,
            questioncounter: user.questioncounter || {}
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

//this controller is used to get the user profile information based on the user id
//it returns the user information field and the questioncounter field  excluding the password field