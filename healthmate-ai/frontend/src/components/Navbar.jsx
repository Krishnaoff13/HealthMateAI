import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backdropFilter: "blur(8px)",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "12px",
        padding: "15px 25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 10,
        zIndex: 50,
        color: "white",
      }}
    >
      <h2 style={{ fontWeight: "600", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        HealthMate AI
      </h2>

      <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <NavLink to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </NavLink>
        <NavLink to="/symptoms" style={{ color: "white", textDecoration: "none" }}>
          Symptoms
        </NavLink>
        <NavLink to="/chat" style={{ color: "white", textDecoration: "none" }}>
          Chatbot
        </NavLink>

        <button
          onClick={logout}
          style={{
            background: "#ff5e5e",
            border: "none",
            padding: "8px 15px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
}
