import { useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { AppBar, Toolbar, Button, Typography, IconButton , Box} from '@mui/material';
import { AuthContext } from '../../App';
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Icons for the theme toggle
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

function MyNav({ onThemeToggle, isDarkMode }: { onThemeToggle: () => void, isDarkMode: boolean }) {
  const authContext = useContext(AuthContext);
  const buttonStyle = {borderRadius:"12px"};

  if (!authContext) {
    throw new Error("MyNav must be used within an AuthProvider");
  }

  const { isAuthenticated, setIsAuthenticated } = authContext;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{ minWidth: "100vw", m: 0, p: 1 }}>
      <Toolbar sx={{ p: 0, m: 0, display: "flex", justifyContent:"space-between",gap: "1em" }}>
        <Box  sx={{display:"flex", flexDirection:"column",flexBasis:"flex-end" }}>
        <IconButton sx={{ml:3, mt:-2, p:0, position:"absolute",}}>
          <FontAwesomeIcon style={{color:"white" }} size="2x"  icon={faCloud} />
        </IconButton>
        <Typography 
        component={Link}
        to="/" 
        variant="h5" 
        sx={{
          fontFamily: "Luckiest Guy", 
          flexGrow: 1, 
          fontWeight:"900" , 
          color:"#ff85a6",
          textDecoration:"none",
          lineHeight:"-2em",
          zIndex:"2",
          WebkitTextStroke: ".1px black", 
          textShadow: `
            -2px -2px 0 black,  
             2px -2px 0 black,
            -2px  2px 0 black,
             2px  2px 0 black
          `
  
          
        }}>
          Zulu Lethu
        </Typography>
        </Box>
        <Box sx={{gap:1, minWidth:"30%", display:"flex", justifyContent:"space-around"}}>
        <Button
          sx={buttonStyle}
          color="inherit"
          component={Link}
          to="/"
          variant={location.pathname === '/' ? 'contained' : 'outlined'}
          onClick={() => navigate('/')}>
          Home
        </Button>
        <Button
          sx={buttonStyle}
          component={Link}
          to="/about"
          variant={location.pathname === '/about' ? 'contained' : 'outlined'}
          color="inherit" onClick={() => navigate('/about')}>
          About
        </Button>
        {!isAuthenticated ? (
          <>
            <Button
              sx={buttonStyle}
              component={Link}
              to="/login"
              variant={location.pathname === '/login' ? 'contained' : 'outlined'}
              color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button
              sx={buttonStyle}
              component={Link}
              to="/signup"
              variant={location.pathname === '/signup' ? 'contained' : 'outlined'}
              color="inherit" onClick={() => navigate('/signup')}>
              Signup
            </Button>
          </>
        ) : (
          <>
            <Button sx={buttonStyle} color="inherit" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button sx={buttonStyle} color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
        <IconButton color="inherit" onClick={onThemeToggle}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MyNav;
