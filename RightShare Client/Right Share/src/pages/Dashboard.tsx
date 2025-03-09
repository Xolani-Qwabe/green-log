import { useContext } from 'react';
import { Typography, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router';
import { AuthContext } from '../App';

function Dashboard() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const buttonStyle = {borderRadius:"12px"};
    if (!authContext) {
        throw new Error("Dashboard must be used within an AuthProvider");
    }

    const { setIsAuthenticated } = authContext;

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <Box sx={{ width: '100%' ,mt:"4vh", height:"100%", }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6}>
                    <Typography variant="h4">Dashboard</Typography>
                </Grid>
                <Grid size={{xs:12}}>
                    <Button sx={buttonStyle} variant="outlined" onClick={() => navigate("/dashboard/account")}>
                        Account
                    </Button>
                </Grid>
                <Grid size={{xs:12, sm:6}}>
                    <Button sx={buttonStyle} variant="outlined" onClick={() => navigate("/dashboard/profile")}>
                        Profile
                    </Button>

                </Grid>
                <Grid size={{xs:6}}>
                    <Button sx={buttonStyle} variant="contained" onClick={handleLogout}>
                        Logout
                    </Button>

                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;

