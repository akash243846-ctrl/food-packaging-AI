import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PackagingLab3D } from './components/PackagingLab3D';
import { AiRecommendationWizard } from './components/AiRecommendationWizard';
import { RecommendationResult } from './components/RecommendationResult';
import { BarrierAnalytics } from './components/BarrierAnalytics';
import { MapSimulator } from './components/MapSimulator';
import { ShelfLifePredictor } from './components/ShelfLifePredictor';
import { CommodityDatabase } from './components/CommodityDatabase';
import { MaterialLibrary } from './components/MaterialLibrary';
import { ComplianceChecker } from './components/ComplianceChecker';
import { CostOptimizer } from './components/CostOptimizer';
import { SustainabilityScore } from './components/SustainabilityScore';
import { FarmerSimpleMode } from './components/FarmerSimpleMode';
import { LiveCropScannerModal } from './components/LiveCropScannerModal';
import { DataStoreModal } from './components/DataStoreModal';
import { TraceabilityReport } from './components/TraceabilityReport';
import { FuturisticDashboard } from './components/FuturisticDashboard';
import { ColdChainTracker } from './components/ColdChainTracker';
import { RoiCalculator } from './components/RoiCalculator';
import { FoodPackagingCalculator } from './components/FoodPackagingCalculator';
import { FoodDepartmentPortal } from './components/FoodDepartmentPortal';
import { VoiceAssistantBar } from './components/VoiceAssistantBar';
import { AiVoiceCopilotModal } from './components/AiVoiceCopilotModal';
import { Opening3DExperience } from './components/Opening3DExperience';
import { Footer } from './components/Footer';
import { RecommendationResultData } from './types/packaging';
import { runPackagingRecommendation } from './utils/recommendationEngine';
import { SupportedLanguage, TRANSLATIONS } from './i18n/translations';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';
import { UserRole } from './components/Navbar';
import { AI_MODELS, AiModelId } from './types/aiModel';
import { ArrowRight, Sparkles, Box, Wheat, ShieldCheck, Truck, TrendingUp, Calculator, Building2, Zap, Cpu } from 'lucide-react';

