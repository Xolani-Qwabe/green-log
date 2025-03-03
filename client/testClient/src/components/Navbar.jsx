import { useState, Fragment } from "react";
import {
    AppBar,
    Divider,
    Button,
    Stack,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import img from '../assets/clay-banks.jpg'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const pages = [
    { name: "Products", path: "/products" },
    { name: "How it Works", path: "/about" },
    { name: "Community", path: "/blog" },
];

const settings = [
    { name: "Profile", path: "/profile" },
    { name: "Account", path: "/account" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Logout", path: "/logout" },
];

export function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [openLogin, setOpenLogin] = useState(false); // State for login dialog
    const [openSignUp, setOpenSignUp] = useState(false); // State for login dialog

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleLoginClick = () => setOpenLogin(true); // Open the login dialog
    const handleCloseLoginDialog = () => setOpenLogin(false); // Close the dialog

    const handleSignUpClick = () => {
        setOpenSignUp(true);
        setOpenLogin(false)
    } // Open the login dialog
    const handleCloseDialog = () => setOpenSignUp(false); // Close the dialog

    // form handling
    const [loginFormData, setLoginFormData] = useState({
        email:"",
        password:"",
    })

    const [signUpFormData, setSignUpFormData] = useState({
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleLoginChange = (e)=>{
        const {name,value}=e.target;
        setLoginFormData({
            ...loginFormData,
            [name]:value,
        })
    }

    const validateLoginForm = () =>{
        return true
    }

    const validateSignUpForm = () =>{
        return true
    }
    const handleLoginSubmit = (e)=>{
        e.preventDefault();
        const isValid = validateLoginForm();

        if(isValid){
            console.log("Form Submitted", loginFormData)
        }
        else{
            console.log("Form Validation Failed")
        }
    }

    const handleSignUpSubmit = (e)=>{
        e.preventDefault();
        const isValid = validateSignUpForm();

        if(isValid){
            console.log("Form Submitted", signUpFormData)
        }
        else{
            console.log("Form Validation Failed")
        }
    }

    const handleSignUpChange = (e)=>{
        const {name,value}=e.target;
        setSignUpFormData({
            ...signUpFormData,
            [name]:value
        })
    }

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StoreSharpIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        GREEN MARKETS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link to={page.path} style={{ textDecoration: "none", color: "black" }}>
                                        {page.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button key={page.name} sx={{ my: 2, color: "black" }}>
                                <Link to={page.path} style={{ textDecoration: "none", color: "inherit" }}>
                                    {page.name}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    {/* User Avatar and Login Button */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Stack direction="row" spacing={2} sx={{ p: 2, minWidth: "10vw" }}>
                            
                            <Tooltip title="Login to Account">
                                <Button
                                    size="small"
                                    color="secondary"
                                    sx={{ borderRadius: "50px" }}
                                    variant="contained"
                                    onClick={handleLoginClick}
                                >
                                    <Typography variant="caption" >Login</Typography>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User Avatar" src={img} />
                                </IconButton>
                            </Tooltip>
                        </Stack>

                        {/* User Menu */}
                        <Menu
                            sx={{ mt: "45px" }}
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                    <Link to={setting.path} style={{ textDecoration: "none", color: "black" }}>
                                        {setting.name}
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

            <Dialog open={openLogin} onClose={handleCloseLoginDialog} maxWidth="md" fullWidth>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" }, // Stack on small screens
                        p: 0,
                        m: 0
                    }}
                >
                    {/* Image Section */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "50%" }, // Full width on small screens
                            height: { xs: "200px", md: "100%" }, // Adjust height for small screens
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            p: 0,
                            m: 0
                        }}
                    >
                        <Avatar
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                            variant="square"
                            src={img}
                            alt="Login Image"
                        />
                    </Box>

                    {/*Login Form Section */}
                    <Box sx={{ width: { xs: "100%", md: "50%" }, p: 3 }}>
                        <DialogTitle>Login Or SignUp</DialogTitle>
                        <DialogContentText>
                            Enter your email and password to log in.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={loginFormData.email}
                            onChange={handleLoginChange}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "50px"
                                }
                            }}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={loginFormData.password}
                            onChange={handleLoginChange}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "50px"
                                }
                            }}
                        />
                        <Container
                            sx={{ width: "100%", display: "flex", justifyContent: "center" }}

                        >

                            <Button variant="text" sx={{ borderRadius: "50px", color: "green" }} type="submit">
                                Forgot Password?
                            </Button>
                        </Container>

                        <Box my={2} textAlign="center">
                            <Divider>OR</Divider>
                        </Box>

                        <Container
                            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
                        >
                            <IconButton
                                fullWidth
                                variant="contained"
                                color="error"

                                onClick={() => console.log("Facebook login")}
                            >       <GoogleIcon />

                            </IconButton>
                            <IconButton
                                fullWidth
                                variant="contained"
                                color="secondary"

                                onClick={() => console.log("Facebook login")}
                            >       <FacebookIcon />

                            </IconButton>
                        </Container>

                        <DialogActions>
                            <Container
                                sx={{ width: "100%", display: "flex", justifyContent: "space-around", gap:1}}
                            >
                                <Button variant="contained" sx={{ borderRadius: "50px" }} onClick={handleCloseLoginDialog}>
                                    Cancel
                                </Button>
                                <Button variant="contained" sx={{ borderRadius: "50px" }} onClick={handleSignUpClick}>
                                    SignUp
                                </Button>
                                <Button variant="contained" sx={{ borderRadius: "50px" }} type="submit" onClick={handleLoginSubmit}>
                                    Submit
                                </Button>
                            </Container>


                        </DialogActions>
                    </Box>

                </DialogContent>
            </Dialog>



            {/* SignUp Dialog */}
            <Dialog open={openSignUp} onClose={handleCloseDialog}>
                <DialogTitle>SignUp</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your email and password to register.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={signUpFormData.email}
                        onChange={handleSignUpChange}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "50px"
                            }
                        }}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={signUpFormData.password}
                        onChange={handleSignUpChange}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "50px"
                            }
                        }}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="cornfirm-password"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={signUpFormData.confirmPassword}
                        onChange={handleSignUpChange}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "50px"
                            }
                        }}
                    />

                    <Box my={2} textAlign="center">
                        <Divider>OR</Divider>
                    </Box>

                    <Container
                        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <IconButton
                            fullWidth
                            variant="contained"
                            color="error"

                            onClick={() => console.log("Facebook login")}
                        >       <GoogleIcon />

                        </IconButton>
                        <IconButton
                            fullWidth
                            variant="contained"
                            color="secondary"

                            onClick={() => console.log("Facebook login")}
                        >       <FacebookIcon />

                        </IconButton>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Container
                        sx={{ width: "100%", display: "flex", justifyContent: "space-around" }}
                    >
                        <Button variant="contained" sx={{ borderRadius: "50px" }} onClick={handleCloseDialog}>Cancel</Button>
                        <Button variant="contained" sx={{ borderRadius: "50px" }} type="submit" onClick={handleSignUpSubmit}>Submit</Button>
                    </Container>

                </DialogActions>
            </Dialog>
        </AppBar>
    );
}

export default Navbar;
