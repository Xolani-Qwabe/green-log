const createUserValidationSchema = {
    email: {
      isString: {
        errorMessage: "Email must be a string!",
      },
      isLength: {
        options: { min: 5, max: 32 },
        errorMessage: "Email must be between 5 and 32 characters!",
      },
      isEmail: {
        errorMessage: "Invalid email format!",
      },
      notEmpty: {
        errorMessage: "Email cannot be empty!",
      },
      trim: true,
      normalizeEmail: true,
    },
  
    password: {
      isString: {
        errorMessage: "Password must be a string!",
      },
      isLength: {
        options: { min: 8, max: 32 },
        errorMessage: "Password must be between 8 and 32 characters!",
      },
      matches: {
        options: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        errorMessage:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)!",
      },
      notEmpty: {
        errorMessage: "Password cannot be empty!",
      },
    },
  
    username: {
      optional: true, 
      isString: {
        errorMessage: "Username must be a string!",
      },
      isLength: {
        options: { min: 3, max: 20 },
        errorMessage: "Username must be between 3 and 20 characters!",
      },
      isAlphanumeric: {
        errorMessage: "Username can only contain letters and numbers!",
      },
      trim: true,
    },
  };
  
  module.exports = { createUserValidationSchema };
  