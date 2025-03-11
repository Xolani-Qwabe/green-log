import { useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { AppBar, Toolbar, Button, Typography, IconButton , Box, Avatar} from '@mui/material';
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

      <Toolbar sx={{ p: 0, m: 0, display: "flex", justifyContent:"space-evenly",gap: "1em" }}>
      <Box sx={{display:"flex",alignItems:"center", justifyContent:"space-between", width:"100%"}}>
        <Box  sx={{display:"flex", flexDirection:"column",flexBasis:"flex-end", ml:12 }}>
        <IconButton sx={{ml:4, mt:.8, p:0, position:"absolute",}}>
          <FontAwesomeIcon style={{color:"white" }} size="1x"  icon={faCloud} />
        </IconButton>
        <Typography 
        component={Link}
        to="/" 
        variant="h6" 
        sx={{
          fontFamily: "Luckiest Guy", 
          flexGrow: 1,
          pt:2, 
          fontWeight:"900" , 
          color:"#fff",
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
       
        <Box sx={{display:"flex",mr:14,}}>
        <Box sx={{gap:1, minWidth:"30%",mr:14, display:"flex", justifyContent:"space-ar"}}>
        <Button
          sx={buttonStyle}
          color="inherit"
          component={Link}
          to="/"
          variant={location.pathname === '/' ? 'contained' : 'text'}
          onClick={() => navigate('/')}>
          Home
        </Button>
        <Button
          sx={buttonStyle}
          component={Link}
          to="/about"
          variant={location.pathname === '/about' ? 'contained' : 'text'}
          color="inherit" onClick={() => navigate('/about')}>
          About
        </Button>
        {!isAuthenticated ? (
          <>
            <Button
              sx={buttonStyle}
              component={Link}
              to="/login"
              variant={location.pathname === '/login' ? 'contained' : 'text'}
              color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button
              sx={buttonStyle}
              component={Link}
              to="/signup"
              variant={location.pathname === '/signup' ? 'contained' : 'text'}
              color="inherit" onClick={() => navigate('/signup')}>
              Signup
            </Button>
          </>
        ) : (
          <>
            <Button sx={buttonStyle} 
              component={Link}
              to="/dashboard"
              variant={location.pathname === '/dashboard' ? 'contained' : 'text'}
              color="inherit" 
              onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button
            component={Link}
            to="/logout"
            variant={location.pathname === '/logout' ? 'contained' : 'text'}
            sx={buttonStyle} color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
        </Box>
        <Box sx={{display:"flex", gap:1, flexGrow:0}}>
          <Avatar component={Link} to='/dashboard/profile' sx={{ bgcolor: 'secondary.main' }}></Avatar>
        <IconButton color="inherit" onClick={onThemeToggle}>
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        </Box>
        </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default MyNav;
