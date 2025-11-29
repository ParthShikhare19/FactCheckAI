"""
FactCheckAI Telegram Bot

Setup:
1. Message @BotFather on Telegram
2. Create a new bot with /newbot
3. Copy the token
4. Add TELEGRAM_BOT_TOKEN and GEMINI_API_KEY to your .env file
5. Run: python telegram_bot.py
"""

import os
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import google.generativeai as genai
from dotenv import load_dotenv
import json
import logging

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash')

TELEGRAM_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not TELEGRAM_TOKEN:
    raise ValueError("TELEGRAM_BOT_TOKEN not found in .env file")

if not os.getenv("GEMINI_API_KEY"):
    raise ValueError("GEMINI_API_KEY not found in .env file")


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send a welcome message when the /start command is issued."""
    welcome_message = """
👋 Welcome to FactCheckAI Bot!

I can help you verify claims instantly using AI-powered fact-checking.

📝 How to use:
Simply send me any claim and I'll analyze it for you!

Examples:
• "The Eiffel Tower was built in 1889"
• "Water boils at 100°C at sea level"
• "The moon landing happened in 1969"

🔍 I'll provide:
✅ Verdict (TRUE/FALSE/MISLEADING/UNVERIFIABLE)
📊 Confidence score
💡 Detailed explanation

Try it now! Send me a claim to verify.
"""
    await update.message.reply_text(welcome_message)


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send help information."""
    help_text = """
🤖 FactCheckAI Bot Help

Commands:
/start - Start the bot and see welcome message
/help - Show this help message

Usage:
Just send any text claim and I'll fact-check it!

Example claims to try:
• Historical facts
• Scientific statements  
• Current events
• Common myths

⚠️ Note: I provide AI-powered analysis. For critical decisions, always verify with multiple authoritative sources.
"""
    await update.message.reply_text(help_text)


async def verify_claim(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle incoming messages and verify claims."""
    claim = update.message.text.strip()
    
    if not claim:
        await update.message.reply_text("❌ Please send a valid claim to verify.")
        return
    
    # Send "thinking" message
    thinking_msg = await update.message.reply_text("🔍 Analyzing your claim... Please wait.")
    
    try:
        # Create prompt for Gemini
        prompt = f"""You are an expert fact-checker. Analyze this claim and provide a concise fact-check.

Claim: "{claim}"

Respond ONLY with valid JSON:
{{
  "verdict": "TRUE/FALSE/MISLEADING/UNVERIFIABLE",
  "explanation": "Brief explanation (2-3 sentences)",
  "confidence": 85
}}"""

        # Call Gemini API
        response = model.generate_content(prompt)
        result_text = response.text.strip()
        
        # Clean JSON from markdown if present
        if result_text.startswith("```"):
            result_text = result_text.split("```")[1]
            if result_text.startswith("json"):
                result_text = result_text[4:]
            result_text = result_text.strip()
        
        result = json.loads(result_text)
        
        # Extract data
        verdict = result.get("verdict", "UNVERIFIABLE").upper()
        explanation = result.get("explanation", "Analysis completed")
        confidence = result.get("confidence", 70)
        
        # Map verdicts to emojis
        emoji_map = {
            "TRUE": "✅",
            "FALSE": "❌",
            "MISLEADING": "⚠️",
            "UNVERIFIABLE": "❓"
        }
        
        emoji = emoji_map.get(verdict, "❓")
        
        # Format response
        response_text = f"""
{emoji} **{verdict}**

📊 Confidence: {confidence}%

💡 **Explanation:**
{explanation}

🔎 **Claim analyzed:**
_{claim}_

---
Powered by FactCheckAI (Gemini)
"""
        
        # Delete thinking message and send result
        await thinking_msg.delete()
        await update.message.reply_text(response_text, parse_mode='Markdown')
        
        logger.info(f"Verified claim: {claim[:50]}... | Verdict: {verdict}")
        
    except json.JSONDecodeError as e:
        await thinking_msg.delete()
        await update.message.reply_text(
            "❌ Sorry, I couldn't parse the analysis. Please try again."
        )
        logger.error(f"JSON parse error: {e}")
        
    except Exception as e:
        await thinking_msg.delete()
        await update.message.reply_text(
            "❌ An error occurred while processing your request. Please try again."
        )
        logger.error(f"Error: {e}")


def main():
    """Start the bot."""
    logger.info("Starting FactCheckAI Telegram Bot...")
    
    # Create application
    application = Application.builder().token(TELEGRAM_TOKEN).build()
    
    # Add handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, verify_claim))
    
    # Start the bot
    logger.info("✅ Bot is running! Press Ctrl+C to stop.")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()
