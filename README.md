ortfolio - Among Us Edition

## Project Overview
This is a Vite + React portfolio website themed around **Among Us** with space/crew mate aesthetics, pixel art styling, and interactive "Emergency Meeting" elements.

## Key Features Implemented
### 🚀 **Core Theme & Visuals**
- **Space Background** (`src/components/SpaceBackground.jsx`): Animated starfield with floating particles
- **VCR Overlay** (`src/components/VCROverlay.jsx`): Retro scanline/VCR distortion effects
- **Pixel Typography**: Custom CSS for `Press Start 2P` font and pixelated styling
- **Among Us Color Palette**: Crewmate colors (#FF5733, #646cff, #FFEA83, etc.)

### 🎮 **Navigation & UI**
- **Custom Navbar** (`src/components/Navbar.jsx`): Pixelated navigation hub
- **Intro Sequence** (`src/components/IntroSequence.jsx`): Animated loading/intro with crewmate theme
- **Global Report Button**: Fixed "REPORT" button linking to contact page

### 📱 **Modals & Pages** (Lazy-loaded)
```
├── AboutModal.jsx
├── AchievementsModal.jsx  
├── AdminLoginModal.jsx
├── ContactModal.jsx
├── ExperienceModal.jsx
├── ProjectsModal.jsx
├── SkillsModal.jsx
```
- **Emergency Meeting Contact**: Pixelated form styled as incident report
- **Pixel Loaders**: `LOADING DATA...` spinners throughout

### 🛠 **Technical Stack**
```
Frontend: React 18 + Vite + Framer Motion + React Router
Styling: Tailwind CSS + Custom CSS Modules
Database: Supabase (src/lib/supabase.js)
State: PortfolioContext (src/context/PortfolioContext.jsx)
Deployment: Ready for Vercel/Netlify
```

### 🎨 **Assets**
```
public/
├── vite.png (replaced vite.svg favicon)
├── profile.jpg
├── black.png / white.png (themed backgrounds)
├── nersme2k26.pdf (resume?)
└── unname2d - Copy.jpg
```

### 📄 **Routing Structure**
```
Home: NavigationHub (Overview)
├── /experience
├── /skills  
├── /projects
├── /achievements
└── /contact (Emergency Meeting)
```

## Among Us Theme Elements Removed/Updated
- **vite.svg** → Replaced with **vite.png** favicon (`index.html`)
- Continuous auto-reloads fixed by correct asset paths
- Removed unused Vite template styles (`.logo` remains as base)

## Setup & Run
```bash
cd portfolio
npm install
npm run dev
```

**Live Demo**: http://localhost:5173/

## File Structure
```
portfolio/
├── public/ (vite.png, profile.jpg, white.png...)
├── src/
│   ├── components/ (SpaceBackground, VCROverlay, Modals...)
│   ├── pages/ (Experience, Skills, Projects...)
│   ├── context/ (PortfolioContext)
│   └── lib/ (supabase.js)
├── index.html (vite.png favicon)
├── vite.config.js
├── package.json
└── README.md
```

---

**BlackBOXAI Changes**:
1. Deleted `public/vite.svg` 
2. Updated `index.html` favicon to `vite.png`
3. Created this comprehensive README.md
4. Fixed asset warnings (use `/white.png` not `/public/white.png`)

**Site is now running with Among Us theme intact!** 🚀👨‍🚀

