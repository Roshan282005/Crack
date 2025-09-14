/*
Smart Traffic Management System - Single-file React app
- Uses Tailwind CSS for styling (assumes Tailwind already set up)
- Uses recharts for charts (install `recharts`)
- Placeholder map section (replace with react-leaflet or Mapbox if needed)

To run:
1. Create a React app (Vite/CRA). Example with Vite:
   npm create vite@latest smart-traffic --template react
   cd smart-traffic
2. Install deps:
   npm install recharts
3. Setup Tailwind per its docs.
4. Replace src/App.jsx with this file and start: `npm run dev`.

Notes:
- Replace placeholder data and API endpoints with real telemetry/traffic data.
- Map markers, camera feeds, and realtime updates would come from a backend/ws.
*/

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Mock data for charts
  const congestionData = [
    { time: "06:00", value: 22 },
    { time: "08:00", value: 65 },
    { time: "10:00", value: 45 },
    { time: "12:00", value: 35 },
    { time: "14:00", value: 40 },
    { time: "16:00", value: 78 },
    { time: "18:00", value: 92 },
    { time: "20:00", value: 55 },
  ];

  const features = [
    {
      title: "Real-time Traffic Monitoring",
      desc: "Live feeds, sensor telemetry, and vehicle counts aggregated into one dashboard.",
    },
    {
      title: "Adaptive Signal Control",
      desc: "Dynamically change traffic light timing using AI to reduce wait times.",
    },
    {
      title: "Incident Detection & Alerts",
      desc: "Automated incident detection with push notifications to authorities and commuters.",
    },
    {
      title: "Route Recommendation",
      desc: "Suggest least-congested routes to drivers and public transport in real-time.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold">
              ST
            </div>
            <div>
              <h1 className="text-lg font-semibold">Smart Traffic</h1>
              <p className="text-xs text-gray-500">
                Urban Congestion Management
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:text-indigo-600">Home</a>
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#dashboard" className="hover:text-indigo-600">Dashboard</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>

          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="md:hidden bg-indigo-600 text-white px-3 py-2 rounded-lg"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="#dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Hero Section */}
        <section id="home" className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Smart Traffic Management
              <br />
              for Urban Congestion
            </h2>

            <p className="mt-4 text-gray-600">
              Reduce commute time, lower emissions, and keep your city moving.
              Adaptive signals, real-time insights, and intelligent route
              guidance — all in one platform.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#dashboard"
                className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg shadow"
              >
                View Dashboard
              </a>
              <a
                href="#contact"
                className="inline-block border border-indigo-600 text-indigo-600 px-5 py-3 rounded-lg"
              >
                Request Demo
              </a>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="font-semibold">Avg. Reduction</div>
                <div className="text-2xl">21%</div>
                <div className="text-xs text-gray-400">In commute time (pilot)</div>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <div className="font-semibold">Areas Covered</div>
                <div className="text-2xl">12</div>
                <div className="text-xs text-gray-400">Urban districts</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold">Live Congestion · Today</h3>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={congestionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold">Map Overview</h3>
              <div className="mt-3 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                Map placeholder — integrate react-leaflet or Mapbox here
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="mt-12">
          <h3 className="text-2xl font-bold">Key Features</h3>
          <p className="text-gray-600 mt-2">What makes the system effective</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white p-4 rounded-lg shadow hover:-translate-y-1 transition"
              >
                <h4 className="font-semibold">{f.title}</h4>
                <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="mt-12">
          <h3 className="text-2xl font-bold">Dashboard Preview</h3>
          <p className="text-gray-600 mt-2">
            A single-pane operational view for traffic operators
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <div className="col-span-2 bg-white rounded-lg p-4 shadow">
              <h4 className="font-semibold">Traffic Camera Feeds</h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="h-36 bg-black rounded flex items-center justify-center text-white text-sm">Camera 1</div>
                <div className="h-36 bg-black rounded flex items-center justify-center text-white text-sm">Camera 2</div>
                <div className="h-36 bg-black rounded flex items-center justify-center text-white text-sm">Camera 3</div>
                <div className="h-36 bg-black rounded flex items-center justify-center text-white text-sm">Camera 4</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow">
              <h4 className="font-semibold">Incidents</h4>
              <ul className="mt-3 text-sm text-gray-700 space-y-2">
                <li className="p-2 bg-gray-50 rounded">12:22 — Minor congestion at 5th Ave</li>
                <li className="p-2 bg-gray-50 rounded">11:10 — Accident cleared on Ring Road</li>
                <li className="p-2 bg-gray-50 rounded">09:05 — Signal outage at Jayanagar</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg p-4 shadow">
            <h4 className="font-semibold">Performance Metrics</h4>
            <div className="mt-3 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">78%</div>
                <div className="text-xs text-gray-500">Signal Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold">21%</div>
                <div className="text-xs text-gray-500">Avg. Commute Reduction</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4m</div>
                <div className="text-xs text-gray-500">Avg. Delay (peak)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-12 mb-20">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Request a Demo</h3>
              <p className="mt-2 text-sm text-gray-600">
                Tell us about your city or pilot area and we'll schedule a demo.
              </p>

              <form className="mt-4 space-y-3">
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="City / Organization"
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  placeholder="Contact Email"
                />
                <textarea
                  className="w-full border rounded px-3 py-2"
                  placeholder="Notes (optional)"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                  >
                    Submit
                  </button>
                  <button type="button" className="px-4 py-2 border rounded">
                    Schedule Call
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Contact</h3>
              <p className="mt-2 text-sm text-gray-600">
                city-ops@smarttraffic.example · +91 90000 00000
              </p>

              <div className="mt-4 text-sm text-gray-700">
                <div className="font-semibold">Deployment Options</div>
                <ul className="mt-2 list-disc ml-5 text-gray-600">
                  <li>On-premise traffic operations center</li>
                  <li>Cloud-hosted SaaS for fast rollout</li>
                  <li>Hybrid with local edge processing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Smart Traffic · Built with ♥
          </div>
          <div className="text-sm text-gray-600">
            Privacy · Terms · Security
          </div>
        </div>
      </footer>
    </div>
  );
}
