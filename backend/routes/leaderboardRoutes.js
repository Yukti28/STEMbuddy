import express from 'express';
import { getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();
router.get('/', getLeaderboard);

export default router;

//this router is used to define the routes for the leaderboard
//it help to retrive top users information based on the subject