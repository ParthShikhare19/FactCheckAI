# FactCheckAI 🔍

> Instant AI-powered fact verification to combat misinformation in real-time

FactCheckAI is a multi-platform AI system that provides instant, verifiable truth checks across web, Telegram, and more. Built for hackathons, designed for impact.

![FactCheckAI](https://img.shields.io/badge/Status-Hackathon%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Quick Start (5 Minutes)

### 1️⃣ Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate           # Windows
# source venv/bin/activate      # macOS/Linux
pip install -r requirements.txt
```

Create `backend/.env`:
```env
OPENAI_API_KEY=your_openai_key_here
TELEGRAM_BOT_TOKEN=your_telegram_token  # Optional
```

Run backend:
```bash
uvicorn main:app --reload
```

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3️⃣ Visit
- **Website**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

---

## ✨ Features

- **⚡ Instant Verification**: Real-time fact-checking using GPT-4
- **🌐 Web Interface**: Beautiful chat-like UI for claim verification
- **🤖 Telegram Bot**: Verify claims directly in Telegram
- **📊 Confidence Scoring**: AI-powered confidence metrics
- **🎯 Multiple Verdicts**: TRUE, FALSE, MISLEADING, or UNVERIFIABLE
- **💡 Detailed Explanations**: Get context and reasoning for each verdict

---

## 🏗️ Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **OpenAI GPT-4** - Advanced language model for fact-checking
- **Python 3.10+** - Core programming language

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

### Integrations
- **Telegram Bot API** - Messaging platform integration

---

## 📦 Project Structure

```
FactCheckAI/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── telegram_bot.py      # Telegram bot
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variables template
├── frontend/
│   ├── app/
│   │   └── page.tsx         # Main chat interface
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🎯 Usage

### Web Interface

1. Open `http://localhost:3000` in your browser
2. Enter a claim in the input box (or click a sample claim)
3. Click "Verify" or press Enter
4. View the instant verdict with explanation and confidence score

**Example Claims:**
- "The Eiffel Tower was built in 1889"
- "Water boils at 100°C at sea level"
- "Humans landed on the moon in 1969"
- "The Great Wall of China is visible from space"

### Telegram Bot

1. **Create a bot** with [@BotFather](https://t.me/botfather):
   - Send `/newbot`
   - Follow instructions
   - Copy the token

2. **Add token to `.env`**:
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ```

3. **Run the bot**:
   ```bash
   cd backend
   python telegram_bot.py
   ```

4. **Use your bot**:
   - Search for your bot on Telegram
   - Send `/start` to begin
   - Send any claim to verify

### API Endpoints

**Verify Claim:**
```bash
POST http://localhost:8000/api/verify
Content-Type: application/json

{
  "claim": "The Eiffel Tower was built in 1889"
}
```

**Response:**
```json
{
  "claim": "The Eiffel Tower was built in 1889",
  "verdict": "TRUE",
  "explanation": "The Eiffel Tower was indeed completed in 1889...",
  "confidence": 95,
  "sources": ["OpenAI GPT-4 Analysis"]
}
```

**Health Check:**
```bash
GET http://localhost:8000/api/health
```

**API Documentation:**
Visit `http://localhost:8000/docs` for interactive Swagger UI

---

## 🛠️ Development

### Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Telegram Bot Token (optional)

### Environment Variables

Create `backend/.env`:
```env
# Required
OPENAI_API_KEY=sk-...

# Optional (for Telegram bot)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
```

### Running Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on `http://localhost:8000`

### Running Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Running Telegram Bot

```bash
cd backend
python telegram_bot.py
```

---

## 🎨 Features Overview

### Two-Tier Verification System

**Tier 1: Instant Historical Facts**
- Pre-verified knowledge base
- Instant responses
- No internet search needed
- Example: "Eiffel Tower built in 1889" ✅ TRUE

**Tier 2: Real-Time Verification** (Future Enhancement)
- Live web scraping
- Official source checking
- Cross-reference validation
- Example: Current news verification

### Verdict Types

| Verdict | Emoji | Description |
|---------|-------|-------------|
| TRUE | ✅ | Claim is accurate based on evidence |
| FALSE | ❌ | Claim is definitively incorrect |
| MISLEADING | ⚠️ | Partially true but lacks context |
| UNVERIFIABLE | ❓ | Insufficient evidence to determine |

---

## 🚀 Deployment

### Quick Deploy Options

**Backend (Choose one):**
- [Railway.app](https://railway.app) - One-click deploy, free tier
- [Render](https://render.com) - Free tier available
- [Fly.io](https://fly.io) - Global deployment

**Frontend:**
- [Vercel](https://vercel.com) - Optimized for Next.js, free tier
- [Netlify](https://netlify.com) - Easy deployment
- [Cloudflare Pages](https://pages.cloudflare.com) - Fast CDN

### Deploy to Vercel (Frontend)

```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy to Railway (Backend)

1. Push to GitHub
2. Connect Railway to your repo
3. Add environment variables
4. Deploy!

---

## 📚 API Reference

### POST /api/verify

Verify a claim using AI-powered fact-checking.

**Request:**
```json
{
  "claim": "string (max 500 chars)"
}
```

**Response:**
```json
{
  "claim": "The claim that was verified",
  "verdict": "TRUE | FALSE | MISLEADING | UNVERIFIABLE",
  "explanation": "Detailed explanation of the verdict",
  "confidence": 85,
  "sources": ["Source 1", "Source 2"]
}
```

**Error Responses:**
- `400` - Invalid claim (empty or too long)
- `500` - Server error or OpenAI API error

---

## 🎓 How It Works

1. **User submits claim** via web or Telegram
2. **AI analyzes claim** using GPT-4
3. **Verdict generated** based on knowledge base
4. **Response formatted** with explanation and sources
5. **User receives** instant fact-check result

---

## 📝 Future Enhancements

- [ ] Browser extension (Chrome, Firefox)
- [ ] WhatsApp bot integration
- [ ] Twitter/X bot integration
- [ ] YouTube video transcription
- [ ] Vector database for historical facts
- [ ] Real-time web scraping
- [ ] Multi-language support
- [ ] User authentication & history
- [ ] Source credibility scoring
- [ ] Batch verification API
- [ ] Mobile apps (iOS, Android)

---

## ⚠️ Limitations

- AI-powered analysis is not 100% accurate
- Requires active internet connection
- OpenAI API costs apply (pay-per-use)
- Rate limits on API calls
- **For critical decisions, verify with multiple authoritative sources**

---

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 API
- **Vercel** for Next.js framework
- **FastAPI** for amazing Python framework
- **Telegram** for Bot API

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ParthShikhare19/FactCheckAI/issues)
- **Email**: Contact via GitHub profile

---

## 🌟 Hackathon Tips

### Demo Preparation

1. **Test with impressive claims**:
   - Mix of TRUE, FALSE, and MISLEADING
   - Show confidence scores
   - Highlight source attribution

2. **Show multi-platform**:
   - Demo website first
   - Then show Telegram bot on phone
   - Emphasize ease of use

3. **Mention scalability**:
   - "Currently MVP with GPT-4"
   - "Future: Vector DB for 100M+ facts"
   - "Real-time scraping for current events"

### Presentation Flow (5 min)

1. **Problem** (30 sec): Misinformation crisis
2. **Solution** (30 sec): AI fact-checking anywhere
3. **Live Demo** (3 min):
   - Website verification
   - Telegram bot
   - Show different verdict types
4. **Tech Stack** (30 sec): Next.js, FastAPI, GPT-4
5. **Vision** (30 sec): Browser extension, more platforms

---

## 📊 Stats

- **Lines of Code**: ~500 (backend) + ~300 (frontend)
- **Setup Time**: 5 minutes
- **Platforms**: Web + Telegram (extensible)
- **Response Time**: 2-5 seconds average

---

**Built with ❤️ for hackathons and the fight against misinformation**

*"In a world of misinformation, facts matter."*

---

## 🎯 Getting Started Checklist

- [ ] Clone repository
- [ ] Get OpenAI API key
- [ ] Setup backend (5 min)
- [ ] Setup frontend (5 min)
- [ ] Test on localhost
- [ ] (Optional) Setup Telegram bot
- [ ] (Optional) Deploy to production
- [ ] Prepare demo
- [ ] Win hackathon! 🏆
