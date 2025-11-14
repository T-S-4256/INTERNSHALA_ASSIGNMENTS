import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[#0f1113] overflow-hidden"
    >
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Get in Touch
            </h2>

            <p className="mt-4 text-gray-300 text-lg max-w-md">
              Contact our engineering and mission-operations team to request a demo,
              discuss mission-specific requirements, or schedule a strategic briefing.
            </p>

            <div className="mt-6">
              <p className="text-lg text-gray-300">
                <span className="font-bold text-white">Email:</span>{" "}
                <a
                  href="mailto:intel@vyomgarud.com"
                  className="text-accent hover:underline"
                >
                  intel@vyomgarud.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE — Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-black/30 border border-white/10 backdrop-blur-lg 
                       p-8 rounded-xl shadow-2xl shadow-black/40 space-y-6"
          >
            {/* Soft Glow Border */}
            <div className="absolute inset-0 rounded-xl border border-accent/10 pointer-events-none"></div>

            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full bg-black/40 border border-gray-700 text-white rounded-md px-4 py-3
                           focus:border-accent outline-none transition duration-300 hover:border-accent/60"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-black/40 border border-gray-700 text-white rounded-md px-4 py-3
                           focus:border-accent outline-none transition duration-300 hover:border-accent/60"
              />
            </div>

            <div>
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message / Requirement"
                className="w-full bg-black/40 border border-gray-700 text-white rounded-md px-4 py-3
                           focus:border-accent outline-none transition duration-300 hover:border-accent/60"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="w-full py-3 bg-accent text-black font-bold rounded-md 
                         shadow-lg shadow-accent/40 hover:shadow-accent/60 transition-all"
            >
              Send Inquiry
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
