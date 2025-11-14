# 🚀 VyomGarud – UAV Systems Landing Page  
Modern, cinematic, defense-grade landing page built for **VyomGarud**, a UAV (Unmanned Aerial Vehicle) / drone-systems company.  
Designed with a **military-futuristic aesthetic**, showcasing AI-powered autonomy, surveillance capabilities, and mission-critical engineering.

---

## ✨ Features

### 🎥 **Cinematic Hero Section**
- Background drone video  
- Tactical grid overlay  
- Radar-scan animation  
- Floating drone render  
- Hover + parallax animation  
- Spinning propellers (SVG animated)

### 🛰 **Professional Sections**
- **About** — mission statement with tactical glow lines  
- **Capabilities** — glass UI cards + neon accents  
- **Technology Highlights** — radar pulse + reinforced layout  
- **Contact** — glass morph form + accent glow  
- **Footer** — minimal, defense-style with soft grid background  

### 🎨 **Military-Futuristic UI / UX**
- Charcoal + black palette  
- Accent orange `#ff7b00`  
- Tactical grid textures  
- Glassmorphism cards  
- Neon border glows  
- Framer Motion animations  
- Highly responsive layout  

---

## 🛠 Tech Stack

| Library/Tool | Purpose |
|-------------|---------|
| **React** | Component-based UI |
| **Vite** | Fast build tool |
| **Tailwind CSS** | Styling system |
| **Framer Motion** | Animations & transitions |
| **SVG Animation** | Spinning propellers + hover effects |
| **Remix Icons (optional)** | Footer icons |

---

## 📦 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/<your-username>/vyomgarud-landing.git
cd vyomgarud-landing

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Start Development Server
npm run dev


The site will open at:

## 👉 http://localhost:5173/

## 📁 Folder Structure
vyomgarud-landing/
│
├── public/
│   ├── videos/
│   │   └── drone.mp4
│   ├── droneSvg.svg
│   └── grid.svg
│
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Capabilities.jsx
│   │   ├── Highlights.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md

## 🎨 Design System Notes
Color Palette
Purpose	Color
Background	#0f1113 (charcoal black)
Text	#ffffff, #d1d5db
Accent	#ff7b00 (primary brand orange)
Cards	Transparent black (bg-black/30)