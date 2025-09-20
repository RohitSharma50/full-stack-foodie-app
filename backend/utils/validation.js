const validator = require("validator");

const validateRegisterData = (req) => {
  const { name, email, password } = req.body;
  if (!name || !validator.isLength(name, { min: 2, max: 10 })) {
    throw new Error("Name must be between 2 to 10 characters");
  }
  if (
    !validator.isEmail(email) ||
    !email.toLowerCase().endsWith("@gmail.com")
  ) {
    throw new Error("Invalid Email!");
  }

  if (!validator.isLength(password, { min: 3, max: 10 })) {
    throw new Error("Password must be between 3 and 10 characters!");
  }
};

module.exports = {
  validateRegisterData,
};
