from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
import json

load_dotenv()

# Initialize Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.0-flash')

app = FastAPI(title="FactCheckAI API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class VerifyRequest(BaseModel):
    claim: str


class VerifyResponse(BaseModel):
    claim: str
    verdict: str
    explanation: str
    confidence: int
    sources: list[str]


@app.get("/")
async def root():
    return {
        "message": "FactCheckAI API is running",
        "version": "1.0.0",
        "endpoints": {
            "verify": "/api/verify",
            "health": "/api/health",
            "docs": "/docs"
        }
    }


@app.get("/api/health")
async def health():
    return {"status": "healthy", "service": "FactCheckAI"}


@app.post("/api/verify", response_model=VerifyResponse)
async def verify_claim(request: VerifyRequest):
    """
    Verify a claim using AI-powered fact-checking.
    
    The system analyzes the claim and provides:
    - Verdict (TRUE, FALSE, MISLEADING, UNVERIFIABLE)
    - Explanation
    - Confidence score
    - Sources
    """
    claim = request.claim.strip()
    
    if not claim:
        raise HTTPException(status_code=400, detail="Claim cannot be empty")
    
    if len(claim) > 500:
        raise HTTPException(status_code=400, detail="Claim is too long (max 500 characters)")
    
    try:
        # Create a detailed prompt for Gemini
        prompt = f"""You are an expert fact-checker. Analyze the following claim and provide a detailed fact-check.

Claim: "{claim}"

Your analysis should include:
1. Verdict: Choose ONE of these: TRUE, FALSE, MISLEADING, or UNVERIFIABLE
2. Explanation: A clear, concise explanation (2-4 sentences) with specific details
3. Confidence: A percentage (0-100) indicating how confident you are in this verdict

Respond ONLY with valid JSON in this exact format:
{{
  "verdict": "TRUE/FALSE/MISLEADING/UNVERIFIABLE",
  "explanation": "Your detailed explanation here",
  "confidence": 85
}}

Be precise, factual, and cite specific dates, numbers, or events when relevant."""

        # Call Gemini API
        response = model.generate_content(prompt)
        result_text = response.text.strip()
        
        # Try to extract JSON from the response
        try:
            # Remove markdown code blocks if present
            if result_text.startswith("```"):
                result_text = result_text.split("```")[1]
                if result_text.startswith("json"):
                    result_text = result_text[4:]
                result_text = result_text.strip()
            
            result = json.loads(result_text)
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            result = {
                "verdict": "UNVERIFIABLE",
                "explanation": result_text,
                "confidence": 50
            }
        
        # Validate verdict
        valid_verdicts = ["TRUE", "FALSE", "MISLEADING", "UNVERIFIABLE"]
        verdict = result.get("verdict", "UNVERIFIABLE").upper()
        if verdict not in valid_verdicts:
            verdict = "UNVERIFIABLE"
        
        # Construct response
        return VerifyResponse(
            claim=claim,
            verdict=verdict,
            explanation=result.get("explanation", "Analysis completed"),
            confidence=min(max(result.get("confidence", 70), 0), 100),
            sources=["Google Gemini 2.0 Flash Analysis", "AI Knowledge Base"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Verification failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
