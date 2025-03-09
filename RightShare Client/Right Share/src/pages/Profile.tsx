import  { useContext } from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { AuthContext } from '../App';

function Profile() {
  const { isAuthenticated } = useContext(AuthContext)!;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4">Profile</Typography>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        {isAuthenticated ? (
          <Typography>Welcome to your profile!</Typography>
        ) : (
          <Typography>Please log in to view your profile.</Typography>
        )}
      </Grid2>
    </Grid2>
  );
}

export default Profile;