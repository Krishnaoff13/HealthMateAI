import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import aiRoutes from "./routes/ai.js";
import nutriRoutes from "./routes/nutrisnap.js";




dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/nutrisnap", nutriRoutes);   



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("HealthMate AI Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
