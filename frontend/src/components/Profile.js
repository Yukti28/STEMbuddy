import React, { useEffect, useState } from 'react';
import { Container, Typography, Avatar, Box, Paper, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { getUserEmail } from '../auth_apis/user_api'; // Import the function to get user email
import config from '../config/config';

const useStyles = makeStyles(() => ({
  banner: {
    width: '100%',
    height: '200px',
    backgroundImage: 'url(/background.jpg)', // Use direct path to image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: '16px', // Use direct spacing value
  },
  avatar: {
    width: '120px', // Use direct spacing value
    height: '120px', // Use direct spacing value
    margin: '-60px auto 0', // Use direct spacing value
    border: '2px solid white',
  },
  profileContainer: {
    padding: '24px', // Use direct spacing value
    textAlign: 'center',
    backgroundColor: '#A7C7E7', // Background color
  },
  profileName: {
    color: '#008B8B', // Profile name color
  },
  questionSpacing: {
    marginTop: '21px', // Spacing between email and questions
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = getUserEmail(); // Get the user email from the login credentials
        const response = await axios.get(`${config.apiBaseUrl}/api/profile?email=${email}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
      flexDirection: 'column', padding: '75px',width:'100%',margin:'0 auto'
     }}>
      <Box sx={{ width:'100%',maxWidth:'1200px'}}>
        <Box className={classes.banner}></Box>
        <Avatar src="/avtar.jpg" className={classes.avatar} />
        <Paper className={classes.profileContainer}>
          <Typography variant="h4" className={classes.profileName}>{user.name}</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
          <Typography variant="body1" className={classes.questionSpacing}>Science Questions: {user.questioncounter.Science}</Typography>
          <Typography variant="body1">Engineering Questions: {user.questioncounter.Engineering}</Typography>
          <Typography variant="body1">Technology Questions: {user.questioncounter.Technology}</Typography>
          <Typography variant="body1">Math Questions: {user.questioncounter.Math}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;

// The Profile component fetches the user data from the server using the getUserEmail function to get the user email from the login credentials.
// The component displays the user's name, email, and the number of questions asked in each subject.