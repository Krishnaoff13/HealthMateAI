import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔥 TEST ROUTE (use this to confirm the route works)
router.get("/test", (req, res) => {
  res.send("AUTH ROUTE IS WORKING");
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, height, weight, fitnessGoal } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      age,
      height,
      weight,
      fitnessGoal
    });

    res.json({ msg: "Registered Successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Error registering user", err });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({ msg: "Login Successful", token, user });
  } catch (err) {
    res.status(500).json({ msg: "Error logging in", err });
  }
});

export default router;
