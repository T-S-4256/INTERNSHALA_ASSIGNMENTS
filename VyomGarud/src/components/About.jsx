import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-[#0f1113] overflow-hidden"
    >
      {/* Subtle Tactical Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      {/* Glowing Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6"
        >
          Our Mission: <span className="text-accent">Precision from Above</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
        >
          VyomGarud develops next-generation Unmanned Aerial Systems engineered
          for defense, security, and strategic intelligence operations.  
          Our platforms combine AI-driven autonomy, resilient airframe design,
          and multi-sensor fusion to deliver mission-critical awareness,
          operational superiority, and precise decision-making — anytime,
          anywhere.
        </motion.p>

        {/* Accent Underline */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 180, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="h-[3px] bg-accent mx-auto mt-8 rounded-full shadow-[0_0_25px_#ff7b0080]"
        ></motion.div>
      </div>
    </section>
  );
}
