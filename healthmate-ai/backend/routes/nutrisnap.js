import express from "express";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const form = new FormData();
    form.append("image", req.files.image.data, req.files.image.name);

    const response = await axios.post(
      "http://localhost:8000/analyze",
      form,
      { headers: form.getHeaders() }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "NutriSnap failed" });
  }
});

export default router;
