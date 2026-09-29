import React, { useState, useMemo } from 'react';
import {
  X,
  Cpu,
  Sparkles,
  Activity,
  Layers,
  BarChart3,
  Scale,
  Leaf,
  Compass,
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
  Thermometer,
  Droplets,
  Truck,
  ArrowRight,
  Calculator,
  Camera,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  YAxis,
} from 'recharts';
import { SupportedLanguage, TRANSLATIONS } from '../i18n/translations';

interface FuturisticDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  currentLanguage?: SupportedLanguage;
  onSpeakText?: (text: string) => void;
  onStopSpeaking?: () => void;
  isSpeaking?: boolean;
  onOpenScanCamera?: () => void;
}

interface CommodityTelemetry {
  id: string;
  emoji: string;
  nameHi: string;
  nameEn: string;
  compatibilityScore: number;
  freshnessDaysPackaged: number;
  freshnessDaysUnpackaged: number;
  filmNameHi: string;
  filmNameEn: string;
  filmThicknessMicrons: number;
  otrCc: number; // cc/m²/day
  wvtrG: number; // g/m²/day
  ecoScore: number;
  carbonReductionPct: number;
  unitCostInr: number;
  batchCost10kInr: number;
  gasO2Pct: number;
  gasCO2Pct: number;
  gasN2Pct: number;
  idealTempC: number;
  idealRhPct: number;
  fssaiStandard: string;
  costBreakdown: { name: string; cost: number }[];
  decayTrend: { day: number; packaged: number; unpackaged: number }[];
}

