# 📰 FactCheckAI – Real-Time AI Fact Verification

In the digital age, misinformation spreads faster than truth.  
**FactCheckAI** is here to change that. 🚀  

FactCheckAI is a multi-platform AI system that provides **instant, verifiable fact-checks** to help users navigate today’s flood of conflicting claims. Whether it’s historical facts or unfolding real-world events, FactCheckAI empowers individuals to **separate truth from fiction in real-time**.  

---

## ✨ Features

### 🔍 Two-Tier Verification System
1. **Tier 1 – Instant Historical Fact Verification**  
   Pre-trained on a vast **knowledge base of verified historical facts**, FactCheckAI instantly validates static claims without needing live searches.  
   - Example:  
     - ❓ *"Was the Eiffel Tower built in 1887?"*  
     - ✅ *"FALSE. The Eiffel Tower was completed in 1889."*

2. **Tier 2 – Real-Time Event Verification**  
   For ongoing events, FactCheckAI activates its **real-time pipeline** to verify claims against trusted live sources like press releases and reputable news outlets.  
   - Example:  
     - ❓ *"The government just announced a new tariff that will raise car prices by 20%!"*  
     - ⚠️ *"Misleading. A new tariff was announced, but the official increase is 10%. Source: [link]"*

---

## 🌍 Cross-Platform Availability

FactCheckAI is designed to **integrate seamlessly across multiple platforms**:

- **WhatsApp** 💬  
  Add the bot to your chat, send claims, and get instant fact-checks.  

- **X (formerly Twitter)** 🐦  
  Mention `@FactCheckAI` in a tweet or reply to verify a claim.  

- **Instagram** 📸  
  Use `@FactCheckAI` in comments; the bot responds with a concise verdict.  

- **YouTube** ▶️  
  Paste a video link; FactCheckAI transcribes and verifies claims within.  

- **Browser Extension** 🌐  
  Highlight suspicious text → click the extension → get a **real-time fact-check** without leaving the page.  

- **Website** 💻  
  Use our dedicated site for **in-depth explanations and source transparency**.  

---

## ⚙️ How It Works

1. **Claim Extraction** – AI identifies the core claim from text, tweets, posts, or speech-to-text transcripts.  
2. **Source Query** – System searches either the static knowledge base (historical facts) or real-time data (ongoing events).  
3. **Verification** – Matches claim against trusted, verifiable sources.  
4. **Response** – Returns a verdict: ✅ True, ❌ False, ⚠️ Misleading, or ℹ️ Unverified, along with supporting sources.  

---

## 🛠️ Tech Stack (Suggested)
- **Backend**: FastAPI / Node.js  
- **Database**: PostgreSQL (fact DB)  
- **AI/ML**: LLMs + fine-tuned models  
- **Web Scraping**: Real-time pipelines from official sources  
- **Browser Extension**: JavaScript/React  
- **Deployment**: Docker + Cloud Hosting  

---

## 📦 Installation (Coming Soon)
```bash
# Clone the repository
git clone https://github.com/your-username/factcheckai.git

# Navigate to the project folder
cd factcheckai

# Install dependencies
npm install  # or pip install -r requirements.txt

# Run the server
npm start    # or uvicorn main:app --reload
