const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const { validateRegisterData } = require("../utils/validation");
const bcrypt = require("bcrypt");
var validator = require("validator");
var jwt = require("jsonwebtoken");

//  Registration route
router.post("/register", async (req, res) => {
  try {
    validateRegisterData(req);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      // don't reveal whether the email or password is incorrect because don't tell the user that this email exists or not
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