const DASHBOARD_COMMODITIES: CommodityTelemetry[] = [
  {
    id: 'tomato',
    emoji: '🍅',
    nameHi: 'हाइब्रिड टमाटर',
    nameEn: 'Hybrid Tomato',
    compatibilityScore: 96,
    freshnessDaysPackaged: 18,
    freshnessDaysUnpackaged: 4,
    filmNameHi: 'एंटी-फॉग सूक्ष्म-छिद्रित बीओपीपी फिल्म',
    filmNameEn: 'Anti-Fog Micro-Perforated BOPP Film',
    filmThicknessMicrons: 35,
    otrCc: 1850,
    wvtrG: 3.8,
    ecoScore: 92,
    carbonReductionPct: 44,
    unitCostInr: 1.45,
    batchCost10kInr: 14500,
    gasO2Pct: 5,
    gasCO2Pct: 4,
    gasN2Pct: 91,
    idealTempC: 12,
    idealRhPct: 90,
    fssaiStandard: 'IS 9845 / IS 10146',
    costBreakdown: [
      { name: 'Film', cost: 0.85 },
      { name: 'Barrier', cost: 0.32 },
      { name: 'Print', cost: 0.16 },
      { name: 'Seal', cost: 0.12 },
    ],
    decayTrend: [
      { day: 1, packaged: 99, unpackaged: 96 },
      { day: 4, packaged: 96, unpackaged: 65 },
      { day: 8, packaged: 92, unpackaged: 35 },
      { day: 12, packaged: 87, unpackaged: 10 },
      { day: 15, packaged: 78, unpackaged: 0 },
      { day: 18, packaged: 68, unpackaged: 0 },
    ],
  },
  {
    id: 'mango',
    emoji: '🥭',
    nameHi: 'हापुस आम (Alphonso)',
    nameEn: 'Alphonso Mango',
    compatibilityScore: 94,
    freshnessDaysPackaged: 21,
    freshnessDaysUnpackaged: 6,
    filmNameHi: 'एथिलीन अवशोषक युक्त एक्टिव MAP फिल्म',
    filmNameEn: 'Ethylene Scavenger Active MAP Pouch',
    filmThicknessMicrons: 45,
    otrCc: 2400,
    wvtrG: 5.2,
    ecoScore: 89,
    carbonReductionPct: 38,
    unitCostInr: 4.20,
    batchCost10kInr: 42000,
    gasO2Pct: 4,
    gasCO2Pct: 6,
    gasN2Pct: 90,
    idealTempC: 12,
    idealRhPct: 85,
    fssaiStandard: 'IS 10146 Food Grade',
    costBreakdown: [
      { name: 'Film', cost: 2.10 },
      { name: 'Barrier', cost: 1.20 },
      { name: 'Print', cost: 0.50 },
      { name: 'Seal', cost: 0.40 },
    ],
    decayTrend: [
      { day: 1, packaged: 98, unpackaged: 95 },
      { day: 5, packaged: 94, unpackaged: 70 },
      { day: 10, packaged: 90, unpackaged: 30 },
      { day: 15, packaged: 82, unpackaged: 5 },
      { day: 18, packaged: 75, unpackaged: 0 },
      { day: 21, packaged: 64, unpackaged: 0 },
    ],
  },
  {
    id: 'paneer',
    emoji: '🧀',
    nameHi: 'ताजा मलाई पनीर',
    nameEn: 'Fresh Malai Paneer',
    compatibilityScore: 98,
    freshnessDaysPackaged: 25,
    freshnessDaysUnpackaged: 3,
    filmNameHi: 'हाई-बैरियर 7-लेयर EVOH वैक्यूम पाउच',
    filmNameEn: 'High-Barrier 7-Layer EVOH Vacuum Pouch',
    filmThicknessMicrons: 75,
    otrCc: 0.8,
    wvtrG: 1.2,
    ecoScore: 85,
    carbonReductionPct: 32,
    unitCostInr: 5.50,
    batchCost10kInr: 55000,
    gasO2Pct: 0,
    gasCO2Pct: 30,
    gasN2Pct: 70,
    idealTempC: 3,
    idealRhPct: 95,
    fssaiStandard: 'IS 9845 Dairy Migration',
    costBreakdown: [
      { name: 'Film', cost: 2.80 },
      { name: 'Barrier', cost: 1.80 },
      { name: 'Print', cost: 0.50 },
      { name: 'Seal', cost: 0.40 },
    ],
    decayTrend: [
      { day: 1, packaged: 100, unpackaged: 92 },
      { day: 3, packaged: 98, unpackaged: 40 },
      { day: 7, packaged: 95, unpackaged: 0 },
      { day: 14, packaged: 90, unpackaged: 0 },
      { day: 20, packaged: 82, unpackaged: 0 },
      { day: 25, packaged: 70, unpackaged: 0 },
    ],
  },
  {
    id: 'apple',
    emoji: '🍎',
    nameHi: 'कश्मीरी सेब',
    nameEn: 'Kashmiri Apple',
    compatibilityScore: 95,
    freshnessDaysPackaged: 60,
    freshnessDaysUnpackaged: 14,
    filmNameHi: 'मोल्डेड पल्प ट्रे + एलडीपीई छिद्रित फिल्म',
    filmNameEn: 'Molded Pulp Tray + Micro-vent LDPE Film',
    filmThicknessMicrons: 40,
    otrCc: 1200,
    wvtrG: 4.1,
    ecoScore: 94,
    carbonReductionPct: 52,
    unitCostInr: 2.80,
    batchCost10kInr: 28000,
    gasO2Pct: 2,
    gasCO2Pct: 3,
    gasN2Pct: 95,
    idealTempC: 2,
    idealRhPct: 90,
    fssaiStandard: 'IS 9845 / IS 10146',
    costBreakdown: [
      { name: 'Film', cost: 1.40 },
      { name: 'Barrier', cost: 0.70 },
      { name: 'Print', cost: 0.40 },
      { name: 'Seal', cost: 0.30 },
    ],
    decayTrend: [
      { day: 1, packaged: 99, unpackaged: 95 },
      { day: 14, packaged: 96, unpackaged: 60 },
      { day: 28, packaged: 92, unpackaged: 20 },
      { day: 42, packaged: 85, unpackaged: 0 },
      { day: 50, packaged: 78, unpackaged: 0 },
      { day: 60, packaged: 69, unpackaged: 0 },
    ],
  },
  {
    id: 'potato',
    emoji: '🥔',
    nameHi: 'आलू (Potato)',
    nameEn: 'Potato',
    compatibilityScore: 93,
    freshnessDaysPackaged: 75,
    freshnessDaysUnpackaged: 25,
    filmNameHi: 'हवादार लेनो मेश जालीदार बोरी',
    filmNameEn: 'Ventilated Leno Mesh Sacks',
    filmThicknessMicrons: 55,
    otrCc: 8500,
    wvtrG: 45.0,
    ecoScore: 96,
    carbonReductionPct: 60,
    unitCostInr: 0.85,
    batchCost10kInr: 8500,
    gasO2Pct: 15,
    gasCO2Pct: 0,
    gasN2Pct: 85,
    idealTempC: 18,
    idealRhPct: 80,
    fssaiStandard: 'IS 16187 Leno Grade',
    costBreakdown: [
      { name: 'Mesh', cost: 0.55 },
      { name: 'UV Coat', cost: 0.15 },
      { name: 'Print', cost: 0.10 },
      { name: 'Thread', cost: 0.05 },
    ],
    decayTrend: [
      { day: 1, packaged: 99, unpackaged: 95 },
      { day: 15, packaged: 97, unpackaged: 80 },
      { day: 30, packaged: 93, unpackaged: 55 },
      { day: 45, packaged: 88, unpackaged: 30 },
      { day: 60, packaged: 82, unpackaged: 10 },
      { day: 75, packaged: 72, unpackaged: 0 },
    ],
  },
  {
    id: 'rice',
    emoji: '🌾',
    nameHi: 'बासमती चावल',
    nameEn: 'Basmati Rice',
    compatibilityScore: 97,
    freshnessDaysPackaged: 365,
    freshnessDaysUnpackaged: 90,
    filmNameHi: 'बीओपीपी लैमिनेटेड वूवन बैग + नाइट्रोजन फ्लश',
    filmNameEn: 'BOPP Laminated Woven Sack + N₂ Flush',
    filmThicknessMicrons: 70,
    otrCc: 15.0,
    wvtrG: 0.5,
    ecoScore: 91,
    carbonReductionPct: 40,
    unitCostInr: 1.80,
    batchCost10kInr: 18000,
    gasO2Pct: 0.2,
    gasCO2Pct: 0,
    gasN2Pct: 99.8,
    idealTempC: 24,
    idealRhPct: 60,
    fssaiStandard: 'IS 14887 Food Grain Packaging',
    costBreakdown: [
      { name: 'Fabric', cost: 0.90 },
      { name: 'BOPP', cost: 0.50 },
      { name: 'Print', cost: 0.25 },
      { name: 'Stitch', cost: 0.15 },
    ],
    decayTrend: [
      { day: 1, packaged: 100, unpackaged: 98 },
      { day: 60, packaged: 99, unpackaged: 85 },
      { day: 120, packaged: 97, unpackaged: 65 },
      { day: 180, packaged: 95, unpackaged: 45 },
      { day: 270, packaged: 92, unpackaged: 20 },
      { day: 365, packaged: 88, unpackaged: 0 },
    ],
  },
];

