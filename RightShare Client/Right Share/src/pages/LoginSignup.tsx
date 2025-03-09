import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { 
    Button, Typography, TextField, Box, Card, 
    CardActionArea, CardMedia, CardContent, CardActions, Divider
} from '@mui/material';
import { AuthContext } from '../App';
import img from '../assets/com.jpg';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faGoogle, faFacebook, faLinkedin, 
    faTiktok, faSpotify, faYoutube, faApple
} from '@fortawesome/free-brands-svg-icons';

function LoginSignup() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuthenticated } = useContext(AuthContext)!;
    const isSignup = location.pathname === "/signup";
    const from = location.state?.from?.pathname || "/";

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            setIsAuthenticated(true);
            navigate(from, { replace: true });
        }
    };

    return (
        <Box sx={{
            minHeight: "100vh",
            minWidth: "80vw",
            mt: "4vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Card sx={{ maxWidth: 345, p: 2 }}>
                <CardActionArea disableRipple disableTouchRipple>
                    <CardMedia
                        component="img"
                        height="140"
                        image={img}
                        alt="Login Image"
                    />
                </CardActionArea>
                <CardContent sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {isSignup ? "Sign Up" : "Login"}
                    </Typography>
                    <TextField
                        sx={{ borderRadius: "24px" }}
                        id="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                    />
                    <TextField
                        sx={{ borderRadius: "24px" }}
                        id="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                    />
                </CardContent>
                <CardActions>
                    <Button 
                        variant="contained" 
                        sx={{ borderRadius: "12px", width: "100%" }} 
                        size="large" 
                        color="primary" 
                        onClick={handleAuth}
                    >
                        Submit
                    </Button>
                </CardActions>

                {/* Divider with OR */}
                <Divider sx={{ my: 2 }}>OR</Divider>

                {/* Social Icons */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    my: 2
                }}>
                    <FontAwesomeIcon icon={faGoogle} size="2x" style={{ cursor: "pointer", color: "#DB4437" }} />
                    <FontAwesomeIcon icon={faFacebook} size="2x" style={{ cursor: "pointer", color: "#1877F2" }} />
                    <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ cursor: "pointer", color: "#0077B5" }} />
                    <FontAwesomeIcon icon={faTiktok} size="2x" style={{ cursor: "pointer", color: "black" }} />
                    <FontAwesomeIcon icon={faSpotify} size="2x" style={{ cursor: "pointer", color: "#1DB954" }} />
                    <FontAwesomeIcon icon={faYoutube} size="2x" style={{ cursor: "pointer", color: "#FF0000" }} />
                    <FontAwesomeIcon icon={faApple} size="2x" style={{ cursor: "pointer", color: "black" }} />
                </Box>
            </Card>
        </Box>
    );
}

export default LoginSignup;
