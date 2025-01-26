require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");

const secret = "14adef4dsd4f4dd4dsfe7f7" // Environment variable for secret key

// Route 1: Register a new user
router.post(
  "/createuser",
  [
    body("name", "Name should have at least 3 characters").isLength({ min: 3 }),
    body("email", "Please provide a valid email").isEmail(),
    body("studentID", "Student ID must be at least 6 characters long").isLength({ min: 6 }),
    body("password", "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number")
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "i"), // Strong password regex
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, studentID } = req.body;

    try {
      // Check if user already exists by Student ID
      const existingUserWithStudentID = await User.findOne({ studentID });
      if (existingUserWithStudentID) {
        return res.status(400).json({ success: false, message: "Student ID already in use." });
      }

      // Check if user already exists by email
      const existingUserWithEmail = await User.findOne({ email });
      if (existingUserWithEmail) {
        return res.status(400).json({ success: false, message: "Email already registered." });
      }

      // Hash password
      const salt = await bcrypt.genSalt(12); // Salt rounds for bcrypt
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user in DB
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        studentID,
      });

      // Generate JWT token
      const data = { user: { id: newUser._id } };
      const token = jwt.sign(data, secret, { expiresIn: "1d" }); // Token expiration time set to 1 day

      return res.status(201).json({ success: true, message: "User registered successfully", token });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);

// Route 2: Login existing user
router.post(
  "/login",
  [
    body("email", "Please provide a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT token
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, secret, { expiresIn: "12h" }); // Token expiration time set to 12 hours

      return res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);

// Route 3: Get logged-in user details (using fetchuser middleware)
router.post(
  "/getuser",
  fetchuser, // Protected route; user must be authenticated via JWT
  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password"); // Do not include password in response
      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error("Error retrieving user details:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);

module.exports = router;
