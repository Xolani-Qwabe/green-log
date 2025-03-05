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
    return res.status(200).send({ msg: "ok" });
});

// POST route for creating a new user (moved here from userRoutes.js)
authRouter.post('/auth/local', checkSchema(createUserValidationSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());

    const data = matchedData(req);

    // Hash the password before saving the user
    data.password = await hashPassword(data.password);
    console.log(data);

    const newUser = new User(data);
    if (!newUser.username) newUser.username = newUser.email;
    console.log(newUser);

    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ msg: "User already exists" });
    }
});

// GET route to check authentication status
authRouter.get('/auth/status', (req, res) => {
    return req.user
        ? res.status(200).send(req.user.id)
        : res.status(401).send({ msg: "Not Authenticated" });
});

// GET route to log the user out
authRouter.get('/auth/logout', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    req.logout(); // no callback needed
    req.session.destroy((err) => {
        if (err) return res.sendStatus(400); // handle session destruction error
        res.clearCookie('connect.sid'); // clear the session cookie
        res.sendStatus(200); // successfully logged out
    });
});

// Google Authentication Route
authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
authRouter.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        console.log(`Google login successful, userId: ${req.user._id}`);
        // Redirect to the home page or desired page after successful login
        res.redirect('/dashboard');  // Adjust this redirect as needed
    }
);

module.exports = authRouter;
