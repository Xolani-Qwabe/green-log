const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv').config();
const User = require('../data/mongodb/models/user.js');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.APP_URL}/api/auth/google/callback`,
      passReqToCallback: false, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile received:", profile);

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails?.[0]?.value,
            profilePhoto: profile.photos?.[0]?.value,
          });

          await user.save();
          console.log("New user created:", user);
        } else {
          console.log("User found:", user);
        }

        return done(null, user);
      } catch (err) {
        console.error("Error in GoogleStrategy:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserializing user:", user);
    done(null, user);
  } catch (err) {
    console.error("Error in deserializing user:", err);
    done(err, null);
  }
});

module.exports = passport;
