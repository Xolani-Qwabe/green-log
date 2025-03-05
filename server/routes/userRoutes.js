const { Router } = require('express');
const { query, validationResult, checkSchema, matchedData } = require('express-validator');
const createUserValidationSchema = require('../utils/validation/userValidationSchema.js');
const { generateFakeUsers } = require('../utils/data/faker.js');
const User = require('../data/mongodb/models/user.js');
const { hashPassword } = require('../utils/helpers/encrypt.js');  // Correct import

const userRouter = Router();

// fakeData
const users = generateFakeUsers();

userRouter.get('/users', (req, res) => {
    req.sessionStore.get(req.session.id, (error, sessionData) => {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log("getting session data");
        console.log(sessionData);
    });

    try {
        if (!req.user) return res.status(401).send({ error: "User not Found" });
        res.json(req.user.id);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
});

userRouter.post('/users', checkSchema(createUserValidationSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());

    const data = matchedData(req);
    
    // Use the correct hashPassword function
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

userRouter.get('/users/:id', (req, res) => {
    let parsedId = parseInt(req.params.id);
    if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad Request. Invalid ID." });
    console.log(req.params);
    res.json({ msg: `user ${req.params.id}` });
});

module.exports = userRouter;
