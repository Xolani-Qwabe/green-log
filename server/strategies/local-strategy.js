const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../data/mongodb/models/user.js')
const {comparePassword} = require('../utils/helpers/encrypt.js')

passport.serializeUser((user, done)=>{
    console.log(`User serialized`);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    console.log(`Inside Deserialize User`);
    const findUser = await User.findById(id);
    if(!findUser) 
    if (!findUser)  return done(new Error("User not found"), null);
    console.log("User deserialized!");
    done(null, findUser);
});

const localStrategy = new Strategy(
    {usernameField:"email"}, async (email, password, done) => {
    try {
        const findUser = await User.findOne({email})
        if(!findUser) throw new Error("User not found!")
        if(!comparePassword(password, findUser.password)) throw new Error("Bad credentials")
        return done(null, findUser);
    } catch (error) {
        return done(error, null);
    }
});

// Register the strategy with passport
passport.use(localStrategy);


module.exports = localStrategy;



