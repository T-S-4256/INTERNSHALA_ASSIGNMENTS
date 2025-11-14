import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#0f1113] border-t border-white/10 py-10 mt-20 overflow-hidden">
      
      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>

      {/* Glowing Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Branding */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm"
          >
            © {new Date().getFullYear()} <span className="text-white font-semibold">VyomGarud</span>. All Rights Reserved.
          </motion.p>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            <a
              href="#"
              className="text-gray-400 hover:text-accent transition text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-accent transition text-sm"
            >
              Terms of Service
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex space-x-5"
          >
            <a
              href="#"
              className="text-gray-400 hover:text-accent transition text-xl"
            >
              <i className="ri-linkedin-fill"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-accent transition text-xl"
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-accent transition text-xl"
            >
              <i className="ri-global-line"></i>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
