import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/db_connection.js';
import { seedUsers } from './config/seed.js';



// Import Routes
import authRoutes from './routes/authRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import profileRoutes from './routes/profileRoutes.js';


dotenv.config();
const app = express();

// Connect to MongoDB
//connectDB();

// Seed users only use when you want to seed the database with some initial data only once
//seedUsers();


//middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json()); 
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);


const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`); 
});

export {app};