"use client";

import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function SocialButton({ name, url, color, delay = 0 }) {
  const handleClick = (e) => {
    e.preventDefault();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { x, y },
      colors: ["#6366f1", "#3b82f6", "#06b6d4", "#f43f5e"],
    });

    window.open(url, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-700 shadow hover:shadow-lg transition-colors"
      whileHover={{
        scale: 1.25,
        y: -5,
        textShadow: `0px 0px 10px rgba(0,0,0,0.4)`,
        color: color,
        boxShadow: `0 0 15px ${color}`,
      }}
      whileTap={{ scale: 0.95, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 120 }}
    >
      {name}
    </motion.button>
  );
}
