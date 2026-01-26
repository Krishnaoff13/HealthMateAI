import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PremiumBackground from "../components/bg/HealingWavesBackground";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    fitnessGoal: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      alert("Account created!");
      navigate("/");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      {/* BACKGROUND */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <PremiumBackground />
      </div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          width: "380px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          color: "white",
          zIndex: 10
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account
        </h2>

        {["name","email","password","age","height","weight","fitnessGoal"].map((field, i) => (
          <input
            key={i}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            type={field === "password" ? "password" : "text"}
            className="input"
            onChange={handleChange}
          />
        ))}

        <button className="button" onClick={registerUser}>Register</button>

        <p
          style={{ textAlign: "center", marginTop: "15px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </motion.div>
    </div>
  );
}
