import { useContext } from 'react';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { AuthContext } from '../App';

function Account() {
  const { isAuthenticated } = useContext(AuthContext)!;

  return (
    <Grid2 container sx={{mt:"8vh"}} spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4">Account Settings</Typography>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        {isAuthenticated ? (
          <Typography>Manage your account settings here.</Typography>
        ) : (
          <Typography>Please log in to manage your account.</Typography>
        )}
      </Grid2>
   
    </Grid2>
  );
}

export default Account;