import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Box,
  Cpu,
  BarChart3,
  ShieldCheck,
  Leaf,
  Scale,
  Menu,
  X,
  Bell,
  Sliders,
  Film,
  Compass,
  Globe,
  Mic,
  TrendingUp,
  Truck,
  Camera,
  Database,
  Calculator,
  Building2,
  Wheat,
  Zap,
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../i18n/translations';
import { AI_MODELS, AiModelId } from '../types/aiModel';

export type UserRole = 'farmer' | 'food_dept' | 'pro';

interface NavbarProps {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDashboard: () => void;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenVoiceCopilot: () => void;
  onOpenScanCamera?: () => void;
  onOpenDataStore?: () => void;
  onOpen3dOpening?: () => void;
  isVoiceActive?: boolean;
  activeModelId?: AiModelId;
  onModelChange?: (model: AiModelId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  setActiveRole,
  activeTab,
  setActiveTab,
  onOpenDashboard,
  currentLanguage = 'hi',
  onLanguageChange,
  onOpenVoiceCopilot,
  onOpenScanCamera,
  onOpenDataStore,
  onOpen3dOpening,
  isVoiceActive = false,
  activeModelId = 'yolov8n',
  onModelChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.hi;

  const proNavLinks = [
    { id: 'home', label: t.home, icon: Sparkles },
    { id: 'calculator', label: t.calculator, icon: Calculator },
    { id: 'recommend', label: t.aiRecommend, icon: Cpu },
    { id: 'lab3d', label: t.lab3d, icon: Box },
    { id: 'materials', label: t.materials, icon: Layers },
    { id: 'shelflife', label: t.shelfLife, icon: BarChart3 },
    { id: 'coldchain', label: t.coldChain, icon: Truck },
    { id: 'roi', label: t.roiCalc, icon: TrendingUp },
    { id: 'compliance', label: t.compliance, icon: ShieldCheck },
  ];

  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/95 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo */}
          <div
            onClick={() => {
              setActiveRole('pro');
              setActiveTab('home');
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-cyan-400 p-[1.5px] shadow-lg shadow-amber-500/20 group-hover:shadow-cyan-500/30 transition-all duration-300">
              <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:text-cyan-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="2 2" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                  <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-wider text-white font-['Outfit']">
                  पैकवाइज़ <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 bg-clip-text text-transparent">PackWise AI</span>
                </span>
              </div>
              <p className="text-[10px] text-amber-200/90 hidden md:block tracking-wide font-medium">
                अन्न रक्षा • Smart Packaging Engine
              </p>
            </div>
          </div>

          {/* 3-Role Persona Switcher Pill (Center) */}
          <div className="hidden lg:flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
            <button
              onClick={() => setActiveRole('farmer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeRole === 'farmer'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Wheat className="w-3.5 h-3.5" />
              <span>{t.roleFarmer}</span>
            </button>

            <button
              onClick={() => setActiveRole('food_dept')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeRole === 'food_dept'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.roleFoodDept}</span>
            </button>

            <button
              onClick={() => setActiveRole('pro')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeRole === 'pro'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t.rolePro}</span>
            </button>
          </div>

          {/* Pro Mode Sub-Links (shown only if role === 'pro' on large screens) */}
          {activeRole === 'pro' && (
            <nav className="hidden 2xl:flex items-center gap-1">
              {proNavLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-2 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-3 h-3 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* AI Model Selector Dropdown */}
            {onModelChange && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowModelMenu(!showModelMenu);
                    setShowLangMenu(false);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 transition-colors flex items-center gap-1.5"
                  title="Choose Active AI Model"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono hidden sm:inline">
                    {AI_MODELS.find((m) => m.id === activeModelId)?.badge || 'YOLOv8n'}
                  </span>
                </button>

                {showModelMenu && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-card border border-cyan-500/30 p-2 shadow-2xl z-50 animate-in fade-in duration-150 bg-slate-950">
                    <div className="text-[10px] font-mono text-cyan-400 px-2 py-1 uppercase border-b border-white/10 mb-1 flex items-center justify-between">
                      <span>Select AI Model</span>
                      <span className="text-amber-400">ACTIVE</span>
                    </div>
                    {AI_MODELS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          onModelChange(m.id);
                          setShowModelMenu(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left transition-all mb-1 ${
                          activeModelId === m.id
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span>{m.icon} {m.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-emerald-400">
                            {m.speed}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block line-clamp-1">
                          {m.descriptionHi}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangMenu(!showLangMenu);
                  setShowModelMenu(false);
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors flex items-center gap-1.5"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentLangMeta.nativeName}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl glass-card border border-white/15 p-1.5 shadow-2xl z-50 animate-in fade-in duration-150 bg-slate-900">
                  <div className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase border-b border-white/10 mb-1">
                    Select Indian Language
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between text-left transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Assistant Trigger Button */}
            <button
              onClick={onOpenVoiceCopilot}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                isVoiceActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-amber-400 border-amber-500/30'
              }`}
              title="Open PackWise Vaani Voice AI"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">वाणी AI</span>
              {isVoiceActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
              )}
            </button>

            {/* Live Camera Scanner Trigger Button - tablet/desktop */}
            {onOpenScanCamera && (
              <button
                onClick={onOpenScanCamera}
                className="hidden md:flex px-2.5 py-1.5 rounded-lg text-xs font-semibold items-center gap-1.5 transition-all bg-gradient-to-r from-cyan-500/20 to-teal-500/20 hover:from-cyan-500/30 hover:to-teal-500/30 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                title="AI Live Camera Crop Scanner"
              >
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden lg:inline">{currentLanguage === 'hi' ? 'कैमरा स्कैन' : 'Camera Scan'}</span>
              </button>
            )}

            {/* Data Store Trigger Button */}
            {onOpenDataStore && (
              <button
                onClick={onOpenDataStore}
                className="hidden xl:flex px-2 py-1.5 rounded-lg text-xs font-semibold items-center gap-1 transition-all bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30"
                title="Data Store"
              >
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentLanguage === 'hi' ? 'डेटा स्टोर' : 'Data Store'}</span>
              </button>
            )}

            {/* 3D Opening Replay Trigger Button - tablet/desktop */}
            {onOpen3dOpening && (
              <button
                onClick={onOpen3dOpening}
                className="hidden md:flex px-2.5 py-1.5 rounded-lg text-xs font-black transition-all bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20 items-center gap-1.5"
                title="3D Opening / Cinematic Intro"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span className="hidden lg:inline">{t.replay3dBtn}</span>
              </button>
            )}

            {/* Futuristic Dashboard Button */}
            <button
              onClick={onOpenDashboard}
              className="hidden sm:flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white shadow-md shadow-cyan-500/20 transition-all items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t.dashboard}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 lg:hidden border border-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070B14]/98 border-b border-white/15 px-4 pt-3 pb-6 space-y-4 backdrop-blur-2xl">
          {/* Mobile 3-Role Switcher */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              {t.personaLabel}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setActiveRole('farmer');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-black flex flex-col items-center justify-center gap-1 border transition-all ${
                  activeRole === 'farmer'
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-white/5 text-slate-300 border-white/10'
                }`}
              >
                <Wheat className="w-4 h-4" />
                <span>{t.roleFarmer}</span>
              </button>

              <button
                onClick={() => {
                  setActiveRole('food_dept');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-black flex flex-col items-center justify-center gap-1 border transition-all ${
                  activeRole === 'food_dept'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                    : 'bg-white/5 text-slate-300 border-white/10'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{t.roleFoodDept}</span>
              </button>

              <button
                onClick={() => {
                  setActiveRole('pro');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-xs font-black flex flex-col items-center justify-center gap-1 border transition-all ${
                  activeRole === 'pro'
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                    : 'bg-white/5 text-slate-300 border-white/10'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{t.rolePro}</span>
              </button>
            </div>
          </div>

          {/* Mobile Language Selector Ribbon */}
          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block flex items-center justify-between">
              <span>🌐 {currentLanguage === 'hi' ? 'भाषा चुनें (Select Language)' : 'Select Language'}</span>
              <span className="text-amber-400 font-mono text-[9px]">8 INDIAN LANGUAGES</span>
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                  }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                    currentLanguage === lang.code
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black border-yellow-200 shadow-md shadow-amber-500/30'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <span className="block truncate">{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile AI Model Switcher */}
          {onModelChange && (
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block flex items-center justify-between">
                <span>⚡ {t.activeAiModelLabel}</span>
                <span className="text-cyan-400 font-mono text-[9px]">{AI_MODELS.find((m) => m.id === activeModelId)?.badge}</span>
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {AI_MODELS.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      onModelChange(model.id);
                    }}
                    className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeModelId === model.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                        : 'bg-white/5 text-slate-300 border-white/10'
                    }`}
                  >
                    <span className="text-base shrink-0">{model.icon}</span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold block truncate">{model.name}</span>
                      <span className="text-[9px] font-mono text-slate-400 block">{model.speed}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions in Mobile Drawer */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            {onOpen3dOpening && (
              <button
                onClick={() => {
                  onOpen3dOpening();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-emerald-500/20 text-amber-300 border border-amber-500/40 text-xs font-black flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.replay3dBtn}</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              {onOpenScanCamera && (
                <button
                  onClick={() => {
                    onOpenScanCamera();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>{currentLanguage === 'hi' ? 'कैमरा स्कैन' : 'Camera Scan'}</span>
                </button>
              )}

              <button
                onClick={() => {
                  onOpenDashboard();
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 rounded-xl bg-white/10 text-white border border-white/15 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>{t.dashboard}</span>
              </button>
            </div>
          </div>

          {/* Pro links in mobile if role === pro */}
          {activeRole === 'pro' && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              {proNavLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 text-left ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 font-bold'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
