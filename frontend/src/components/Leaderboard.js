import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config/config';
import { Typography, Box, Select, MenuItem, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarIcon from '@mui/icons-material/Star';

const Leaderboard = () => {
    const [subject, setSubject] = useState('Science');
    const [leaders, setLeaders] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${config.apiBaseUrl}/api/leaderboard?subject=${subject}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => setLeaders(res.data));
    }, [subject, token]);

    return (
        <Box sx={{ backgroundColor: "#F0F8FF", padding: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Leaderboard Rankings</Typography>
            <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{ marginBottom: 4 }}
            >
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="Technology">Technology</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
            </Select>
            <List>
                {leaders.map((user, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            backgroundColor: index === 0 ? "#B3E5FC" : "#B3E5FC",
                            color: index === 0 ? "#fff" : "#000",
                            marginBottom: 1,
                            borderRadius: 1,
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}
                    >
                        <ListItemIcon>
                            {index === 0 ? <EmojiEventsIcon sx={{ color: "#FFD700" }} /> :
                             index === 1 ? <MilitaryTechIcon sx={{ color: "#C0C0C0" }} /> :
                             index === 2 ? <StarIcon sx={{ color: "#CD7F32" }} /> : null}
                        </ListItemIcon>
                        <ListItemText primary={`${user.name} - ${user.questionsAsked} Questions`}
                        //make it dark blue if the user is the first one
                        sx={{ color: index === 0 ? "#0000FF" : "#000" }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Leaderboard;

//The Leaderboard component fetches and displays the top users for a given subject.
//The component uses the axios library to make an HTTP request to the server to fetch the leaderboard data.