import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware: verify token
function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}

// GET USER PROFILE
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

// UPDATE USER PROFILE
router.put("/update", auth, async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.user,
    req.body,
    { new: true }
  ).select("-password");

  res.json(updated);
});

export default router;
