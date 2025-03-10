import User from '../models/User.models.js';

const authMiddleware = async (req, res, next) => {
    try {
        let email = req.body.email || req.query.email || req.headers['email'];

        if (!email) return res.status(401).json({ message: 'Unauthorized: Email missing' });

        email = email.trim().toLowerCase(); // Fix case sensitivity

        const user = await User.findOne({ email }).select('-password'); // Exclude password

        if (!user) {
            return res.status(401).json({ message: 'User not found in database' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export default authMiddleware;

//this middleware is used to authenticate the user based on the email provided in the request
//it checks if the user exists in the database and attaches the user object to the request object
//it basically act as middle man between the request and the controller and checks if the user is authenticated
//if the user is authenticated then it calls the next controller(eg: profileController,leaderboardController) 