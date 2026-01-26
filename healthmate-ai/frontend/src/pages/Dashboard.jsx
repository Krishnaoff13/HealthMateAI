import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Adithya";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const cards = [
    { title: "AI Chatbot", desc: "Talk to your AI health assistant", icon: "🤖", path: "/chat", glow: "rgba(0, 255, 255, 0.5)" },
    { title: "NutriSnap", desc: "Snap your meal & get nutrition instantly", icon: "🥗", path: "/nutrisnap", glow: "rgba(0, 255, 100, 0.5)" },
    { title: "Symptom Checker", desc: "Analyze symptoms & get guidance", icon: "🩺", path: "/symptoms", glow: "rgba(255, 0, 150, 0.5)" },
    { title: "My Fitness", desc: "Track workouts & health goals", icon: "💪", path: "/fitness", glow: "rgba(255, 150, 0, 0.5)" },
    { title: "Settings", desc: "Manage your preferences", icon: "⚙️", path: "/settings", glow: "rgba(150, 0, 255, 0.5)" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#000000", color: "white" }}>
      <Navbar />

      <div style={{ padding: "70px 50px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontSize: "3.8rem", fontWeight: 900, textShadow: "0 0 40px rgba(0, 255, 255, 0.6)" }}>
            {greeting}, <span style={{ color: "#00ffff", textShadow: "0 0 30px #00ffff" }}>{userName}</span> 👋
          </h1>
          <p style={{ opacity: 0.7, marginTop: "12px", fontSize: "1.15rem" }}>How can HealthMate AI assist you today?</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "40px", marginTop: "60px" }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, boxShadow: `0 0 60px ${card.glow}` }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              onClick={() => navigate(card.path)}
              style={{
                cursor: "pointer",
                padding: "40px",
                borderRadius: "24px",
                background: "rgba(20, 20, 20, 0.6)",
                backdropFilter: "blur(15px)",
                border: `2px solid ${card.glow}`,
                boxShadow: `0 0 30px ${card.glow}, inset 0 0 20px rgba(255,255,255,0.05)`,
              }}
            >
              <div style={{ fontSize: "2.8rem", marginBottom: "20px" }}>{card.icon}</div>
              <h2 style={{ fontSize: "1.6rem", marginBottom: "10px", fontWeight: 700, textShadow: `0 0 15px ${card.glow}` }}>{card.title}</h2>
              <p style={{ opacity: 0.65, fontSize: "0.92rem" }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
