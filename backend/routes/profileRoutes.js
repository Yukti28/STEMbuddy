import express from 'express';
import { getUserProfile } from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getUserProfile);

export default router;

//this router is used to define the routes for the user profile
//it calls the middleware to check if the user is authenticated