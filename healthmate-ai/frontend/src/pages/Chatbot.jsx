import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PremiumBackground from "../components/bg/DNAHelixBackground";

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  /* =======================
     LOAD CHAT HISTORY
  ======================= */
  useEffect(() => {
    const loadHistory = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/ai/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChat(res.data);
    };
    loadHistory();
  }, []);

  /* =======================
     AUTO SCROLL
  ======================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  /* =======================
     TYPING EFFECT
  ======================= */
  const typeText = async (text) => {
    let current = "";
    setIsTyping(true);

    for (let char of text) {
      current += char;
      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "bot",
          text: current,
        };
        return updated;
      });
      await new Promise((r) => setTimeout(r, 18));
    }

    setIsTyping(false);
  };

  /* =======================
     SEND MESSAGE
  ======================= */
  const sendMessage = async () => {
    if (!msg.trim()) return;

    const token = localStorage.getItem("token");

    setChat((prev) => [...prev, { sender: "user", text: msg }]);
    setMsg("");

    // placeholder bot bubble
    setChat((prev) => [...prev, { sender: "bot", text: "" }]);

    const res = await axios.post(
      "http://localhost:5000/api/ai/chat",
      { message: msg },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await typeText(res.data.reply);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "40px", position: "relative" }}>
      <PremiumBackground />

      <h1 style={{ color: "white", position: "relative" }}>AI Chatbot</h1>

      <div
        style={{
          width: "720px",
          height: "500px",
          overflowY: "auto",
          padding: "20px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
        }}
      >
        {chat.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background:
                c.sender === "user"
                  ? "rgba(52,133,255,0.8)"
                  : "rgba(255,255,255,0.35)",
              padding: "12px 16px",
              borderRadius: "14px",
              marginBottom: "12px",
              maxWidth: "70%",
              alignSelf: c.sender === "user" ? "flex-end" : "flex-start",
              color: "white",
            }}
          >
            {c.text}
            {isTyping && c.sender === "bot" && i === chat.length - 1 && (
              <span style={{ opacity: 0.6 }}>▍</span>
            )}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <input
          className="input"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
