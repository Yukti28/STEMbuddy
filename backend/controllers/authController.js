import User from '../models/User.models.js';

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error ,try again later' });
    }
};

//this controller is used to check the userlogin credentials and return the user information if the credentials are correct