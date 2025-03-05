const { Router } = require('express');
const passport = require('passport');
const { validationResult, checkSchema, matchedData } = require('express-validator');
const createUserValidationSchema = require('../utils/validation/userValidationSchema.js');
const User = require('../data/mongodb/models/user.js');
const { hashPassword } = require('../utils/helpers/encrypt.js');

const authRouter = Router();

// POST route for user login (Passport authentication)
authRouter.post('/auth/login', passport.authenticate("local"), (req, res) => {
    console.log(`Logged in User with userId : ${req.user._id}`);
    return res.status(200).json({ success: true, userId: req.user._id });
});


// POST route for creating a new user (moved here from userRoutes.js)
authRouter.post('/auth/local', checkSchema(createUserValidationSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json(result.array());

    const data = matchedData(req);
    data.password = await hashPassword(data.password);

    const newUser = new User(data);
    if (!newUser.username) newUser.username = newUser.email;

    try {
        const savedUser = await newUser.save();
        
        // Auto-login user after signup
        req.login(savedUser, (err) => {
            if (err) return res.status(500).json({ msg: "Login after signup failed" });
            return res.status(201).json({ success: true, userId: savedUser._id });
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "User already exists" });
    }
});


// GET route to check authentication status
authRouter.get('/auth/status', (req, res) => {
    return req.user
        ? res.status(200).send(req.user.id)
        : res.status(401).send({ msg: "Not Authenticated" });
});

// GET route to log the user out
authRouter.get('/auth/logout', (req, res, next) => {
    if (!req.user) return res.status(401).send({msg:"No User logged in"}); 

    req.logout((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ msg: "Logout failed" });
        }

        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res.status(500).json({ msg: "Could not destroy session" });
            }

            res.clearCookie('connect.sid', { path: '/' }); 
            return res.sendStatus(200); 
        });
    });
});

// Google Authentication Route
authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
authRouter.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
    (req, res) => {
        console.log(`Google login successful, userId: ${req.user._id}`);
        res.redirect('http://localhost:5173/home');
    }
);

module.exports = authRouter;
