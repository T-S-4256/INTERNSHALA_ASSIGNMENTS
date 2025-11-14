import React from "react";
import { motion } from "framer-motion";

const highlights = [
  {
    title: "Swarm Logic",
    description:
      "Cooperative autonomy for multi-drone operations, synchronized and supervised by a single operator.",
  },
  {
    title: "On-Device AI",
    description:
      "Real-time detection, tracking, and classification powered by edge computing — no cloud required.",
  },
  {
    title: "Hardened Airframe",
    description:
      "IP67-rated composite chassis engineered for extreme temperatures, impacts, and all-weather missions.",
  },
];

export default function Highlights() {
  return (
    <section
      id="highlights"
      className="relative py-24 md:py-32 bg-[#0f1113] overflow-hidden"
    >
      {/* Tactical HUD/Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      {/* Radar Scan Circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-accent/20 animate-pulse-slow"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Technology Highlights
          </h2>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative p-7 bg-black/30 backdrop-blur-md rounded-xl 
                         border border-white/10 shadow-xl shadow-black/50
                         hover:border-accent/40 hover:shadow-[0_0_25px_#ff7b0030]
                         transition-all duration-500"
            >
              {/* Neon Left Border */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent/70 rounded-l-lg"></div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pulse Animation */}
      <style>
        {`
        @keyframes pulseSlow {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        `}
      </style>
    </section>
  );
}
