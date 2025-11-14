import React from "react";
import { motion } from "framer-motion";

const capabilities = [
  {
    tag: "Autonomy",
    title: "AI-Driven Flight Core",
    description:
      "Real-time kinematic positioning and onboard ML models enable fully autonomous navigation in GPS-denied and high-interference zones.",
  },
  {
    tag: "Payloads",
    title: "Modular Sensor Systems",
    description:
      "Integrate EO/IR gimbals, LiDAR, SIGINT, RADAR pods, and precision-mapping sensors with universal quick-mount architecture.",
  },
  {
    tag: "Endurance",
    title: "Hybrid-Electric VTOL",
    description:
      "Vertical launch with fixed-wing endurance. Hybrid propulsion drastically extends mission time and operational radius.",
  },
  {
    tag: "Security",
    title: "Encrypted Command Link",
    description:
      "AES-256 encrypted telemetry and anti-jamming FHSS radio links ensure uncompromised mission security in hostile environments.",
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative py-24 md:py-32 bg-[#0f1113] overflow-hidden"
    >
      {/* Subtle Tactical Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Core Capabilities
          </h2>
          <p className="mt-3 text-gray-400 text-lg">
            Technologies engineered for mission-critical superiority.
          </p>
        </div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative group p-6 rounded-xl bg-black/30 border border-white/10 backdrop-blur-md
                        hover:border-accent/50 hover:shadow-[0_0_25px_#ff7b0050] transition-all duration-500"
            >
              {/* Accent Tag */}
              <span className="text-xs font-bold text-accent uppercase tracking-wide">
                {cap.tag}
              </span>

              {/* Title */}
              <h3 className="mt-3 text-2xl font-bold text-white group-hover:text-accent transition">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                {cap.description}
              </p>

              {/* Neon Accent Border Glow */}
              <div className="absolute inset-0 rounded-xl border border-accent/0 group-hover:border-accent/30 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
