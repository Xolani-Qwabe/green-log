const bcrypt = require('bcrypt');

const saltRounds = 10;

// Asynchronous hashPassword
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
};

// Synchronous comparePassword
const comparePassword = (plain, hashed) => {
    return bcrypt.compareSync(plain, hashed); // Synchronous
};

// Export both functions
module.exports = { hashPassword, comparePassword };
