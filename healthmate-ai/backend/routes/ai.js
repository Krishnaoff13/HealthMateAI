import express from "express";
import Groq from "groq-sdk";
import jwt from "jsonwebtoken";
import Chat from "../models/chat.js";

const router = express.Router();

/* =======================
   AUTH MIDDLEWARE
======================= */
function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    return res.status(401).json({ msg: "Unauthorized" });
  }
}

/* =======================
   CHAT ROUTE
======================= */
router.post("/chat", auth, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    // save user message
    await Chat.create({
      user: req.user,
      sender: "user",
      text: message,
    });

    // create Groq client INSIDE request (stable)
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.9,
      messages: [
        {
          role: "system",
          content: `
You are HealthMate AI, a warm and empathetic health companion.
Speak like a caring human, not a robot.
Keep responses short, friendly, and reassuring.
Avoid medical diagnosis.
If appropriate, gently suggest consulting a doctor.
Use simple language.
          `,
        },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;

    // save bot reply
    await Chat.create({
      user: req.user,
      sender: "bot",
      text: reply,
    });

    res.json({ reply });
  } catch (err) {
    console.error("GROQ ERROR:", err);
    res.status(500).json({ reply: "AI error" });
  }
});

/* =======================
   LOAD CHAT HISTORY
======================= */
router.get("/history", auth, async (req, res) => {
  const chats = await Chat.find({ user: req.user }).sort("createdAt");
  res.json(chats);
});

export default router;
