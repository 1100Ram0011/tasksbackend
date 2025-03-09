import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js"; // Ensure correct path
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post('/login', login);
// User Registration Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate request body
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password (Ensure password is not undefined)
    const hashedPassword = bcrypt.hash(password);

    // Create new user
    user = new User({
      username:name,
      email,
      password: hashedPassword, // Store hashed password
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
