'use client';

import { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle, XCircle, AlertCircle, HelpCircle, Loader2, Sparkles } from 'lucide-react';

interface VerificationResult {
  claim: string;
  verdict: string;
  explanation: string;
  confidence: number;
  sources: string[];
}

export default function Page() {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sampleClaims = [
    "The Eiffel Tower was built in 1889",
    "Water boils at 100°C at sea level",
    "Humans landed on the moon in 1969",
    "The Great Wall of China is visible from space"
  ];

  const handleVerify = async () => {
    if (!claim.trim()) {
      setError('Please enter a claim to verify');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8000/api/verify', {
        claim: claim.trim()
      });
      setResult(response.data);
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.response?.data?.detail || 'Failed to verify claim. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'TRUE': return 'text-green-600 dark:text-green-400';
      case 'FALSE': return 'text-red-600 dark:text-red-400';
      case 'MISLEADING': return 'text-orange-600 dark:text-orange-400';
      case 'UNVERIFIABLE': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-gray-600';
    }
  };

  const getVerdictBgColor = (verdict: string) => {
    switch (verdict) {
      case 'TRUE': return 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800';
      case 'FALSE': return 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800';
      case 'MISLEADING': return 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800';
      case 'UNVERIFIABLE': return 'bg-gray-50 dark:bg-gray-950/30 border-gray-200 dark:border-gray-800';
      default: return 'bg-gray-50';
    }
  };

  const getVerdictIcon = (verdict: string) => {
    const iconClass = "w-8 h-8";
    switch (verdict) {
      case 'TRUE': return <CheckCircle className={`${iconClass} text-green-600`} />;
      case 'FALSE': return <XCircle className={`${iconClass} text-red-600`} />;
      case 'MISLEADING': return <AlertCircle className={`${iconClass} text-orange-600`} />;
      case 'UNVERIFIABLE': return <HelpCircle className={`${iconClass} text-gray-600`} />;
      default: return <HelpCircle className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto pt-12 md:pt-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 dark:text-white">
              FactCheck<span className="text-indigo-600 dark:text-indigo-400">AI</span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Instant AI-powered fact verification for the digital age
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Combat misinformation with real-time claim analysis
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 backdrop-blur-lg border border-gray-100 dark:border-gray-700">
          
          {/* Sample Claims */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {sampleClaims.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setClaim(sample)}
                  className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-sm transition-all duration-200 hover:scale-105"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              value={claim}
              onChange={(e) => {
                setClaim(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleVerify()}
              placeholder="Enter a claim to verify... (e.g., 'The Eiffel Tower was built in 1887')"
              className="flex-1 px-6 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none text-base md:text-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              disabled={loading}
            />
            <button
              onClick={handleVerify}
              disabled={loading || !claim.trim()}
              className="px-8 py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:scale-105 disabled:hover:scale-100 min-w-[140px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  Verify
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className={`mt-8 p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 ${getVerdictBgColor(result.verdict)}`}>
              
              {/* Verdict Header */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-current/10">
                {getVerdictIcon(result.verdict)}
                <div className="flex-1">
                  <h2 className={`text-3xl font-bold ${getVerdictColor(result.verdict)}`}>
                    {result.verdict}
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          result.verdict === 'TRUE' ? 'bg-green-500' :
                          result.verdict === 'FALSE' ? 'bg-red-500' :
                          result.verdict === 'MISLEADING' ? 'bg-orange-500' :
                          'bg-gray-500'
                        }`}
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]">
                      {result.confidence}% confident
                    </span>
                  </div>
                </div>
              </div>

              {/* Claim */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  Claim Analyzed:
                </p>
                <p className="text-gray-800 dark:text-gray-200 italic text-lg font-medium bg-white/50 dark:bg-black/20 p-4 rounded-lg">
                  "{result.claim}"
                </p>
              </div>

              {/* Explanation */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  Analysis:
                </p>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base">
                  {result.explanation}
                </p>
              </div>

              {/* Sources */}
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  Sources:
                </p>
                <ul className="space-y-2">
                  {result.sources.map((source: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Info Footer */}
          {!result && !loading && (
            <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-2">How it works:</h3>
              <ul className="space-y-2 text-sm text-indigo-700 dark:text-indigo-400">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">1.</span>
                  <span>Enter any claim you want to verify</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">2.</span>
                  <span>Our AI analyzes the claim using advanced language models</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">3.</span>
                  <span>Get instant verdict with detailed explanation and confidence score</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p className="mb-2">
            <strong>Note:</strong> AI-powered analysis. For critical decisions, verify with multiple authoritative sources.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Powered by OpenAI GPT-4 • Built for instant fact verification
          </p>
        </div>
      </div>
    </div>
  );
}
