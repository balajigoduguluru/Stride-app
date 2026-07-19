<div align="center">

# ⚡ Stride — AI Operations Co-Pilot for Small Businesses

[![Build Status](https://img.shields.io/badge/CI-Passing-0F9D58?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/balajigoduguluru/Stride-app/actions)
[![React 19](https://img.shields.io/badge/React-19.0-0B57D0?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](#license)

**Stride** is a modern, high-performance AI Operations Co-Pilot engineered under Google Material Design 3 (M3) standards to help SMB operators automate incoming customer chat streams into actionable 4-lane operational task cards.

---

</div>

## 🌟 Key Features

- **Three-Pane Adaptive Layout Scaffold**: Collapsible left command rail (256px ↔ 64px), central operations canvas, and co-planar 380px right-side drawer panel.
- **Client-side Gemini AI Aura Engine**: Real-time intent classification (`SUPPORT`, `BOOKING`, `LEAD`, `GENERAL`), location extraction, and financial revenue estimation (`₹2,500` for AC repair, `₹1,800` for plumbing).
- **Material Design 3 'Less is More' Aesthetics**: Minimalist task cards displaying customer details & 1-tap inline action buttons without visual clutter.
- **Continuous 2-Panel Live Chat Workspace**: Customer index list (300px) paired with asymmetric chat bubbles and inline AI draft auto-reply approval pills.
- **SLA & Analytics Drawer Sheet**: Real-time pipeline metric calculations, plain text SLA summaries, and dynamic FAQ auto-reply configuration.

---

## 🏗️ Enterprise Repository Architecture

```
flowassist-smb/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI Workflow Matrix (Node 18 & 20)
├── src/
│   ├── components/                # Feature Workspace Views
│   │   ├── CustomerChatWidget.jsx # Continuous 2-Panel Messenger Stream
│   │   ├── Navbar.jsx             # Top App Bar with Gemini Ambient Ticker
│   │   ├── NavigationRail.jsx     # Collapsible Navigation Rail (256px ↔ 64px)
│   │   ├── OwnerDashboard.jsx     # 4-Lane Operations Board
│   │   └── RightDrawerPanel.jsx   # 380px Co-Planar Utility Sheet
│   ├── context/
│   │   └── AppContext.jsx         # Centralized React Context & LocalStorage Engine
│   ├── services/
│   │   ├── ai/
│   │   │   ├── classifiers.js     # System Intent & Service Category Regex Taxonomy
│   │   │   ├── engine.js          # Enterprise Client-Side NLP Pipeline
│   │   │   └── engine.test.js     # Vitest Automated Test Suite
│   │   ├── aiEngine.js            # Legacy Entry Wrapper
│   │   └── initialData.js         # Seed Cards, Chats & Scenarios
│   ├── shared/ui/
│   │   ├── Badge.jsx              # M3 Pill Badge Component
│   │   ├── Button.jsx             # M3 Surface Button Component
│   │   ├── CardItem.jsx           # Ultra-Minimal Task Card Layer
│   │   └── LaneColumn.jsx         # 320px Minimum Bounding Column
│   ├── App.jsx                    # Parent Layout Scaffold Frame
│   ├── index.css                  # M3 Functional Color Tokens & 8dp Grid
│   └── main.jsx                   # React 19 Root Mount Script
├── index.html                     # Plus Jakarta Sans & Google Sans Stack
├── vite.config.js                 # Vite 8 + Vitest JSDOM Configuration
└── package.json                   # Project Dependencies & Scripts
```

---

## 🎨 Tech Stack & Design Tokens

| Layer | Technology / Standard | Description |
|---|---|---|
| **Core Framework** | React 19 + Vite 8 | Ultra-fast client build & concurrent rendering |
| **Styling** | Tailwind CSS v4 | `@theme` system with custom M3 design tokens |
| **Design System** | Material Design 3 (M3) | `#F8F9FA` surface canvas, `#FFFFFF` container fills |
| **Icons** | Lucide React | Modern, lightweight icon vector library |
| **Testing** | Vitest + JSDOM | Unit testing suite with 100% assertions |

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/balajigoduguluru/Stride-app.git
cd Stride-app
npm install
```

### 3. Run Development Server
Start the Vite development server locally:
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 4. Run Automated Tests
Execute the Vitest unit test suite:
```bash
npx vitest run
```

### 5. Build for Production
Compile the production bundle into `dist/`:
```bash
npm run build
```

---

## 🤝 Contribution Guidelines

We welcome contributions to **Stride**! Please follow these standards:
1. **Branch Naming**: Use `feat/feature-name` or `fix/bug-description`.
2. **Testing**: Run `npx vitest run` and `npm run build` locally before opening a Pull Request.
3. **Commit Messages**: Follow Conventional Commits format (`feat: ...`, `fix: ...`, `docs: ...`).

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.
