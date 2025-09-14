// src/App.jsx
import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ---------------- Memoized Components ----------------
const MobileMenu = memo(({ menuOpen, setMenuOpen }) => {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="md:hidden border-t bg-gray-50 dark:bg-gray-800 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
            {[
              "home",
              "definition",
              "technology",
              "benefits",
              "features",
              "dashboard",
              "alerts",
              "contact",
            ].map((section, idx) => (
              <motion.a
                key={section}
                href={`#${section}`}
                onClick={() => setMenuOpen(false)}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const CongestionChart = memo(({ data }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#6366f1"
        strokeWidth={3}
        dot={{ r: 5 }}
        activeDot={{ r: 7 }}
        isAnimationActive={true}
        animationDuration={800}
      />
    </LineChart>
  </ResponsiveContainer>
));

// ---------------- Main App ----------------
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [congestionData, setCongestionData] = useState([
    { time: "06:00", value: 22 },
    { time: "08:00", value: 65 },
    { time: "10:00", value: 45 },
    { time: "12:00", value: 35 },
    { time: "14:00", value: 40 },
    { time: "16:00", value: 78 },
    { time: "18:00", value: 92 },
    { time: "20:00", value: 55 },
  ]);
  const [formSent, setFormSent] = useState(false);

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  // Inside App component
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);

    // Inside App component, before return
    const handleFormSubmit = (e) => {
      e.preventDefault();
      setFormSent(true);

      // Get button position for confetti origin
      const button = e.currentTarget.querySelector("button");
      const rect = button.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { x, y },
        colors: ["#6366f1", "#3b82f6", "#06b6d4", "#f43f5e"],
        scalar: 1.2,
        drift: 0.3,
      });

      setTimeout(() => setFormSent(false), 3000);
    };


    // Confetti burst (works on desktop & mobile)
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#3b82f6", "#06b6d4", "#f43f5e"],
    });

    setTimeout(() => setFormSent(false), 3000);
  };

  // Smooth scroll
  useEffect(() => {
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .querySelector(link.getAttribute("href"))
          ?.scrollIntoView({ behavior: "smooth" });
      })
    );
  }, []);

  // Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView([13.0827, 80.2707], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    const alerts = [
      { lat: 13.05, lng: 80.25, msg: "🚨 Accident on NH12" },
      { lat: 13.1, lng: 80.28, msg: "🚦 Heavy Congestion Downtown" },
    ];

    alerts.forEach((a) =>
      L.marker([a.lat, a.lng]).addTo(mapRef.current).bindPopup(a.msg)
    );

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Real-time congestion updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCongestionData((prev) =>
        prev.map((d, i) =>
          i === prev.length - 1
            ? { ...d, value: Math.floor(Math.random() * 100) }
            : d
        )
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-slate-800 dark:text-gray-100 font-sans">
        {/* Header */}
        <header className="bg-white dark:bg-gray-950 shadow sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                ST
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-wide">Smart Traffic</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Urban Congestion Management
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {[
                "home",
                "definition",
                "technology",
                "benefits",
                "features",
                "dashboard",
                "alerts",
                "contact",
              ].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.a>
              ))}
            </nav>

            <div className="flex gap-3">
              <motion.button
                onClick={() => setDark(!dark)}
                className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-700"
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  animate={{ rotate: dark ? 180 : 0, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {dark ? "☀️" : "🌙"}
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden bg-indigo-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
                whileTap={{ scale: 0.95 }}
              >
                Menu
              </motion.button>
            </div>
          </div>

          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-6 py-10 space-y-20">
          {/* Hero */}
          <section id="home" className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-extrabold leading-tight text-indigo-700 dark:text-indigo-400"
              >
                Smart Traffic Management <br /> for Urban Congestion
              </motion.h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Reduce commute time, lower emissions, and keep your city moving.
                Adaptive signals, real-time insights, and intelligent route guidance — all in one platform.
              </p>
              <div className="mt-6 flex gap-3">
                <motion.a
                  href="#dashboard"
                  className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Dashboard
                </motion.a>
                <motion.a
                  href="#contact"
                  className="inline-block border border-indigo-600 text-indigo-600 px-5 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Request Demo
                </motion.a>
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                whileHover={{ y: -4 }}
              >
                <h3 className="font-semibold">Live Congestion · Today</h3>
                <div style={{ width: "100%", height: 260 }}>
                  <CongestionChart data={congestionData} />
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                whileHover={{ y: -4 }}
              >
                <h3 className="font-semibold">Map Overview</h3>
                <div ref={mapContainerRef} className="mt-3 h-48 rounded-xl" />
              </motion.div>
            </div>
          </section>

          {/* Definition Section */}
          <section id="definition" className="space-y-6">
            <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
              What is a Smart Traffic Management System?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              A Smart Traffic Management System (STMS) integrates IoT sensors, cameras, and AI-driven analytics to reduce congestion and improve safety. By monitoring road conditions in real-time, it enables proactive traffic control for smoother journeys.
            </p>
          </section>

          {/* Alerts Section */}
          <section id="alerts" className="space-y-6">
            <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
              Traffic Alerts
            </h3>
            {[
              { title: "Accident on Highway 12", desc: "Expect 25 min delay due to lane closure." },
              { title: "Heavy Congestion Downtown", desc: "Alternate routes recommended via East Rd." },
            ].map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-red-50 dark:bg-red-900/40 border-l-4 border-red-500 p-4 rounded-md shadow hover:shadow-lg transition-all duration-300"
              >
                <h4 className="font-semibold text-red-600 dark:text-red-400">{alert.title}</h4>
                <p className="text-sm">{alert.desc}</p>
              </motion.div>
            ))}
          </section>


          {/* Contact Section */}
          <section id="contact" className="space-y-6">
            <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Contact Us</h3>

            <motion.form
              onSubmit={handleFormSubmit}
              className="grid gap-4 max-w-lg p-6 rounded-xl shadow-lg bg-white dark:bg-gray-900"
            >
              <div className="input-group relative">
                <input type="text" placeholder=" " required className="peer" />
                <label className="absolute left-3 top-2 text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 transition-all">Your Name</label>
              </div>

              <div className="input-group relative">
                <input type="email" placeholder=" " required className="peer" />
                <label className="absolute left-3 top-2 text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 transition-all">Your Email</label>
              </div>

              <div className="input-group relative">
                <textarea placeholder=" " rows="4" required className="peer" />
                <label className="absolute left-3 top-2 text-gray-400 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 transition-all">Message</label>
              </div>

              <motion.button
                type="submit"
                className="btn-gradient relative overflow-hidden w-full text-lg font-semibold rounded-lg py-3 shadow-lg hover:scale-105 transition-transform duration-300"
                whileTap={{ scale: 0.95 }}
              >
                {formSent ? (
                  <span className="flex items-center justify-center gap-2">✅ Sent!</span>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </motion.form>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-950 py-6 mt-16 border-t dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600 dark:text-gray-400">

            {/* Fade-in copyright */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center md:text-left"
            >
              © 2025 Smart Traffic. All rights reserved.
            </motion.p>

            {/* Social links with hover scale + bounce */}
            <div className="flex gap-4 mt-2 md:mt-0">
              {[
                
              ].map((social, idx) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg font-medium transition-colors"
                  whileHover={{
                    scale: 1.2,
                    y: -3,
                    textShadow: "0px 0px 8px rgba(0,0,0,0.3)",
                    color: social.color,
                  }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 120 }}
                >
                  {social.name}
                </motion.a>
                
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
