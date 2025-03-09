import { useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import { AuthContext } from '../../App';
import { Brightness4, Brightness7 } from '@mui/icons-material'; // Icons for the theme toggle

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
    <AppBar position="fixed" sx={{ minWidth: "100vw", m: 0, p: 2 }}>
      <Toolbar sx={{ p: 1, m: 0, display: "flex", gap: "1em" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
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
      </Toolbar>
    </AppBar>
  );
}

export default MyNav;
