# Smooth.ai Developer Documentation

Welcome to the **Smooth.ai** repository! This document contains all the crucial information developers need to know to understand, run, and modify this project.

## 🏗️ Project Architecture & Tech Stack

Smooth.ai is a modern, responsive web application designed as an AI-powered reply generator ("Smooth Assistant").

- **Frontend Framework**: React 19
- **Build Tool / Bundler**: Vite
- **Styling**: Vanilla CSS (`App.css`, `index.css`) with custom CSS variables, dark-mode styling, glassmorphism, and keyframe animations.
- **Backend / API**: Vercel Serverless Functions (`/api` directory)
- **AI Integration**: Groq API (using the `llama-3.3-70b-versatile` model) configured to return JSON responses.

### Directory Structure

```text
d:\Rizzbot\
├── api/                # Vercel Serverless API routes
│   └── generate.js     # Main endpoint for handling AI generation via Groq
├── public/             # Static assets (favicons, etc.)
├── src/                # React frontend source code
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable React components
│   │   ├── ContextInput.jsx   # Input area for context & img upload
│   │   ├── GenerateButton.jsx # Animated generation button
│   │   ├── Header.jsx         # App branding header
│   │   └── ResultsDisplay.jsx # Renders the categorized AI replies
│   ├── services/       # External service integrations
│   │   └── aiService.js       # Frontend fetch logic calling /api/generate
│   ├── App.jsx         # Main application container and state holder
│   ├── main.jsx        # React entry point
│   ├── App.css         # Application specific styles
│   └── index.css       # Global styles, variables, & animations
├── package.json        # Dependencies and NPM scripts
└── vite.config.js      # Vite build configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18 or completely equivalent.
- **API Key**: You need a Groq API Key to power the reply generator. Get one at [Groq Console](https://console.groq.com/).

### Installation

1. **Clone the repository** (if you haven't already).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up Environment Variables**:
   Create a `.env.local` file in the root directory and add your Groq API Key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

### Running Locally

To start the Vite development server:

```bash
npm run dev
```
*Note: Because the API relies on Vercel Serverless Functions (`/api`), hitting the Vercel backend locally may require running Vercel CLI (`vercel dev`). If you only use `npm run dev`, Vite will serve the frontend, but the `/api` route won't be inherently resolved by Vite unless a proxy is set up or you run via Vercel CLI.*

## 🧩 Core App Logic & State Management

### 1. The Prompt & Context Flow
All main state lives in `App.jsx`, including:
- `context` (String): The text typed by the user representing the chat scenario.
- `imageFile` (File|null): Attached image. *(Currently, OCR is simulated in `App.jsx` if an image is attached).*
- `isGenerating` (Boolean): Loading state.
- `results` (Object|null): The fetched JSON payload from the API.

### 2. The API Route (`api/generate.js`)
- **Endpoint**: `POST /api/generate`
- Receives the `context` from the client.
- Uses a tightly crafted **System Prompt** strictly instructing the LLM (Llama-3.3-70b-versatile) to reply as a "Gen Z-flavored AI reply generator".
- Forces the LLM to output pure JSON containing specific categories:
  - `safe`, `smooth`, `funny`, `bold`, `creative`, `analysis`

### 3. Rendering Results (`ResultsDisplay.jsx`)
Takes the parsed JSON from the server and maps over the categories, displaying them in sleek, animated, glassmorphic cards. Each card has a specific aesthetic based on the generated tone.

## 🎨 Styling & Design Aesthetics

This project puts a heavy emphasis on **Premium, Modern UI**:
- **CSS Variables**: `index.css` defines the entire color palette (Deep dark mode `hsl(240, 10%, 4%)` bg, neon accents).
- **Glassmorphism**: Components use translucent backgrounds (`rgba(255, 255, 255, 0.03)`), backdrop-filters, and subtle borders to look "floating" and premium.
- **Animations**: Uses native CSS keyframes (e.g., `fade-in`, `slide-up`, `pulse-glow`) mapped to simple utility classes (`.animate-fade-in`, `.animate-slide-up`).

When adding new components, **always use the existing CSS variables** (e.g., `var(--bg-primary)`, `var(--accent-primary)`) and maintain the dark-mode minimal aesthetic.

## 🚢 Deployment

The architecture is optimized for **Vercel**.
- The frontend will be built to static files (`npm run build`).
- The `/api` directory is automatically recognized by Vercel as Serverless Functions.
- Make sure to add `GROQ_API_KEY` to your Vercel Project Environment Variables.

## 🛠️ Important Notes for Future Devs

- **No Backend / DB**: There is no database saving these outputs. State is ephemeral.
- **Image Upload Integration**: Currently, the image upload is purely frontend UI and "simulates" an OCR response by appending placeholder text to the prompt. A real integration would require using a Vision model API or an OCR service, uploading the image directly, or base64-encoding it to send to Groq (if supported by the chosen model).
- **Tailwind**: This project **does completely rely on Vanilla CSS** and custom properties, not Tailwind CSS.

---
*Happy Coding! Let's Rizz it up.* 🚀
