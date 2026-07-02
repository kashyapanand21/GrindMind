# GrindMind 🧠
An AI-powered LeetCode growth dashboard that tracks your progress, analyzes your solutions, and gives personalized coaching.

## Features
- 📊 **Live Dashboard** — Real-time stats pulled directly from LeetCode's API (total solved, Easy/Medium/Hard breakdown)
- 🤖 **AI Coach Agent** — Powered by Groq (llama-3.1-8b-instant) for fast, intelligent analysis of your solutions
- 📈 **Skill Gap Analysis** — Radar chart + mastery bars showing your strengths and weak zones
- 🔁 **Spaced Repetition Queue** — Automatic revision scheduling based on your solve history
- 💬 **AI Chat** — Ask the agent anything about your progress, patterns, or what to solve next
- 🔐 **User Profile** — Authenticated session with LeetCode username linking

## Setup

### Prerequisites
- Docker Desktop
- [uv](https://astral.sh/uv) package manager
- Lemma CLI
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Installation

**macOS/Linux:**
```bash
# 1. Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Install Lemma CLI
uv tool install lemma-terminal

# 3. Start the Lemma stack (Docker required)
curl -fsSL https://raw.githubusercontent.com/lemma-work/lemma-platform/main/install.sh | bash

# 4. Import the pod
lemma pod import ./grindmind

# 5. Install frontend dependencies and run
cd frontend && npm install && npm run dev
```

**Windows (PowerShell):**
```powershell
# 1. Install uv
powershell -ExecutionPolicy ByPass -c 'irm https://astral.sh/uv/install.ps1 | iex'

# 2. Install Lemma CLI
uv tool install lemma-terminal

# 3. Start the Lemma stack
iwr https://raw.githubusercontent.com/lemma-work/lemma-platform/main/install.ps1 | iex

# 4. Import the pod
lemma pod import ./grindmind

# 5. Install frontend dependencies and run
cd frontend; npm install; npm run dev
```

### Configuration
1. Add your Groq API key to the Lemma runtime profile
2. Open the app at `http://127-0-0-1.sslip.io:5173`
3. Click the profile icon (top right) and enter your **LeetCode username**
4. Your dashboard stats will populate automatically!
