## Passport.js Authentication Client

This project demonstrates a login system using Passport.js with both Local Strategy and Google OAuth for authentication. The client is built using React with MUI 6 for styling, and the backend is an Express.js server handling authentication and session management with MongoDB Atlas as the database.

### Features
- User login via **email and password** (Local Strategy)
- Login with **Google OAuth**
- Session-based authentication using **Express sessions**
- Secure credential storage with **bcrypt** for hashing passwords
- **Material-UI (MUI 6)** for modern UI components
- **MongoDB Atlas** for cloud-based database storage

---

## Client

The `/client` folder contains a [React app](https://reactjs.org/) using [Vite](https://vitejs.dev/) and [MUI 6](https://mui.com/). To set up and run the client:

1. Open a terminal in the `/client` folder
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. The application will be available at [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

---

## Server

The `/server` folder contains a **Node.js Express server** using **Passport.js** for authentication. To run the server:

1. Open a terminal in the `/server` folder
2. Run `npm install` to install dependencies
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   SESSION_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   MONGO_URI=your_mongodb_atlas_connection_string
   ```
4. Run `npm start` to launch the server

The server will be running on [http://localhost:3000](http://localhost:3000) and will handle authentication requests.

---

## Authentication Routes

### Local Strategy (Email & Password)
- **POST `/auth/register`** - Register a new user
- **POST `/auth/login`** - Login with email and password
- **GET `/auth/logout`** - Logout the user

### Google OAuth
- **GET `/auth/google`** - Redirects to Google for authentication
- **GET `/auth/google/callback`** - Handles Google authentication callback

---

## Dependencies
### Client
- React
- Vite
- Axios
- React Router
- **Material-UI (MUI 6)**

### Server
- Express.js
- Passport.js
- Passport-local
- Passport-google-oauth20
- bcrypt
- express-session
- **MongoDB Atlas (Mongoose)**

This project provides a secure and scalable authentication system with session management, OAuth integration, and a modern UI powered by MUI 6.


