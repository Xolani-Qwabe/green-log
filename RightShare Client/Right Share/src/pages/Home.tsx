import { useContext } from 'react';
import { Typography, Container} from '@mui/material';
import { AuthContext } from '../App';

function Home() {
  const { isAuthenticated } = useContext(AuthContext)!;

  return (
    <Container sx={{minHeight:"100vh", minWidth:"100%", mt:"2vh"}}>
      <Typography variant="h4">Home Page</Typography>
      <Typography>Auth Status: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</Typography>
    </Container>
  );
}

export default Home;