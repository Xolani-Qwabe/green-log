const express = require('express');
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const mockUsers = require('./utils/data/constants.js');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('./strategies/local-strategy.js')


const app = express();

// env values
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Middleware
app.use(express.json());

mongoose.connect(CONNECTION_STRING)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.use(cookieParser("0fhhgvshjkdosjdgdy"));
app.use(
    session({
        secret: '0fgggjmjah',
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge:1000*60*60*24,
        },
        store:MongoStore.create({
            client:mongoose.connection.getClient(),
        })
    })
);

app.use(passport.initialize());
app.use(passport.session());

// router middleware
app.use('/api/',router);

// MongoDB Connection


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

app.get('/', (req, res) => {
    console.log(`sessionID is : ${req.session.id}`);
    req.session.visited = true;
    res.cookie('hello', 'world', {
        maxAge: 1000*60*60*24,
        signed: true
    })
    res.status(201).send(req.session);
});



