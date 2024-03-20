/** @format */

const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is registered or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Email not registered" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Password" });
    }

    // Generate JWT with Secure Secret Key (replace with environment variable)
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).send({ message: "Login Successful", token }); // Remove secretKey from response
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ message: "Login Error" });
  }
});

module.exports = router;
