
import { Typography , Container} from '@mui/material';
import Grid2 from '@mui/material/Grid2';

function About() {
  return (
    <Container sx={{minHeight:"100vh", minWidth:"100%", mt:"2vh"}}>
        <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
        <Typography variant="h4">About Us</Typography>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Typography>This is the about page.</Typography>
       
      </Grid2>
    </Grid2>
    </Container>
  );
}

export default About;