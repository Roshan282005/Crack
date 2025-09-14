import { useState } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import confetti from "canvas-confetti";

const buttons = [
  { icon: <FaTwitter />, link: "https://twitter.com/yourhandle", color: "#1DA1F2" },
  { icon: <FaGithub />, link: "https://github.com/yourhandle", color: "#333" },
  { icon: <FaLinkedin />, link: "https://linkedin.com/in/yourhandle", color: "#0077B5" },
];

export default function AnimatedSocialButtons() {
  const handleClick = (link) => {
    // Confetti effect
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
    });
    // Open link in new tab
    window.open(link, "_blank");
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      {buttons.map((btn, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.2, boxShadow: `0 0 20px ${btn.color}` }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleClick(btn.link)}
          className="flex items-center gap-3 px-4 py-2 rounded-2xl font-semibold text-white"
          style={{ backgroundColor: btn.color, transition: "all 0.3s ease" }}
        >
          {btn.icon}
          <span>{btn.link.split("https://")[1]}</span>
        </motion.button>
      ))}
    </div>
  );
}