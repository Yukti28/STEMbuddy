import express from 'express';
import { loginUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();
router.post('/login', loginUser);

// Protect routes that require authentication
router.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}!` });
});


export default router;

//this router is used to define the routes for the authentication of the user
//it call middleware and controller to check the user credentials and return the user information
//it also has a protected route which requires authentication to access