/** @format */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).send({ message: "Registration Successful" });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).send({ message: "Registration Error" });
  }
});

module.exports = router;
