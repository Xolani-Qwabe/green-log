const express = require('express');
const cors = require('cors');  
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const mockUsers = require('./utils/data/constants.js');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const {createServer} = require('node:http');
const { Server } = require('socket.io');
const { join } = require('node:path');
require('./strategies/local-strategy.js');
require('./strategies/googlePassport.js')

const app = express();
const server = createServer(app)
const io = new Server(server);

// env values
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// CORS Setup
const corsOptions = {
  origin: 'http://localhost:5173', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, 
};

// Middleware
app.use(cors(corsOptions));  

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
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// router middleware
app.use('/api/', router);

server.listen(PORT,()=>{
  console.log(`Server running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  console.log(`sessionID is : ${req.session.id}`);
  req.session.visited = true;
  res.cookie('hello', 'world', {
    maxAge: 1000 * 60 * 60 * 24,
    signed: true,
  });
  res.status(201).sendFile(join(__dirname, 'index.html'));;
});

io.on('connection', (socket) => {
  console.log('a user connected');
});
