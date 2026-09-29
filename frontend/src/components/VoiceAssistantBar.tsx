import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, X, MessageSquare, ChevronUp, ChevronDown, Camera, Database } from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../i18n/translations';

interface VoiceAssistantBarProps {
  currentLanguage: SupportedLanguage;
  isSpeaking: boolean;
  isListening: boolean;
  transcript: string;
  onStartListening: () => void;
  onStopListening: () => void;
  onSpeakCurrentAdvice: () => void;
  onStopSpeaking: () => void;
  onOpenCopilot: () => void;
  onOpenScanCamera?: () => void;
  onOpenDataStore?: () => void;
  onSpeakGreeting?: () => void;
}

export const VoiceAssistantBar: React.FC<VoiceAssistantBarProps> = ({
  currentLanguage,
  isSpeaking,
  isListening,
  transcript,
  onStartListening,
  onStopListening,
  onSpeakCurrentAdvice,
  onStopSpeaking,
  onOpenCopilot,
  onOpenScanCamera,
  onOpenDataStore,
  onSpeakGreeting,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const t = TRANSLATIONS[currentLanguage];

  const greetingButtonText =
    currentLanguage === 'hi'
      ? '👋 नमस्ते! May I help you?'
      : currentLanguage === 'mr'
      ? '👋 नमस्कार! May I help you?'
      : '👋 Hello! May I help you?';

  return (
    <aside
      aria-label={t.voiceAssistant}
      className="fixed bottom-4 right-4 z-40 max-w-sm sm:max-w-md w-full px-2 pointer-events-auto"
    >
      <div className="rounded-2xl glass-card border border-cyan-500/40 shadow-2xl p-3 sm:p-4 bg-slate-950/95 backdrop-blur-xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-[#070B14] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                {t.voiceAssistant}
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h4>
              <p className="text-[10px] text-slate-400">
                {isListening ? t.listening : isSpeaking ? 'Speaking advice...' : t.tapToSpeak}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {onOpenScanCamera && (
              <button
                onClick={onOpenScanCamera}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-400 border border-white/10 transition-colors"
                title="कैमरा स्कैनर खोलें (Open Camera Scanner)"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            )}
            {onOpenDataStore && (
              <button
                onClick={onOpenDataStore}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/10 transition-colors"
                title="डेटा स्टोर खोलें (Open Data Store)"
              >
                <Database className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onOpenCopilot}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 transition-colors"
              title="Open Full Voice Copilot"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-white/10 space-y-3">
            {/* Audio Waveform Animation when active */}
            {(isSpeaking || isListening) && (
              <div className="flex items-center justify-center gap-1 py-1 h-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full animate-pulse ${
                      isSpeaking ? 'bg-cyan-400' : 'bg-amber-400'
                    }`}
                    style={{
                      height: `${30 + (i % 5) * 15}%`,
                      animationDuration: `${0.4 + (i % 3) * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Transcript Banner */}
            {transcript && (
              <div className="p-2 rounded-xl bg-black/50 border border-cyan-500/30 text-xs text-cyan-200 font-mono animate-in fade-in">
                "{transcript}"
              </div>
            )}

            {/* PROMINENT GREETING & MAY I HELP YOU BUTTON */}
            {onSpeakGreeting && (
              <button
                onClick={onSpeakGreeting}
                className="w-full py-2 px-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-amber-500/20 hover:from-emerald-500/30 hover:to-amber-500/30 border border-cyan-400/40 text-cyan-200 flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <span>{greetingButtonText}</span>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            )}

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-2">
              {/* Voice Input Mic Button */}
              <button
                onClick={isListening ? onStopListening : onStartListening}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                    : 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/20 hover:opacity-95'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isListening ? 'Stop Mic' : 'Voice Command'}</span>
              </button>

              {/* Read Aloud Button */}
              <button
                onClick={isSpeaking ? onStopSpeaking : onSpeakCurrentAdvice}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                  isSpeaking
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-white/5 hover:bg-white/10 text-cyan-300 border-cyan-500/30'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Mute Speech' : t.speakAdvice}</span>
              </button>
            </div>

            {/* Quick Voice Command Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-[10px] text-slate-400 scrollbar-none">
              <span className="text-slate-500 shrink-0">बोलें:</span>
              <button
                onClick={() => {
                  if (onSpeakGreeting) onSpeakGreeting();
                }}
                className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/5 shrink-0"
              >
                "Hello / Namaste"
              </button>
              <button
                onClick={onOpenCopilot}
                className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 border border-white/5 shrink-0"
              >
                "टमाटर की थैली"
              </button>
              <button
                onClick={onOpenCopilot}
                className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 border border-white/5 shrink-0"
              >
                "FSSAI नियम"
              </button>
              <button
                onClick={onOpenCopilot}
                className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-rose-300 border border-white/5 shrink-0"
              >
                "अखबार बैन क्यों है?"
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
