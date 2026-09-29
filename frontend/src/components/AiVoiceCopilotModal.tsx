import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  User,
  Sparkles,
  Camera,
  Database,
  Wheat,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../i18n/translations';
import { generateFoodPackagingAdviceAsync } from '../services/aiFoodAdvisor';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  actionPrompt?: string;
  actionType?: 'camera' | 'farmer' | 'datastore';
}

interface AiVoiceCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onSpeakText: (text: string) => void;
  onStopSpeaking: () => void;
  isSpeaking: boolean;
  onStartVoiceInput: () => void;
  onStopVoiceInput: () => void;
  isListening: boolean;
  voiceTranscript: string;
  onOpenCamera?: () => void;
  onOpenFarmerMode?: () => void;
  onOpenDataStore?: () => void;
}

export const AiVoiceCopilotModal: React.FC<AiVoiceCopilotModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSpeakText,
  onStopSpeaking,
  isSpeaking,
  onStartVoiceInput,
  onStopVoiceInput,
  isListening,
  voiceTranscript,
  onOpenCamera,
  onOpenFarmerMode,
  onOpenDataStore,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text:
        currentLanguage === 'hi'
          ? 'नमस्ते! May I help you? 🙏 मैं पैकवाइज़ वाणी AI वॉइस कॉपायलट हूँ। मुझसे खाद्य पैकेजिंग, तापमान, शेल्फ-लाइफ, FSSAI नियमों, या मंडी बचत के बारे में पूछें या बोलें।'
          : currentLanguage === 'mr'
          ? 'नमस्कार! May I help you? 🙏 मी पॅकवाईज वाणी AI कॉपायलट आहे. मला अन्न पॅकेजिंग, शेल्फ-लाइफ, FSSAI नियम किंवा नफ्याबद्दल विचारा.'
          : 'Hello and welcome! May I help you today? 🙏 I am PackWise Vaani AI Voice Copilot. Ask me anything about Indian food packaging science, MAP gases, shelf-life, and FSSAI regulations.',
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.95);
  const [isScrolledUp, setIsScrolledUp] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Smooth scroll container to bottom when messages change or thinking updates
  useEffect(() => {
    if (!isScrolledUp && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isThinking, isScrolledUp]);

  // Sync welcome message if language changes and conversation is at beginning
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === '1') {
        return [
          {
            id: '1',
            sender: 'ai',
            text:
              currentLanguage === 'hi'
                ? 'नमस्ते! May I help you? 🙏 मैं पैकवाइज़ वाणी AI वॉइस कॉपायलट हूँ। मुझसे खाद्य पैकेजिंग, तापमान, शेल्फ-लाइफ, FSSAI नियमों, या मंडी बचत के बारे में पूछें या बोलें।'
                : currentLanguage === 'mr'
                ? 'नमस्कार! May I help you? 🙏 मी पॅकवाईज वाणी AI कॉपायलट आहे. मला अन्न पॅकेजिंग, शेल्फ-लाइफ, FSSAI नियम किंवा नफ्याबद्दल विचारा.'
                : 'Hello and welcome! May I help you today? 🙏 I am PackWise Vaani AI Voice Copilot. Ask me anything about Indian food packaging science, MAP gases, shelf-life, and FSSAI regulations.',
          },
        ];
      }
      return prev;
    });
  }, [currentLanguage]);

  // When voice transcript becomes final or arrives
  useEffect(() => {
    if (voiceTranscript && !isListening) {
      handleSend(voiceTranscript);
    }
  }, [voiceTranscript, isListening]);

  // Lock body scroll when modal is open to prevent page bounce
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle user scroll in chat container to allow reading history without aggressive auto-scrolling
  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 60;
    setIsScrolledUp(!isNearBottom);
  };

  const scrollToBottom = () => {
    setIsScrolledUp(false);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputValue || '').trim();
    if (!query || isThinking) return;

    const userMsg: Message = { id: String(Date.now()), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);
    setIsScrolledUp(false);

    try {
      // Check for voice command actions
      const lower = query.toLowerCase();
      let matchedAction: 'camera' | 'farmer' | 'datastore' | undefined;
      if (lower.includes('camera') || lower.includes('कैमरा') || lower.includes('स्कैन')) {
        matchedAction = 'camera';
      } else if (lower.includes('farmer') || lower.includes('किसान') || lower.includes('सरल')) {
        matchedAction = 'farmer';
      } else if (lower.includes('data') || lower.includes('store') || lower.includes('इतिहास') || lower.includes('स्टोर')) {
        matchedAction = 'datastore';
      }

      // Try Gemini AI (with verified 3.5 Flash Lite) or local knowledge base
      const advice = await generateFoodPackagingAdviceAsync(query, currentLanguage);
      const reply = advice.replyText;

      setIsThinking(false);
      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: reply,
        actionType: matchedAction,
        actionPrompt: matchedAction === 'camera' ? 'कैमरा स्कैनर खोलें (Open Camera)' : matchedAction === 'farmer' ? 'किसान मोड में जाएं' : matchedAction === 'datastore' ? 'डेटा स्टोर देखें' : undefined
      };
      setMessages((prev) => [...prev, aiMsg]);
      onSpeakText(reply);
    } catch (e) {
      console.warn('Voice copilot query error:', e);
      setIsThinking(false);
      const fallbackMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: 'माफ़ कीजिए, जानकारी प्राप्त करने में त्रुटि हुई। कृपया पुनः प्रयास करें।',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: String(Date.now()),
        sender: 'ai',
        text: 'चैट रीसेट कर दी गई है। आप नया सवाल पूछ सकते हैं।',
      },
    ]);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Only early return AFTER all hooks have executed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl glass-card border border-cyan-500/40 p-4 sm:p-6 shadow-2xl flex flex-col h-[88vh] max-h-[620px] min-h-[360px] bg-slate-950/95 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-cyan-400 to-emerald-400 p-[1.5px]">
              <div className="w-full h-full bg-[#070B14] rounded-[9px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-['Outfit'] flex items-center gap-2">
                <span>{currentLanguage === 'en' ? 'PackWise Vaani AI Voice Copilot' : 'पैकवाइज़ वाणी AI वॉइस कॉपायलट'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  GEMINI 3.5 FLASH
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {currentLanguage === 'en'
                  ? 'Indian Agri-produce, Smart Packaging & Shelf Life Scientific Assistant'
                  : 'भारतीय कृषि उत्पाद, खाद्य पैकेजिंग व शेल्फ लाइफ वैज्ञानिक सहायक'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              title={currentLanguage === 'en' ? 'Reset Chat' : 'चैट रीसेट करें'}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggested Quick Question Chips with Greeting & Help */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 border-b border-white/5 text-[11px] shrink-0 scrollbar-none">
          <span className="text-slate-500 shrink-0 font-medium">
            {currentLanguage === 'en' ? 'Suggested queries:' : 'सुझाए गए बोलें/पूछें:'}
          </span>
          {(currentLanguage === 'en'
            ? [
                '👋 Hello! May I help you?',
                '⚠️ Why is newspaper packaging banned?',
                '🍅 Best packaging for tomato to keep 20 days fresh?',
                '🧀 Vacuum packaging shelf-life of paneer?',
                '💰 How much profit gained on 10 quintals?',
                '🏛️ FSSAI 2018 Packaging Regulations summary',
                '📸 Open live camera scanner',
              ]
            : [
                '👋 Hello! May I help you?',
                'नमस्ते! आप क्या सहायता कर सकते हैं?',
                '⚠️ अखबार में खाना क्यों बैन है?',
                '🍅 टमाटर को 20 दिन ताजा रखने की थैली?',
                '🧀 पनीर की वैक्यूम पैकेजिंग व शेल्फ-लाइफ',
                '💰 10 क्विंटल पर कितना मुनाफा बढ़ेगा?',
                '🏛️ FSSAI 2018 पैकेजिंग नियम',
                '📸 कैमरा खोलो',
              ]
          ).map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              disabled={isThinking}
              className={`px-2.5 py-1 rounded-lg text-slate-300 hover:text-white border whitespace-nowrap transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                q.includes('Hello') || q.includes('नमस्ते')
                  ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : q.includes('banned') || q.includes('बैन')
                  ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border-white/10'
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Audio Wave Visualizer Banner when Speaking or Listening */}
        {(isSpeaking || isListening) && (
          <div className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-amber-950/60 border border-cyan-500/30 flex items-center justify-between my-2 shrink-0 animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full ${
                      isListening ? 'bg-rose-400' : 'bg-cyan-400'
                    } animate-pulse`}
                    style={{
                      height: `${10 + Math.sin(i * 1.5) * 8}px`,
                      animationDelay: `${i * 120}ms`,
                    }}
                  />
                ))}
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">
                {isListening ? 'आपकी आवाज सुनी जा रही है (Listening...)' : 'वाणी बोल रही है (Speaking Advice...)'}
              </span>
            </div>

            <button
              onClick={isSpeaking ? onStopSpeaking : onStopVoiceInput}
              className="text-[11px] font-bold text-amber-300 hover:underline flex items-center gap-1"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>रुकें (Stop)</span>
            </button>
          </div>
        )}

        {/* Chat Messages Body with robust container-level scrolling */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="relative flex-1 min-h-0 overflow-y-auto py-3 space-y-3.5 pr-2 overscroll-contain select-text"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 text-xs sm:text-sm ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-cyan-300" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-medium'
                    : 'bg-slate-900 border border-white/10 text-slate-100'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {/* Optional Action Button Trigger inside Chat */}
                {m.actionType && (
                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center gap-2">
                    {m.actionType === 'camera' && onOpenCamera && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCamera();
                        }}
                        className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>कैमरा स्कैनर खोलें (Open Camera)</span>
                      </button>
                    )}
                    {m.actionType === 'farmer' && onOpenFarmerMode && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenFarmerMode();
                        }}
                        className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Wheat className="w-3.5 h-3.5" />
                        <span>किसान मोड में देखें (Farmer Mode)</span>
                      </button>
                    )}
                    {m.actionType === 'datastore' && onOpenDataStore && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenDataStore();
                        }}
                        className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>डेटा स्टोर देखें (View Data Store)</span>
                      </button>
                    )}
                  </div>
                )}

                {m.sender === 'ai' && (
                  <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-[10px]">PACKWISE VAANI • ICAR/CFTRI CERTIFIED</span>
                    <button
                      onClick={() => (isSpeaking ? onStopSpeaking() : onSpeakText(m.text))}
                      className="text-cyan-300 flex items-center gap-1 hover:underline font-bold"
                    >
                      {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      <span>{isSpeaking ? 'म्यूट' : 'सुनें (Listen)'}</span>
                    </button>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-amber-300" />
                </div>
              )}
            </div>
          ))}

          {/* Gemini AI Thinking Indicator */}
          {isThinking && (
            <div className="flex gap-3 text-xs justify-start">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-cyan-300 animate-pulse" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-cyan-500/30 text-cyan-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-[11px] ml-1 text-slate-400">
                  {currentLanguage === 'en' ? 'Gemini 3.5 AI analyzing...' : 'Gemini 3.5 AI विश्लेषण कर रहा है...'}
                </span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />

          {/* Jump to bottom button when scrolled up */}
          {isScrolledUp && (
            <div className="sticky bottom-2 flex justify-center pointer-events-none">
              <button
                onClick={scrollToBottom}
                className="pointer-events-auto px-3 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/40 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>{currentLanguage === 'en' ? '↓ Jump to Latest' : '↓ नए संदेश पर जाएं'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Voice Input Active Telemetry */}
        {isListening && (
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs text-rose-300 flex items-center justify-between mb-2 shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>
                {currentLanguage === 'en' ? 'Listening: ' : 'सुन रहे हैं: '}
                &quot;{voiceTranscript || (currentLanguage === 'en' ? 'Please speak...' : 'कृपया बोलें...')}&quot;
              </span>
            </span>
            <button onClick={onStopVoiceInput} className="text-[11px] font-bold text-white hover:underline cursor-pointer">
              {currentLanguage === 'en' ? 'Done' : 'हो गया (Done)'}
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="pt-3 border-t border-white/10 flex items-center gap-2 shrink-0">
          <button
            onClick={isListening ? onStopVoiceInput : onStartVoiceInput}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10'
            }`}
            title={isListening ? (currentLanguage === 'en' ? 'Stop mic' : 'माइक बंद करें') : (currentLanguage === 'en' ? 'Speak with mic' : 'माइक से बोलें')}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            placeholder={
              currentLanguage === 'en'
                ? 'Ask about packaging, storage temperature, shelf-life or produce...'
                : 'पैकेजिंग, तापमान, शेल्फ-लाइफ या फसल के बारे में पूछें...'
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isThinking}
            className="flex-1 p-2.5 rounded-xl text-xs glass-input text-white placeholder-slate-500 disabled:opacity-60 bg-white/5 border border-white/10 focus:outline-none focus:border-cyan-400"
          />

          <button
            onClick={() => handleSend()}
            disabled={isThinking || !inputValue.trim()}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
