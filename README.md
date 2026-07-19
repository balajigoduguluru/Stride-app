<div align="center">

# ⚡ Stride — AI Operations Co-Pilot for Small Businesses

[![Build Status](https://img.shields.io/badge/CI-Passing-0F9D58?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/balajigoduguluru/Stride-app/actions)
[![React 19](https://img.shields.io/badge/React-19.0-0B57D0?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)](#license)

**Stride** is an enterprise-grade AI Operations Co-Pilot for small businesses (SMBs). Built strictly under Google Material Design 3 (M3) standards, Stride transforms incoming customer messaging streams into actionable, 4-lane operational task cards with inline 1-tap task execution and automated financial revenue tracking.

---

</div>

## 📌 About Stride

### The Problem
Small business operators (AC repair, plumbing, electrical, home services, clinics) spend hours manually managing customer WhatsApp and live chat streams while trying to run field operations. Incoming inquiries, booking requests, and urgent support complaints get buried in unstructured chat threads, leading to lost revenue, delayed response times, and missed appointment slots.

### The Stride Solution
**Stride** acts as an autonomous, ambient AI co-pilot for SMB owners. Operating on a **Three-Pane Adaptive Layout Scaffold** with a **380px context-aware right-side sheet**, Stride continuously ingests unstructured customer chat messages, classifies operational intents (`SUPPORT`, `BOOKING`, `LEAD`, `GENERAL`), extracts critical entities (location, time slot, urgency level), estimates financial transaction value (`₹2,500` for AC repair, `₹1,800` for plumbing), and creates actionable cards across 4 pipeline lanes—allowing busy operators to execute decisions in 1 tap without view thrashes or modal overlays.

---

## 💡 Core Value Proposition

- ⚡ **Zero-Modal Workflow**: Replaces intrusive full-screen popups with responsive, co-planar 380px sliding sheets for Analytics, Knowledge Base, and Card Inspection.
- 🎯 **1-Tap Actionable Task Execution**: Cards embed filled M3 pill buttons (`Confirm Slot`, `Complete Visit`, `Dispatch Supervisor`, `Mark Resolved`) allowing instant operational lane transitions.
- 💰 **Revenue in Pipeline Aggregation**: AI engine automatically estimates service value based on natural language keywords and aggregates real-time revenue across pipeline lanes.
- 💬 **Live Chat & Gemini Drafting Aura**: Integrated 2-panel live messenger stream with asymmetric chat bubbles and shifting `.bg-ai-aura` auto-reply draft recommendations.
- 🎨 **Material 3 'Less is More' Aesthetics**: Minimalist visual geometry with soft surface fills (`#F8F9FA`), zero high-contrast border grids, and 25% expanded whitespace layout.

---

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
