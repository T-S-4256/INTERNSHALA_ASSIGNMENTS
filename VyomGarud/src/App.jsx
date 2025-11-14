import React from "react";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Capabilities from "./components/Capabilities.jsx";
import Highlights from "./components/Highlights.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    // We add the subtle grid pattern to the whole page container
    <div className="overflow-x-hidden bg-grid-pattern bg-grid-size">

      {/* Navigation (Simple version for a landing page) */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold font-heading text-white">
                Vyom<span className="text-accent">Garud</span>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">

                <a
                  href="#about"
                  className="relative text-gray-300 px-3 py-2 text-sm font-medium group hover:scale-110"
                >
                  About
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#ff7b00] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a
                  href="#capabilities"
                  className="relative text-gray-300 px-3 py-2 text-sm font-medium group hover:scale-110"
                >
                  Capabilities
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#ff7b00] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a
                  href="#highlights"
                  className="relative text-gray-300 px-3 py-2 text-sm font-medium group hover:scale-110"
                >
                  Highlights
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#ff7b00] transition-all duration-300 group-hover:w-full"></span>
                </a>

                <a
                  href="#contact"
                  className="relative text-gray-300 px-3 py-2 text-sm font-medium group hover:scale-110"
                >
                  Contact
                  <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-[#ff7b00] transition-all duration-300 group-hover:w-full"></span>
                </a>

              </div>
            </div>


          </div>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Highlights />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}