# GrindMind — AI-Powered LeetCode Growth Agent

> *Stop copy-pasting your solutions into ChatGPT. Let an agent that actually remembers you do the coaching.*

<div align="center">

![GrindMind Banner](https://img.shields.io/badge/GrindMind-AI%20DSA%20Coach-f5a623?style=for-the-badge&logo=leetcode&logoColor=white)
![Built with Lemma](https://img.shields.io/badge/Built%20with-Lemma%20SDK-00d4d4?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Built for the Gappy AI Hackathon — Ship to Get Hired**

[Live Demo](#) · [Project Writeup](#) · [Team](#team)

</div>

---

## The Problem

Every serious LeetCode grinder faces the same loop:

- Solve a problem → forget the pattern in a week
- Copy-paste solutions into ChatGPT for feedback → close the tab → context gone forever
- No idea which patterns you're actually weak at vs strong at
- No structured revision — you randomly pick problems and hope for the best

**The AI tools exist. The memory doesn't.** ChatGPT and Claude are stateless. Every session starts from zero. There's no persistent coach that knows your history, tracks your patterns, and tells you exactly what to work on next.

---

## The Solution

**GrindMind** is an agentic workspace powered by the Lemma SDK that:

- Connects to your LeetCode profile and syncs your submissions automatically every day
- Runs an AI analysis agent on every new solve — identifying patterns, complexity, and approach quality
- Builds a persistent, growing picture of your DSA skill map over time
- Surfaces a smart revision queue using spaced repetition logic
- Lets you chat with an agent that has full context of everything you've ever solved

This is not a chatbot. It's a **background coach** that works while you grind.

---

## Demo

```
You solve "Longest Repeating Character Replacement" on LeetCode
                        ↓
GrindMind detects the new submission (daily workflow)
                        ↓
Analysis agent identifies: Sliding Window · O(N) · Optimal approach
                        ↓
Skill score for "Sliding Window" updated in your profile
                        ↓
Problem added to revision queue (due in 7 days)
                        ↓
Dashboard updates — you open GrindMind and see exactly what to review today
```

---

## Features

### Automatic Submission Tracking
Connects to LeetCode's GraphQL API and syncs your accepted submissions daily. Detects new solves since the last run and logs every problem with difficulty, topic tags, language, runtime, and memory.

### AI Solution Analysis
A Lemma agent reads each new solve and produces structured output — DSA pattern detected, time and space complexity, whether the approach was optimal or brute force, and a coaching note explaining what could be improved. Results land as rows in your database, not a chat message that disappears.

### Persistent Skill Map
Your DSA competency by topic is tracked over time. Every new solve updates your scores for Arrays, Trees, Graphs, Dynamic Programming, Sliding Window, and more. The dashboard shows exactly where you're strong and where your gaps are.

### Smart Revision Queue
Spaced repetition logic automatically schedules problems for review. Problems you brute-forced, took multiple attempts, or haven't revisited in 14+ days get surfaced first. A "Today's Revision" list is generated fresh every day.

### AI Chat with Full Context
Instead of going to ChatGPT and starting from zero, you chat with a Lemma agent that has access to your entire solve history. Ask "what's my weakest pattern?", "why did I fail this problem?", or "what should I work on this week?" and get answers grounded in your real data.

### Weekly Progress Report
A workflow runs every Sunday and generates a structured summary — problems solved, new patterns learned, score changes, and recommended focus areas for the week ahead.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        GrindMind Pod                        │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Tables     │    │    Agents    │    │  Workflows   │  │
│  │              │    │              │    │              │  │
│  │ solved_      │◄───│ solution_    │◄───│ daily_fetch  │  │
│  │ problems     │    │ analyzer     │    │              │  │
│  │              │    │              │    │ weekly_      │  │
│  │ analyses     │◄───│              │    │ report       │  │
│  │              │    │              │    │              │  │
│  │ skill_scores │◄───│              │    │              │  │
│  │              │    │              │    │              │  │
│  │ revision_    │◄───│              │    │              │  │
│  │ queue        │    │              │    │              │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Dashboard (Vite)                  │   │
│  │  Dashboard · Revision Queue · Skill Map · AI Chat   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
         ▲
         │  LeetCode GraphQL API
         │  (fetcher/leetcode_client.py)
         │
    leetcode.com
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Agent Infrastructure | Lemma SDK |
| LeetCode Data | LeetCode GraphQL API (unofficial) |
| Backend Fetcher | Python 3.10+ |
| Frontend Dashboard | React 19 + Vite |
| Charts & Visualizations | Recharts |
| Icons | Lucide React |
| Routing | React Router DOM |
| Pod Storage | Lemma Datastores (PostgreSQL under the hood) |

---

## Project Structure

```
GrindMind/
│
├── grindmind/                    # Lemma pod — the entire backend
│   ├── pod.json                  # Pod config
│   ├── agents/
│   │   └── solution_analyzer/    # The AI analysis agent
│   │       ├── agent.json
│   │       └── instruction.md    # Agent prompt and behavior
│   ├── tables/
│   │   ├── solved_problems/      # Every LeetCode solve logged
│   │   ├── analyses/             # Agent analysis output per solve
│   │   ├── skill_scores/         # DSA topic scores over time
│   │   └── revision_queue/       # Spaced repetition queue
│   ├── workflows/
│   │   ├── daily_fetch/          # Runs daily, syncs new solves
│   │   └── weekly_report/        # Runs Sunday, generates summary
│   └── fetcher/
│       ├── leetcode_client.py    # LeetCode GraphQL API client
│       ├── sync.py               # Deduplication + pod sync logic
│       └── requirements.txt
│
├── frontend/                     # React dashboard
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RevisionQueue.jsx
│   │   │   ├── ProblemHistory.jsx
│   │   │   ├── SkillMap.jsx
│   │   │   ├── AIChat.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── components/
│   │   └── data/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Windows, macOS, or Linux
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- Git
- Python 3.10+
- Node.js 18+

### Step 1 — Install uv and Lemma CLI

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**macOS / Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Then install the CLI:
```bash
uv tool install lemma-terminal
```

### Step 2 — Run the Lemma Stack Locally

**Windows:**
```powershell
iwr https://raw.githubusercontent.com/lemma-work/lemma-platform/main/install.ps1 | iex
```

**macOS / Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/lemma-work/lemma-platform/main/install.sh | bash
```

Open `http://127-0-0-1.sslip.io:3711` in your browser and create an account.

### Step 3 — Clone and Import the Pod

```bash
git clone https://github.com/kashyapanand21/GrindMind.git
cd GrindMind

lemma servers select local
lemma auth login

export LEMMA_POD_ID=019f1348-6db7-7416-ac52-f0b12e4404b0
export LEMMA_ORG_ID=019f0dbf-71c3-7769-9556-069e3c6a6662

cd grindmind
lemma pod import .
```

**Windows PowerShell:**
```powershell
$env:LEMMA_POD_ID="019f1348-6db7-7416-ac52-f0b12e4404b0"
$env:LEMMA_ORG_ID="019f0dbf-71c3-7769-9556-069e3c6a6662"
```

### Step 4 — Sync Your LeetCode Profile

```bash
cd fetcher
pip install -r requirements.txt
python sync.py your_leetcode_username
```

### Step 5 — Run the Frontend

```bash
cd ../../frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## How It Works (Deep Dive)

### Data Flow

1. `sync.py` calls the LeetCode GraphQL API and fetches your recent accepted submissions
2. Each new submission is checked against the `solved_problems` table to avoid duplicates
3. New solves are inserted as structured records with full metadata
4. The `solution_analyzer` Lemma agent reads new records and produces analysis output
5. Analysis results are written to the `analyses` table and `skill_scores` are updated
6. The `revision_queue` is updated with spaced repetition scheduling logic
7. The React dashboard reads from all tables and renders your growth profile in real time

### The Analysis Agent

The agent is given the problem name, difficulty, topic tags, and language. It identifies:

- The primary DSA pattern used (Sliding Window, Two Pointers, BFS, DP, etc.)
- Time and space complexity of the optimal approach
- Whether the submitted approach was optimal, suboptimal, or brute force
- A short coaching note with specific improvement suggestions

All output is structured and stored — not a chat message that vanishes.

### Spaced Repetition Logic

The revision queue uses a simple but effective scheduling algorithm:

- Newly solved problems → scheduled for review in 7 days
- Problems solved with brute force approach → scheduled for review in 3 days
- Problems in your weakest topic areas → elevated priority
- Problems not revisited in 14+ days → surfaced immediately

---

## Team

| Person | Role | Responsibility |
|---|---|---|
| Anand Kashyap | Person 1 — Data Layer | LeetCode API integration, pod tables, daily sync workflow |
| Zaid Ali | Person 2 — AI Agent | Solution analysis agent, skill scoring, revision queue logic |
| Rudra Pratap | Person 3 — Dashboard | React frontend, skill map, revision UI, AI chat interface |

---

## Built At

**Gappy AI Hackathon — Ship to Get Hired**
Build window: June 24–30, 2026
Infrastructure: [Lemma SDK](https://github.com/lemma-work/lemma-platform)

---

## License

MIT License. See `LICENSE` for details.

---

<div align="center">
  <sub>Built with the Lemma SDK · Powered by LeetCode's GraphQL API · Designed for grinders</sub>
</div>