export const FuturisticDashboard: React.FC<FuturisticDashboardProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  currentLanguage = 'hi',
  onSpeakText,
  onStopSpeaking,
  isSpeaking = false,
  onOpenScanCamera,
}) => {
  const [selectedProduceId, setSelectedProduceId] = useState<string>('tomato');
  const [simTemp, setSimTemp] = useState<number>(12);
  const [simRh, setSimRh] = useState<number>(85);
  const [simDistance, setSimDistance] = useState<number>(400);

  // Active translations
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.hi;

  const currentCommodity = useMemo(() => {
    return DASHBOARD_COMMODITIES.find((c) => c.id === selectedProduceId) || DASHBOARD_COMMODITIES[0];
  }, [selectedProduceId]);

  if (!isOpen) return null;

  // Temperature stress calculation
  const tempDiff = Math.abs(simTemp - currentCommodity.idealTempC);
  const tempStressPenalty = tempDiff > 8 ? Math.round(tempDiff * 0.8) : 0;
  const simulatedFreshDays = Math.max(currentCommodity.freshnessDaysPackaged - tempStressPenalty, 4);

  // Read Telemetry Aloud
  const handleSpeakTelemetry = () => {
    if (isSpeaking && onStopSpeaking) {
      onStopSpeaking();
      return;
    }
    if (!onSpeakText) return;

    const cropName = currentLanguage === 'en' ? currentCommodity.nameEn : currentCommodity.nameHi;
    const filmName = currentLanguage === 'en' ? currentCommodity.filmNameEn : currentCommodity.filmNameHi;

    let text = '';
    if (currentLanguage === 'en') {
      text = `PackWise AI Command Center Telemetry for ${cropName}: AI Compatibility Match is ${currentCommodity.compatibilityScore} percent. Projected shelf life is ${simulatedFreshDays} days with smart packaging compared to ${currentCommodity.freshnessDaysUnpackaged} days unpackaged. Packaging unit cost is ₹${currentCommodity.unitCostInr} per pack. Recommended barrier is ${filmName}, maintaining ${currentCommodity.gasO2Pct}% Oxygen and ${currentCommodity.gasCO2Pct}% Carbon Dioxide atmosphere. Certified under ${currentCommodity.fssaiStandard}.`;
    } else {
      text = `पैकवाइज AI कमांड सेंटर टेलीमेट्री: ${cropName} के लिए AI अनुकूलता स्कोर ${currentCommodity.compatibilityScore} प्रतिशत है। सुझाई गई पैकेजिंग से ताज़गी ${simulatedFreshDays} दिन सुरक्षित रहेगी, जबकि बिना पैकेजिंग केवल ${currentCommodity.freshnessDaysUnpackaged} दिन रहती। प्रति पैकेट पैकेजिंग खर्च मात्र ₹${currentCommodity.unitCostInr} है। सुझाई गई फिल्म ${filmName} है, जो ${currentCommodity.gasO2Pct} प्रतिशत ऑक्सीजन और ${currentCommodity.gasCO2Pct} प्रतिशत कार्बन डाइऑक्साइड वातावरण बनाती है। यह ${currentCommodity.fssaiStandard} मानक अनुसार प्रमाणित है।`;
    }

    onSpeakText(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#040711]/95 backdrop-blur-2xl p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Command Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-cyan-400 to-teal-400 p-[1.5px] shadow-lg shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-[#070B14] rounded-[14px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit'] tracking-wider">
                  {t.dashboardTitle}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  LIVE AI TELEMETRY v2.5
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t.dashboardSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Audio Briefing Button */}
            <button
              onClick={handleSpeakTelemetry}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md shadow-amber-500/25 hover:opacity-90 transition-all flex items-center gap-1.5"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? t.stopSpeakingBtn : t.listenTelemetry}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Commodity Selector Bar */}
        <div className="p-3 sm:p-4 rounded-2xl glass-card border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.selectCommodity}</span>
            </span>
            <span className="text-[11px] text-slate-400">
              {currentLanguage === 'en' ? 'Click produce to update live telemetry' : 'लाइव टेलीमेट्री बदलने के लिए फसल चुनें'}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {DASHBOARD_COMMODITIES.map((c) => {
              const isSelected = c.id === selectedProduceId;
              const name = currentLanguage === 'en' ? c.nameEn : c.nameHi;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedProduceId(c.id);
                    setSimTemp(c.idealTempC);
                    setSimRh(c.idealRhPct);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <span className="text-base">{c.emoji}</span>
                  <span>{name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dashboard 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column Telemetry Cards (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Compatibility Card */}
            <div className="p-5 rounded-3xl glass-card border border-cyan-500/40 shadow-xl bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  {t.aiCompatibility}
                </span>
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white font-mono">
                  {currentCommodity.compatibilityScore}%
                </span>
                <span className="text-xs text-emerald-400 font-bold">{t.optimal}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                {currentLanguage === 'en'
                  ? `Matched with ${currentCommodity.filmThicknessMicrons}µm barrier tailored for respiration.`
                  : `${currentCommodity.filmThicknessMicrons} माइक्रोन अवरोधक के साथ संतुलित अनुकूलन।`}
              </p>
              <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-cyan-300/80 border-t border-white/10">
                <span>OTR: {currentCommodity.otrCc} cc</span>
                <span>WVTR: {currentCommodity.wvtrG} g</span>
              </div>
            </div>

            {/* Freshness Window & Trend */}
            <div className="p-5 rounded-3xl glass-card border border-amber-500/40 shadow-xl bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  {t.freshnessWindow}
                </span>
                <BarChart3 className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-amber-300 font-mono">
                  {simulatedFreshDays}
                </span>
                <span className="text-sm font-bold text-slate-300">{t.daysUnit}</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  (+{Math.round(((simulatedFreshDays - currentCommodity.freshnessDaysUnpackaged) / currentCommodity.freshnessDaysUnpackaged) * 100)}%)
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                {currentLanguage === 'en'
                  ? `vs ${currentCommodity.freshnessDaysUnpackaged} days in traditional open packing`
                  : `पारंपरिक खुले भंडारण में केवल ${currentCommodity.freshnessDaysUnpackaged} दिन`}
              </p>
              <div className="h-16 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentCommodity.decayTrend}>
                    <defs>
                      <linearGradient id="colorPack" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Area type="monotone" dataKey="packaged" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorPack)" />
                    <Area type="monotone" dataKey="unpackaged" stroke="#EF4444" strokeWidth={1} strokeDasharray="3 3" fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Packaging Unit Cost Card */}
            <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  {t.packagingCost}
                </span>
                <Scale className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white font-mono">
                  ₹{currentCommodity.unitCostInr.toFixed(2)}
                </span>
                <span className="text-xs text-slate-400 font-sans">{t.perPack}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                ₹{currentCommodity.batchCost10kInr.toLocaleString('en-IN')} / 10,000 यूनिट बैच लागत
              </p>
              {/* Cost breakdown mini bar chart */}
              <div className="h-12 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentCommodity.costBreakdown} layout="horizontal">
                    <XAxis dataKey="name" stroke="#64748B" fontSize={9} tickLine={false} />
                    <Bar dataKey="cost" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Center Column: Interactive Visual Core & Climate Simulation (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-between space-y-5">
            {/* Visual Core Orb */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center select-none">
              {/* Golden & Cyan Rotating Rings */}
              <div className="absolute inset-0 rounded-full border border-amber-500/25 animate-spin-slow" />
              <div className="absolute inset-3 rounded-full border border-dashed border-cyan-500/30 animate-spin" />
              <div className="absolute inset-6 rounded-full border border-amber-400/40" />

              {/* Produce Center Showcase */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 flex flex-col items-center justify-center shadow-2xl shadow-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#070B14] to-slate-950 border-2 border-cyan-500/30">
                <span className="text-6xl sm:text-7xl mb-1 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  {currentCommodity.emoji}
                </span>
                <span className="text-sm font-black text-white font-['Outfit']">
                  {currentLanguage === 'en' ? currentCommodity.nameEn : currentCommodity.nameHi}
                </span>
                <span className="text-[10px] font-mono text-cyan-300">
                  {currentCommodity.fssaiStandard}
                </span>

                {/* Holographic Scan Beam */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
                </div>
              </div>

              {/* HUD Orbit Badges */}
              <div className="absolute top-2 left-2 bg-black/85 px-3 py-1.5 rounded-xl border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-lg">
                OTR: {currentCommodity.otrCc} cc
              </div>
              <div className="absolute bottom-2 right-2 bg-black/85 px-3 py-1.5 rounded-xl border border-amber-500/40 text-[10px] font-mono text-amber-300 shadow-lg">
                WVTR: {currentCommodity.wvtrG} g
              </div>
              <div className="absolute top-2 right-2 bg-black/85 px-3 py-1.5 rounded-xl border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-lg">
                Eco: {currentCommodity.ecoScore}/100
              </div>
            </div>

            {/* Interactive Climate & Transit Simulator */}
            <div className="w-full p-4 sm:p-5 rounded-3xl glass-card border border-white/10 space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>लाइव जलवायु व तापमान सिमुलेशन (Climate Simulator)</span>
                </span>
                <button
                  onClick={() => {
                    setSimTemp(currentCommodity.idealTempC);
                    setSimRh(currentCommodity.idealRhPct);
                    setSimDistance(400);
                  }}
                  className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> रीसेट
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Temp Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.storageTemp}:</span>
                    </span>
                    <span className={`font-mono font-bold ${tempDiff > 8 ? 'text-rose-400' : 'text-amber-300'}`}>
                      {simTemp}°C (आदर्श: {currentCommodity.idealTempC}°C)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="42"
                    value={simTemp}
                    onChange={(e) => setSimTemp(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                {/* Humidity Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{t.relativeHumidity}:</span>
                    </span>
                    <span className="font-mono font-bold text-cyan-300">
                      {simRh}% RH
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="98"
                    value={simRh}
                    onChange={(e) => setSimRh(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>

              {tempDiff > 8 && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>
                    उच्च तापमान चेतावनी: शेल्फ लाइफ {tempStressPenalty} दिन घट गई है। कृपया रीफर कोल्ड वैन का उपयोग करें।
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column Telemetry Cards (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Sustainability Eco Score Card */}
            <div className="p-5 rounded-3xl glass-card border border-emerald-500/40 shadow-xl bg-gradient-to-br from-emerald-950/20 via-slate-900 to-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                  {t.ecoScoreRating}
                </span>
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-emerald-300 font-mono">
                  {currentCommodity.ecoScore}
                </span>
                <span className="text-xs text-slate-400 font-sans">/ 100</span>
              </div>
              <p className="text-[11px] text-slate-300">
                100% रीसाइक्लेबल मोनो-पॉलिमर संरचना, -{currentCommodity.carbonReductionPct}% कार्बन फुटप्रिंट कटौती।
              </p>
            </div>

            {/* MAP Gas Ratio Card */}
            <div className="p-5 rounded-3xl glass-card border border-sky-500/40 shadow-xl bg-gradient-to-br from-sky-950/20 via-slate-900 to-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">
                  {t.atmosphereBalance}
                </span>
                <Compass className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-sm font-bold font-mono text-white flex items-center justify-between pt-1">
                <span className="text-cyan-400">{currentCommodity.gasO2Pct}% O₂</span>
                <span className="text-emerald-400">{currentCommodity.gasCO2Pct}% CO₂</span>
                <span className="text-slate-400">{currentCommodity.gasN2Pct}% N₂</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex mt-2 p-0.5">
                <div
                  className="bg-cyan-400 h-full rounded-l-full transition-all"
                  style={{ width: `${Math.max(currentCommodity.gasO2Pct, 3)}%` }}
                  title={`O2: ${currentCommodity.gasO2Pct}%`}
                />
                <div
                  className="bg-emerald-400 h-full transition-all"
                  style={{ width: `${Math.max(currentCommodity.gasCO2Pct, 3)}%` }}
                  title={`CO2: ${currentCommodity.gasCO2Pct}%`}
                />
                <div
                  className="bg-slate-500 h-full rounded-r-full transition-all"
                  style={{ width: `${currentCommodity.gasN2Pct}%` }}
                  title={`N2: ${currentCommodity.gasN2Pct}%`}
                />
              </div>
              <p className="text-[10px] text-slate-400">
                श्वसन दर अनुसार संतुलित संशोधित वायुमंडलीय गैस मिश्रण
              </p>
            </div>

            {/* Material Specification */}
            <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                  {t.recommendedFilm}
                </span>
                <Layers className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-sm font-black text-white leading-snug">
                {currentLanguage === 'en' ? currentCommodity.filmNameEn : currentCommodity.filmNameHi}
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/10">
                <span>मोटाई: <strong className="text-white font-mono">{currentCommodity.filmThicknessMicrons} µm</strong></span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {t.fssaiVerified}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick Navigation Links */}
        <div className="p-4 sm:p-5 rounded-2xl glass-card border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <span className="text-slate-400 font-mono font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t.telemetryShortcuts}</span>
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {/* Direct Link to Updated Calculator */}
            <button
              onClick={() => {
                onNavigateTab('calculator');
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold hover:opacity-95 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>💰 {t.calculator} (ROI)</span>
            </button>

            {/* Direct Link to AI Recommendation Wizard */}
            <button
              onClick={() => {
                onNavigateTab('recommend');
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold flex items-center gap-1.5 transition-all"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>🧠 AI सिफारिश विज़ार्ड</span>
            </button>

            {/* Direct Link to 3D Packaging Lab */}
            <button
              onClick={() => {
                onNavigateTab('lab3d');
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 font-medium transition-all"
            >
              🧪 3D पैकेजिंग लैब
            </button>

            {/* Direct Link to Cold Chain */}
            <button
              onClick={() => {
                onNavigateTab('coldchain');
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 font-medium transition-all"
            >
              ❄️ कोल्ड चेन ट्रैकर
            </button>

            {/* Camera Scanner Trigger */}
            {onOpenScanCamera && (
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => onOpenScanCamera(), 50);
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5 transition-all"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>📸 फसल कैमरा स्कैन</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
