import { useState, useRef, useEffect } from 'react';
import Groq from "groq-sdk";
import fallbackAvatar from '../assets/profile.jpg';

// The AI's brain - exactly as you defined
const SYSTEM_PROMPT = `You are Rifat's AI assistant on his portfolio website. You know everything about Rifat's skills, projects, and background. Answer visitor questions about Rifat professionally and enthusiastically. If asked about hiring or collaboration, encourage them to contact via email or LinkedIn. Keep answers concise (2-4 sentences). Always stay in character.

ABOUT RIFAT:
Name: Md. Rifadul Islam Rifat
Role: Urban Planning Researcher & AI Engineer
University: PUST, B.Sc. URP (Expected 2028)
Location: Rajshahi, Bangladesh
Email: rifadukrifat@gmail.com
LinkedIn: linkedin.com/in/rifadul-rifat
GitHub: github.com/rifadukrifat-0035

Achievements: National 1st Runner-up GEOPLAN 1.0 Mapathon, International Speaker at Nalanda University India (March 2026), APA Student Member, Winter Intern at CROPC-IMD India, BIP Conference Volunteer.

Projects:
1. Rajshahi 2035 UHI — GEE, Landsat, ArcGIS. Discovered spectral hallucinations in AI.
2. OmniGuard-AI — Sentinel-1 SAR, NetworkX, Gemini 1.5 Flash, Bengali flood alerts.
3. BIP RAG Chatbot — FastAPI, GitHub Actions, Zero monthly cost.
4. Traffic Agent — YOLOv8, ByteTrack, Groq.
5. BERT QA System — SQuAD v1.1.
6. Multi-Agent System — LangGraph, Tavily, Llama 3.3 70B.

Skills: Geospatial (ArcGIS, QGIS, GEE, Sentinel-1 SAR, NDBI, MNDWI, NDVI, LST, AutoCAD), AI (LangChain, LangGraph, RAG, YOLOv8, BERT, Gemini, Groq, n8n), Engineering (Python, FastAPI, Docker, GitHub Actions, Streamlit).

Available for: Part-time AI Engineering work, Geospatial data analysis projects, Research collaboration, Freelance automation projects.`;

const SUGGESTED_QUESTIONS = [
  "What are Rifat's top skills?",
  "Tell me about OmniGuard-AI",
  "Is Rifat available for hire?",
  "What makes Rifat unique?"
];

const CTA_MESSAGES = [
  "Hey, click here for more information.",
  "Need help? I can guide you instantly.",
  "Ask me about projects, skills, or hiring."
];

const GUIDE_AVATAR_URL = "https://drive.google.com/thumbnail?id=18pdtlamHZlNdJ56v3Xt7x_4wFmXJmY_4&sz=w1000";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ctaIndex, setCtaIndex] = useState(0);
  const messagesEndRef = useRef(null);

  // Initialize Groq Client
  // Using dangerouslyAllowBrowser because we are calling it directly from React
  const groq = new Groq({ 
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true 
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) return undefined;

    const ctaInterval = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % CTA_MESSAGES.length);
    }, 3200);

    return () => clearInterval(ctaInterval);
  }, [isOpen]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSend = async (textToProcess) => {
    const text = textToProcess || input;
    if (!text.trim()) return;

    // Add user message to UI
    const newMessages = [...messages, { role: 'user', content: text, createdAt: Date.now() }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Format messages for Groq API
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...newMessages.map(msg => ({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.content
        }))
      ];

      // Call Groq API with Llama 3.3 70B
      const completion = await groq.chat.completions.create({
        messages: apiMessages,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 150,
      });

      const aiResponse = completion.choices[0]?.message?.content || "Sorry, I couldn't process that.";

      // Add AI response to UI
      setMessages((prev) => [...prev, { role: 'model', content: aiResponse, createdAt: Date.now() }]);
    } catch (error) {
      console.error("Groq API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          content: "Oops! My servers are taking a quick nap. Please email Rifat directly at rifadukrifat@gmail.com!",
          createdAt: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="relative mb-4 h-[560px] max-h-[82vh] w-[94vw] max-w-[420px] overflow-hidden rounded-3xl border border-white/10 bg-[#050505]/92 shadow-[0_30px_120px_rgba(16,185,129,0.2)] backdrop-blur-2xl transition-all duration-300">
          <div className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-white/10 bg-slate-900/60 px-4 py-3 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="truncate text-sm font-semibold tracking-wide">Ask Rifat's AI</h3>
                </div>
                <p className="mt-1 text-xs text-slate-400">Llama 3.3 • Portfolio Assistant • Online</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                  Live
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.length === 0 && (
              <div className="mb-6 mt-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                <p className="font-medium text-slate-100">Hi! I can answer anything about Rifat.</p>
                <p className="mt-2 text-slate-400">Ask about projects, skills, hiring availability, or collaboration.</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'rounded-br-none bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                    : 'rounded-bl-none border border-emerald-500/30 bg-emerald-500/10 text-slate-100'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  <div className={`mt-2 text-[10px] uppercase tracking-[0.18em] ${
                    msg.role === 'user' ? 'text-blue-100/80' : 'text-emerald-300/80'
                  }`}>
                    {msg.role === 'user' ? 'You' : 'Rifat AI'} • {formatTime(msg.createdAt)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-none border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                  <div className="flex gap-1.5 items-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce"></div>
                  </div>
                  <span className="text-xs text-emerald-200">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="rounded-full border border-emerald-500/30 bg-slate-900/70 px-3 py-1.5 text-left text-xs text-emerald-300 transition-colors hover:bg-emerald-900/30"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-white/10 bg-slate-900/80 p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 rounded-full border border-white/10 bg-black/50 py-2.5 pl-4 pr-20 text-sm text-white placeholder-gray-500 transition-colors focus:border-emerald-500/50 focus:outline-none"
              />
              <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
                {input.length}/160
              </span>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-1.5 top-1.5 rounded-full bg-blue-600 p-1.5 text-white transition-colors hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          </div>
          </div>
        </div>
      )}

      {/* Floating Bubble */}
      {!isOpen && (
        <div className="flex items-end gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex max-w-[250px] items-center gap-3 rounded-2xl border border-emerald-400/25 bg-slate-950/90 px-3 py-2 text-left shadow-[0_10px_45px_rgba(16,185,129,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300/35"
            aria-label="Open AI chat with guide prompt"
          >
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-lg">
              <span className="absolute -inset-0.5 rounded-xl bg-emerald-400/35 blur-sm" />
              <img
                src={GUIDE_AVATAR_URL}
                alt="AI Guide"
                className="relative h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackAvatar;
                }}
              />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-300/85">AI Guide</span>
              <span key={ctaIndex} className="block text-xs leading-relaxed text-slate-100 animate-pulse">
                {CTA_MESSAGES[ctaIndex]}
              </span>
            </span>
            <span className="ml-auto text-emerald-300 animate-bounce">&gt;</span>
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-gradient-to-tr from-emerald-600 to-blue-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25"
            aria-label="Open AI chat"
          >
            <span className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-tr from-emerald-500/40 to-blue-500/40 blur-md transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-slate-900 bg-emerald-400">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
}