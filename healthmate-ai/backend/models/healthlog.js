import mongoose from "mongoose";

const healthLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    symptoms: { type: String, required: true },
    aiResult: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("HealthLog", healthLogSchema);