export function App() {
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    try {
      const savedRole = localStorage.getItem('packwise_role') as UserRole;
      if (savedRole && ['farmer', 'food_dept', 'pro'].includes(savedRole)) {
        return savedRole;
      }
    } catch {
      // ignore
    }
    return 'farmer'; // Default to Farmer / Easy visual mode so uneducated users aren't overwhelmed!
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isVoiceCopilotOpen, setIsVoiceCopilotOpen] = useState<boolean>(false);
  const [isCameraScannerOpen, setIsCameraScannerOpen] = useState<boolean>(false);
  const [isDataStoreOpen, setIsDataStoreOpen] = useState<boolean>(false);
  const [is3dOpeningOpen, setIs3dOpeningOpen] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('packwise_3d_seen') !== 'true';
    } catch {
      return true;
    }
  });

  const [activeModelId, setActiveModelId] = useState<AiModelId>(() => {
    try {
      const saved = localStorage.getItem('packwise_ai_model') as AiModelId;
      if (saved && ['yolov8n', 'yolov8x_agri', 'gemini_flash', 'physics_topsis', 'fssai_rules'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'yolov8n';
  });

  const handleModelChange = (model: AiModelId) => {
    setActiveModelId(model);
    try {
      localStorage.setItem('packwise_ai_model', model);
    } catch {
      // ignore
    }
  };

  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('packwise_lang') as SupportedLanguage;
      if (saved && ['en', 'hi', 'mr', 'ta', 'te', 'gu', 'bn', 'pa'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'hi';
  });

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('packwise_lang', lang);
    } catch {
      // ignore
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    try {
      localStorage.setItem('packwise_role', role);
    } catch {
      // ignore
    }
  };

  const handle3dOpeningClose = (selected?: UserRole, model?: AiModelId) => {
    setIs3dOpeningOpen(false);
    try {
      sessionStorage.setItem('packwise_3d_seen', 'true');
    } catch {
      // ignore
    }
    if (model) {
      handleModelChange(model);
    }
    if (selected) {
      handleRoleChange(selected);
      if (selected === 'farmer') {
        speakText(
          currentLanguage === 'hi'
            ? 'नमस्ते किसान भाई! पैकवाइज़ 3D में आपका स्वागत है। अपनी फसल चुनें और सही थैली का सुझाव पाएं।'
            : 'Welcome to PackWise AI Farmer Mode. Select your crop for instant packaging guidance.'
        );
      } else if (selected === 'food_dept') {
        speakText(
          currentLanguage === 'hi'
            ? 'FSSAI खाद्य सुरक्षा एवं राजपत्र अनुपालन पोर्टल में आपका स्वागत है।'
            : 'Welcome to FSSAI Food Safety and Regulatory Compliance Portal.'
        );
      } else {
        speakText(
          currentLanguage === 'hi'
            ? 'पैकवाइज़ प्रो प्रयोगशाला व सिमुलेटर में आपका स्वागत है।'
            : 'Welcome to PackWise AI Pro Laboratory & Decision Engine.'
        );
      }
    }
  };

  // Initialize with Organic Tomato recommendation
  const [recommendationResult, setRecommendationResult] = useState<RecommendationResultData>(() =>
    runPackagingRecommendation({
      foodId: 'tomato',
      moisture: 'High',
      waterActivity: 0.96,
      fatOilPercent: 0.2,
      ph: 4.3,
      respirationRate: 'Moderate',
      ethyleneSensitivity: 'Medium',
      oxygenSensitivity: 'Medium',
      lightSensitivity: 'Medium',
      desiredShelfLifeDays: 14,
      storageCondition: 'Chilled',
      storageTempC: 12,
      relativeHumidityPercent: 90,
      region: 'West India',
      transportType: 'Standard Truck',
      transportDurationHours: 24,
      distanceKm: 400,
      vibrationLevel: 'Medium',
      priority: 'map',
    })
  );

  // Voice Assistant Hook
  const {
    isSpeaking,
    isListening,
    transcript,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    speakGreeting,
  } = useVoiceAssistant({
    currentLanguage,
    onCommandRecognized: (command) => {
      if (command === 'greeting') {
        speakGreeting();
        setIsVoiceCopilotOpen(true);
      } else if (command.startsWith('lang:')) {
        const targetLang = command.split(':')[1] as SupportedLanguage;
        handleLanguageChange(targetLang);
        speakText(
          targetLang === 'hi'
            ? 'भाषा बदलकर हिंदी कर दी गई है।'
            : targetLang === 'mr'
            ? 'भाषा बदलून मराठी करण्यात आली आहे.'
            : 'Language changed successfully.'
        );
      } else if (command === 'camera') {
        setIsCameraScannerOpen(true);
      } else if (command === 'datastore') {
        setIsDataStoreOpen(true);
      } else if (command === 'voiceCopilot') {
        setIsVoiceCopilotOpen(true);
      } else if (command === 'farmerMode') {
        handleRoleChange('farmer');
      } else if (command === 'foodDept') {
        handleRoleChange('food_dept');
      } else if (command === 'calculator') {
        handleRoleChange('pro');
        setActiveTab('calculator');
      } else if (command === 'pro') {
        handleRoleChange('pro');
        setActiveTab('home');
      } else {
        handleRoleChange('pro');
        setActiveTab(command);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });

  const handleRecommendationGenerated = (result: RecommendationResultData) => {
    setRecommendationResult(result);
    setActiveRole('pro');
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Speak out dynamic tailored advice using actual product shelf-life
    const shelfDays = result.food.maxShelfLifePackagedDays || result.shelfLifeGainDays || 14;
    const speechMsg =
      currentLanguage === 'hi'
        ? `${result.food.name} के लिए ${result.material.name} सुझाई गई है। AI अनुकूलता स्कोर ${result.compatibilityScore} प्रतिशत है, जिससे ताज़गी ${shelfDays} दिन तक सुरक्षित रहेगी।`
        : `PackWise AI recommends ${result.material.name} for ${result.food.name} with ${result.compatibilityScore}% compatibility, extending shelf life to ${shelfDays} days.`;
    speakText(speechMsg);
  };

  const handleSpeakCurrentAdvice = () => {
    const shelfDays = recommendationResult.food.maxShelfLifePackagedDays || recommendationResult.shelfLifeGainDays || 14;
    const text =
      currentLanguage === 'hi'
        ? `${recommendationResult.food.name} के लिए अनुशंसित पैकेजिंग: ${recommendationResult.material.name}। कारण: ${recommendationResult.whyThisPackage} अनुमानित ताज़गी: ${shelfDays} दिन।`
        : `Recommended packaging for ${recommendationResult.food.name} is ${recommendationResult.material.name}. ${recommendationResult.whyThisPackage} Projected shelf life is ${shelfDays} days.`;
    speakText(text);
  };

  const handleLiveCropDetected = (cropName: string, hindiName: string, _category: string) => {
    const lower = cropName.toLowerCase();
    const id = lower.includes('tomato')
      ? 'tomato'
      : lower.includes('onion')
      ? 'onion'
      : lower.includes('potato')
      ? 'potato'
      : lower.includes('rice')
      ? 'rice'
      : lower.includes('apple')
      ? 'apple'
      : lower.includes('banana')
      ? 'banana'
      : lower.includes('orange')
      ? 'orange'
      : lower.includes('broccoli')
      ? 'broccoli'
      : lower.includes('carrot')
      ? 'carrot'
      : lower.includes('paneer')
      ? 'paneer'
      : lower.includes('mango')
      ? 'mango'
      : 'tomato';

    const result = runPackagingRecommendation({
      foodId: id,
      moisture: id === 'rice' ? 'Low' : 'High',
      waterActivity: id === 'rice' ? 0.60 : 0.95,
      fatOilPercent: 0.5,
      ph: id === 'tomato' ? 4.3 : 5.0,
      respirationRate: (id === 'mango' || id === 'tomato') ? 'High' : 'Low',
      ethyleneSensitivity: id === 'mango' ? 'High' : 'Medium',
      oxygenSensitivity: 'Medium',
      lightSensitivity: 'Medium',
      desiredShelfLifeDays: id === 'rice' ? 365 : (id === 'potato' || id === 'onion') ? 45 : 18,
      storageCondition: (id === 'rice' || id === 'potato' || id === 'onion') ? 'Ambient' : 'Chilled',
      storageTempC: (id === 'rice' || id === 'potato' || id === 'onion') ? 24 : 12,
      relativeHumidityPercent: 80,
      region: 'West India',
      transportType: 'Standard Truck',
      transportDurationHours: 24,
      distanceKm: 500,
      vibrationLevel: 'Medium',
      priority: 'map',
    });

    setRecommendationResult(result);
    setIsCameraScannerOpen(false);
    setActiveRole('pro');
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const spokenMsg =
      currentLanguage === 'hi'
        ? `कैमरे ने ${hindiName} पहचाना! AI ने इसके लिए ${result.material.name} की सिफारिश तैयार की है।`
        : `Live Vision detected ${cropName}! PackWise AI recommended ${result.material.name}.`;
    speakText(spokenMsg);
  };

  const t = TRANSLATIONS[currentLanguage];

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveRole('pro');
          setActiveTab(tab);
        }}
        activeRole={activeRole}
        setActiveRole={handleRoleChange}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenVoiceCopilot={() => setIsVoiceCopilotOpen(true)}
        onOpenScanCamera={() => setIsCameraScannerOpen(true)}
        onOpenDataStore={() => setIsDataStoreOpen(true)}
        onOpen3dOpening={() => setIs3dOpeningOpen(true)}
        isVoiceActive={isSpeaking || isListening}
        activeModelId={activeModelId}
        onModelChange={handleModelChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 sm:pt-20">
        {/* Animated 3D Mode Selector Header Bar - Responsive on Mobile */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-2">
          <div className="p-2 sm:p-2.5 rounded-2xl glass-card border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shadow-xl">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 pl-2 hidden md:inline">
                {t.personaLabel}
              </span>
              <div className="grid grid-cols-3 sm:flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-black/40 border border-white/5 w-full sm:w-auto justify-center">
                <button
                  onClick={() => handleRoleChange('farmer')}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                    activeRole === 'farmer'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Wheat className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.roleFarmer}</span>
                </button>

                <button
                  onClick={() => handleRoleChange('food_dept')}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                    activeRole === 'food_dept'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.roleFoodDept}</span>
                </button>

                <button
                  onClick={() => {
                    handleRoleChange('pro');
                    setActiveTab('home');
                  }}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-black transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                    activeRole === 'pro'
                      ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md shadow-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.rolePro}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
              <div
                title="Active AI Model Engine"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-sm"
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse shrink-0" />
                <span className="text-[10px] text-slate-400">{t.activeAiModelLabel}</span>
                <span className="font-bold text-cyan-200">
                  {AI_MODELS.find((m) => m.id === activeModelId)?.badge || 'YOLOv8'}
                </span>
              </div>

              <button
                onClick={() => setIs3dOpeningOpen(true)}
                className="px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all transform hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow shrink-0" />
                <span>{t.replay3dBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ROLE 1: FARMER / SIMPLE VISUAL MODE (👨‍🌾 अशिक्षित / किसान - बिना तकनीकी शब्दों के, सिर्फ चित्र व आवाज़) */}
        {activeRole === 'farmer' && (
          <div className="pt-2">
            <FarmerSimpleMode
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
              onSpeakText={speakText}
              isSpeaking={isSpeaking}
              onStopSpeaking={stopSpeaking}
              onOpenDataStore={() => setIsDataStoreOpen(true)}
              onOpenScanCamera={() => setIsCameraScannerOpen(true)}
              onOpenCalculator={() => {
                handleRoleChange('pro');
                setActiveTab('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* ROLE 2: FOOD SAFETY DEPARTMENT / FSSAI PORTAL (🏛️ खाद्य सुरक्षा विभाग पोर्टल - IS मानक, बैन पैकेजिंग जांच व प्रमाण पत्र) */}
        {activeRole === 'food_dept' && (
          <div className="pt-2">
            <FoodDepartmentPortal
              currentLanguage={currentLanguage}
              onSpeakText={speakText}
              onStopSpeaking={stopSpeaking}
              isSpeaking={isSpeaking}
            />
          </div>
        )}

        {/* ROLE 3: PRO TECHNOLOGIST / ADVANCED TOOLS (⚡ प्रो टूल्स / वैज्ञानिक लैब व सिमुलेटर) */}
        {activeRole === 'pro' && (
          <>
            {/* HOME VIEW: Seamless immersive visual flow */}
            {activeTab === 'home' && (
              <div className="space-y-12 sm:space-y-16">
                {/* 1. Immersive Hero with Indian agricultural background */}
                <HeroSection
                  onStartRecommendation={() => {
                    setActiveTab('recommend');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onExplore3DLab={() => {
                    setActiveTab('lab3d');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenFarmerMode={() => {
                    handleRoleChange('farmer');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenScanCamera={() => {
                    setIsCameraScannerOpen(true);
                  }}
                  onOpenCalculator={() => {
                    setActiveTab('calculator');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpen3dOpening={() => setIs3dOpeningOpen(true)}
                  currentLanguage={currentLanguage}
                  onLanguageChange={handleLanguageChange}
                  activeModelId={activeModelId}
                  onModelChange={handleModelChange}
                />

                {/* 2. Food Packaging Savings, Spoilage & Profit Calculator */}
                <div className="pt-4">
                  <FoodPackagingCalculator
                    currentLanguage={currentLanguage}
                    onSpeakText={speakText}
                    onStopSpeaking={stopSpeaking}
                    isSpeaking={isSpeaking}
                  />
                </div>

                {/* 3. Interactive 3D Packaging Laboratory */}
                <div className="pt-4">
                  <PackagingLab3D />
                </div>

                {/* 4. Barrier Analytics (OTR / WVTR) */}
                <div className="pt-4">
                  <BarrierAnalytics />
                </div>

                {/* 5. Cold Chain Logistics Tracker & Spoilage Simulator */}
                <div className="pt-4">
                  <ColdChainTracker />
                </div>

                {/* 6. Modified Atmosphere Packaging (MAP) Simulator */}
                <div className="pt-4">
                  <MapSimulator />
                </div>

                {/* 7. Mandi APMC Spoilage & Packaging ROI Calculator */}
                <div className="pt-4">
                  <RoiCalculator />
                </div>

                {/* 7. Shelf-Life Freshness Timeline */}
                <div className="pt-4">
                  <ShelfLifePredictor />
                </div>

                {/* 8. Quick Launch Banner to Farmer Mode */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="p-5 sm:p-8 rounded-3xl glass-card-gold border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                        <Wheat className="w-4 h-4 text-amber-400" /> {t.farmerBannerCategory}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit']">
                        {t.farmerBannerTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                        {t.farmerBannerDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRoleChange('farmer')}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                    >
                      <span>{t.farmerBannerBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: FOOD PACKAGING PROFIT & SPOILAGE CALCULATOR */}
            {activeTab === 'calculator' && (
              <div className="pt-20">
                <FoodPackagingCalculator
                  currentLanguage={currentLanguage}
                  onSpeakText={speakText}
                  onStopSpeaking={stopSpeaking}
                  isSpeaking={isSpeaking}
                />
              </div>
            )}

            {/* TAB: AI RECOMMENDATION WIZARD */}
            {activeTab === 'recommend' && (
              <div className="pt-20">
                <AiRecommendationWizard onRecommendationGenerated={handleRecommendationGenerated} />
              </div>
            )}

            {/* TAB: AI RECOMMENDATION RESULT */}
            {activeTab === 'result' && (
              <div className="pt-20">
                <RecommendationResult
                  result={recommendationResult}
                  onOpenLab3D={() => {
                    setActiveTab('lab3d');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenShelfLife={() => {
                    setActiveTab('shelflife');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenCost={() => {
                    setActiveTab('cost');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenTraceability={() => {
                    setActiveTab('traceability');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onReset={() => {
                    setActiveTab('recommend');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            )}

            {/* TAB: 3D PACKAGING LAB */}
            {activeTab === 'lab3d' && (
              <div className="pt-20">
                <PackagingLab3D initialMaterialId={recommendationResult.material.id} />
              </div>
            )}

            {/* TAB: COMMODITY DATABASE */}
            {activeTab === 'database' && (
              <div className="pt-20">
                <CommodityDatabase />
              </div>
            )}

            {/* TAB: MATERIALS & COMPARISON */}
            {activeTab === 'materials' && (
              <div className="pt-20">
                <MaterialLibrary />
              </div>
            )}

            {/* TAB: COLD CHAIN LOGISTICS TRACKER */}
            {activeTab === 'coldchain' && (
              <div className="pt-20">
                <ColdChainTracker />
              </div>
            )}

            {/* TAB: MANDI SPOILAGE & ROI CALCULATOR */}
            {activeTab === 'roi' && (
              <div className="pt-20">
                <RoiCalculator />
              </div>
            )}

            {/* TAB: SHELF LIFE PREDICTOR */}
            {activeTab === 'shelflife' && (
              <div className="pt-20">
                <ShelfLifePredictor />
              </div>
            )}

            {/* TAB: MAP SIMULATOR */}
            {activeTab === 'map' && (
              <div className="pt-20">
                <MapSimulator />
              </div>
            )}

            {/* TAB: FSSAI & BIS COMPLIANCE */}
            {activeTab === 'compliance' && (
              <div className="pt-20">
                <ComplianceChecker />
              </div>
            )}

            {/* TAB: COST OPTIMIZER */}
            {activeTab === 'cost' && (
              <div className="pt-20">
                <CostOptimizer />
              </div>
            )}

            {/* TAB: SUSTAINABILITY */}
            {activeTab === 'sustainability' && (
              <div className="pt-20">
                <SustainabilityScore />
              </div>
            )}

            {/* TAB: TRACEABILITY & QR PASS */}
            {activeTab === 'traceability' && (
              <div className="pt-20">
                <TraceabilityReport result={recommendationResult} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Voice Assistant Bar HUD */}
      <VoiceAssistantBar
        currentLanguage={currentLanguage}
        isSpeaking={isSpeaking}
        isListening={isListening}
        transcript={transcript}
        onStartListening={startListening}
        onStopListening={stopListening}
        onSpeakCurrentAdvice={handleSpeakCurrentAdvice}
        onStopSpeaking={stopSpeaking}
        onOpenCopilot={() => setIsVoiceCopilotOpen(true)}
        onOpenScanCamera={() => setIsCameraScannerOpen(true)}
        onOpenDataStore={() => setIsDataStoreOpen(true)}
        onSpeakGreeting={speakGreeting}
      />

      {/* Full AI Voice Copilot Modal */}
      <AiVoiceCopilotModal
        isOpen={isVoiceCopilotOpen}
        onClose={() => setIsVoiceCopilotOpen(false)}
        currentLanguage={currentLanguage}
        onSpeakText={speakText}
        onStopSpeaking={stopSpeaking}
        isSpeaking={isSpeaking}
        onStartVoiceInput={startListening}
        onStopVoiceInput={stopListening}
        isListening={isListening}
        voiceTranscript={transcript}
        onOpenCamera={() => {
          setIsVoiceCopilotOpen(false);
          setTimeout(() => setIsCameraScannerOpen(true), 50);
        }}
        onOpenFarmerMode={() => {
          setIsVoiceCopilotOpen(false);
          handleRoleChange('farmer');
        }}
        onOpenDataStore={() => {
          setIsVoiceCopilotOpen(false);
          setIsDataStoreOpen(true);
        }}
      />

      {/* Futuristic Command Dashboard Modal */}
      <FuturisticDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentLanguage={currentLanguage}
        onSpeakText={speakText}
        onStopSpeaking={stopSpeaking}
        isSpeaking={isSpeaking}
        onOpenScanCamera={() => setIsCameraScannerOpen(true)}
      />

      {/* AI Live Camera Crop Scanner Modal */}
      <LiveCropScannerModal
        isOpen={isCameraScannerOpen}
        onClose={() => setIsCameraScannerOpen(false)}
        onCropDetected={handleLiveCropDetected}
        onOpenDataStore={() => setIsDataStoreOpen(true)}
        currentLanguage={currentLanguage}
      />

      {/* PackSmart Data Store & Scan History Modal */}
      <DataStoreModal
        isOpen={isDataStoreOpen}
        onClose={() => setIsDataStoreOpen(false)}
        onApplyCrop={handleLiveCropDetected}
        onSpeakText={speakText}
      />

      {/* 3D Cinematic Opening Experience */}
      <Opening3DExperience
        isOpen={is3dOpeningOpen}
        onClose={handle3dOpeningClose}
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        activeModelId={activeModelId}
        onModelChange={handleModelChange}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
