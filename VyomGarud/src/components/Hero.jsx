import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src="/videos/drone.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Cinematic Black Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"></div>

      {/* Tactical Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      {/* Animated Radar Scan */}
      <div className="absolute right-[20%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-accent/30 opacity-40 animate-scan"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-xl">
              Vyom<span className="text-accent">Garud</span>
            </h1>

            <p className="mt-5 text-xl text-gray-300 max-w-lg leading-relaxed">
              High-end Unmanned Aerial Systems designed for ISR, surveillance,
              and mission-critical operations. Engineered with precision,
              built for endurance, and trusted for real defense applications.
            </p>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-8 px-10 py-4 bg-accent text-black font-semibold text-lg rounded-lg shadow-lg shadow-accent/40 hover:shadow-accent/70 transition-all"
            >
              Request Mission Briefing
            </motion.a>
          </motion.div>

          {/* RIGHT SIDE DRONE VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center items-center group"
          >
            {/* Glow Background */}
            <div className="absolute w-[450px] h-[450px] rounded-full bg-accent/10 blur-3xl"></div>

            {/* Drone Image (Floating + Parallax) */}
            <motion.img
              src="/droneSvg.svg"
              alt="VyomGarud Drone"
              className="w-[420px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] select-none pointer-events-none"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.04,
                rotate: 1,
              }}
            />

            {/* Hover Circle Glow */}
            <div className="absolute w-[500px] h-[500px] rounded-full border border-accent/30 animate-pulse-slow"></div>
          </motion.div>



        </div>
      </div>

      {/* Radar Animation Keyframes */}
      <style>
        {`
  @keyframes pulseSlow {
    0% { opacity: 0.4; transform: scale(0.95); }
    50% { opacity: 0.9; transform: scale(1.05); }
    100% { opacity: 0.4; transform: scale(0.95); }
  }
  .animate-pulse-slow {
    animation: pulseSlow 6s ease-in-out infinite;
  }
`}
      </style>

    </section>
  );
}
