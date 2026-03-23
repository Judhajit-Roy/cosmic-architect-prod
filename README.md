# Cosmic Architect

An AI-powered generative universe simulator. Set the laws of physics, trigger the Big Bang, and watch a cosmos born. An AI engine (Claude) profiles your universe and writes its poetic history.

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set your API key
```bash
export ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 3. Run
```bash
npm start
```

Open http://localhost:3000

---

## Deploying

### Railway (recommended — free tier)
1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add environment variable: `ANTHROPIC_API_KEY = sk-ant-...`
4. Deploy — Railway auto-detects Node.js

### Render
1. Push to GitHub
2. New Web Service → connect repo
3. Build command: `npm install`
4. Start command: `npm start`
5. Add env var: `ANTHROPIC_API_KEY`

### Heroku
```bash
heroku create your-app-name
heroku config:set ANTHROPIC_API_KEY=sk-ant-your-key-here
git push heroku main
```

### Fly.io
```bash
fly launch
fly secrets set ANTHROPIC_API_KEY=sk-ant-your-key-here
fly deploy
```

### VPS (any Linux server)
```bash
git clone your-repo
cd cosmic-architect
npm install
ANTHROPIC_API_KEY=sk-ant-... node server.js
```
Use pm2 or systemd to keep it running.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key from console.anthropic.com |
| `PORT` | No | Port to listen on (default: 3000) |

---

## How It Works

1. **Frontend** (`public/index.html`) — pure HTML/CSS/JS, no framework needed
2. **Server** (`server.js`) — Express proxies requests to Anthropic API, keeping your key server-side
3. **AI Engine** — Claude receives your 5 physics slider values and returns a JSON universe profile + 2-sentence poetic history

## Physics Sliders

| Slider | Effect |
|---|---|
| Explosion Force | Particle velocity at birth |
| Gravity | Attraction toward center and between particles |
| Dark Energy | Outward repulsion (drives expansion) |
| Entropy | Randomness of particle trajectories |
| Light Speed | Maximum particle velocity cap |

## Visual Modes

| Mode | Description |
|---|---|
| Stars | Classic glowing spheres, blue-white |
| Nebula | Large diffuse clouds, purple hues, trails |
| Black Holes | 3 gravity wells spawn, accretion disks visible |
| Quantum | Rainbow spectrum, motion trails, erratic movement |
