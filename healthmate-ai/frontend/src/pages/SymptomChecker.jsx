import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const checkSymptoms = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai/symptoms", {
        symptoms: input,
      });
      setResult(res.data.result);
    } catch (err) {
      setResult("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />   {/* ✅ NAVBAR HERE */}

      <div style={{ padding: "40px" }}>
        <h1 style={{ color: "white" }}>Symptom Checker</h1>

        <div className="card" style={{ width: "600px", marginTop: "30px" }}>
          <textarea
            placeholder="Describe your symptoms..."
            style={{
              width: "100%",
              height: "120px",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              outline: "none",
              resize: "none",
            }}
            onChange={(e) => setInput(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="button"
            onClick={checkSymptoms}
          >
            Analyze
          </motion.button>

          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: "20px", color: "white" }}
            >
              <h3>AI Result:</h3>
              <p>{result}</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
