import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import SymptomChecker from "./pages/SymptomChecker.jsx"; // optional
import NutriSnap from "./pages/NutriSnap.jsx"; // ✅ NEW

function AnimatedRoutes() {
  const location = useLocation();

  const PageWrapper = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: "100vh" }}
    >
      {children}
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/register" element={<PageWrapper><Register /></PageWrapper>} />
        <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/chat" element={<PageWrapper><Chatbot /></PageWrapper>} />

        {/* ✅ NUTRISNAP ROUTE */}
        <Route path="/nutrisnap" element={<PageWrapper><NutriSnap /></PageWrapper>} />

        {/* Optional / future */}
        <Route path="/symptoms" element={<PageWrapper><SymptomChecker /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
