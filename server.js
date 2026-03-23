const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!ANTHROPIC_API_KEY
  });
});

// Proxy endpoint — keeps API key server-side
app.post('/api/universe', async (req, res) => {
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY environment variable not set on server.'
    });
  }

  const { force, gravity, dark, entropy, light } = req.body;

  const systemPrompt = `You are the Cosmic Architect Physics Engine — an AI backend for a universe simulation.
Given physics slider values (0-100), output ONLY valid JSON with exactly two keys:
1. "params": object with these exact keys:
   - gravity_constant (float 0.0-2.0)
   - dark_energy_density (float 0.0-1.0)
   - expansion_rate (one of: "contracting" | "stable" | "inflating" | "runaway")
   - particle_clustering (one of: "none" | "low" | "medium" | "high" | "extreme")
   - temperature_kelvin (integer)
   - universe_type (a creative evocative name, e.g. "Cold Dark Expanse", "Fiery Rebirth Cosmos")
   - stability (one of: "unstable" | "volatile" | "stable" | "eternal")
   - timeline_years (string estimate, e.g. "10^12 years", "Heat death in 800 billion years")
   - light_behavior (one of: "frozen" | "sluggish" | "normal" | "superluminal")
2. "poetic_history": exactly 2 sentences. Dramatic, poetic. Describe what happened in this Big Bang and the universe it created.
No markdown, no code fences, no explanation. Pure JSON only.`;

  const userPrompt = `Big Bang parameters:
- Explosion Force: ${force}/100
- Gravity: ${gravity}/100
- Dark Energy: ${dark}/100
- Entropy: ${entropy}/100
- Light Speed: ${light}/100
Generate the universe physics profile.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const raw = data.content.map(b => b.text || '').join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    res.json(parsed);

  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Catch-all — serve index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Cosmic Architect running on http://localhost:${PORT}`);
  console.log(`API key: ${ANTHROPIC_API_KEY ? 'SET' : 'NOT SET — set ANTHROPIC_API_KEY env var'}`);
});
