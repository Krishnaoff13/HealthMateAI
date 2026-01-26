import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PremiumBackground from "../components/bg/AIHealthNetworkBackground";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid login");
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

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "380px",
          padding: "40px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(15px)",
          color: "white",
          textAlign: "center",
          zIndex: 10
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "20px", fontWeight: 700 }}>
          HealthMate AI
        </h2>

        <p style={{ opacity: 0.8, marginBottom: "30px", fontSize: "14px" }}>
          Your personalized AI-powered health companion
        </p>

        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="button"
          style={{ marginTop: "20px" }}
          onClick={loginUser}
        >
          Login
        </motion.button>

        <p
          style={{ marginTop: "20px", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? <b>Register</b>
        </p>
      </motion.div>
    </div>
  );
}
