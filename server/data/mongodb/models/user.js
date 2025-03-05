const { mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    username: {
        type: mongoose.Schema.Types.String,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: function() {
            return this.googleId ? false : true; 
        },
    },
    googleId: {
        type: mongoose.Schema.Types.String,
        unique: true,
        sparse: true, 
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
