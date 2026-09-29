import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  FileText,
  Printer,
  Share2,
  Volume2,
  VolumeX,
  Search,
  Building2,
  Stamp,
  QrCode,
  Flame,
  Award,
  BookOpen,
  Info,
  X,
  Check,
  Scale,
  BadgeAlert,
  Wine,
  Biohazard,
  Sparkles,
  Wheat,
  FlaskConical,
  Filter,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../i18n/translations';
import {
  ALCOHOLIC_BEVERAGES_STANDARDS,
  METAL_CONTAMINANTS_STANDARDS,
  CROP_CONTAMINANTS_STANDARDS,
  NATURAL_TOXINS_STANDARDS,
  FOOD_FORTIFICATION_STANDARDS,
  BOTANICAL_NUTRACEUTICALS,
  KEY_INS_ADDITIVES,
  APPROVED_PROBIOTICS,
  APPROVED_PREBIOTICS,
} from '../data/fssaiRegulationsData';

interface FoodDepartmentPortalProps {
  currentLanguage?: SupportedLanguage;
  onSpeakText?: (text: string) => void;
  onStopSpeaking?: () => void;
  isSpeaking?: boolean;
}

interface PackagingMaterialAudit {
  id: string;
  nameHi: string;
  nameEn: string;
  category: 'banned' | 'approved' | 'restricted';
  statusBadge: string;
  standard: string;
  fssaiRule: string;
  penaltyFine: string;
  healthHazardsHi: string;
  healthHazardsEn: string;
  recommendationHi: string;
  recommendationEn: string;
  migrationRateMgKg: number; // max allowed is 60 mg/kg
  isCompliant: boolean;
}

const PACKAGING_AUDIT_DATABASE: PackagingMaterialAudit[] = [
  {
    id: 'newspaper',
    nameHi: 'छपा हुआ रद्दी अखबार (Printed Newspaper)',
    nameEn: 'Printed Newspaper / Paper Scrap',
    category: 'banned',
    statusBadge: '🚫 सख्त कानूनी प्रतिबंध (STRICTLY ILLEGAL)',
    standard: 'FSSAI 2018 Sec 4(4) & IS 9845',
    fssaiRule: 'FSSAI (Packaging) Regulations 2018 धारा 4(4) के तहत अखबार में भोजन परोसना या पैक करना संज्ञेय अपराध है।',
    penaltyFine: '₹1,00,000 तक जुर्माना व FSSAI लाइसेंस निलंबन',
    healthHazardsHi: 'अखबार की स्याही में लेड (Lead), कैडमियम और सुगंधित हाइड्रोकार्बन (PAHs) होते हैं जो भोजन में रिसकर कैंसर, गुर्दे की विफलता और बच्चों में मानसिक विकास रोकते हैं।',
    healthHazardsEn: 'Printing ink contains lead, cadmium, toxic solvents & mineral oils which leach into food causing cancer, organ failure and neurological damage.',
    recommendationHi: 'तुरंत रोकें! इसके बजाय बटर पेपर, वर्जिन क्राफ्ट पेपर या फूड-ग्रेड पत्तल/ट्रे का उपयोग करें।',
    recommendationEn: 'Immediately cease use! Switch to virgin unprinted food parchment, butter paper, or food-grade leaf containers.',
    migrationRateMgKg: 340.0,
    isCompliant: false,
  },
  {
    id: 'recycled_polythene',
    nameHi: 'रीसाइकल्ड या रंगीन कचरा प्लास्टिक (Recycled Polythene)',
    nameEn: 'Recycled / Colored Plastic Carry Bags',
    category: 'banned',
    statusBadge: '🚫 कानूनी प्रतिबंध (BANNED FOR FOOD)',
    standard: 'IS 10146 & PWM Rules 2022',
    fssaiRule: 'प्लास्टिक अपशिष्ट प्रबंधन नियम 2022 व IS 10146 के अनुसार रीसाइकल्ड प्लास्टिक का सीधे भोजन संपर्क में उपयोग प्रतिबंधित है।',
    penaltyFine: '₹50,000 जुर्माना व जब्ती',
    healthHazardsHi: 'रीसाइक्लिंग के दौरान इस्तेमाल किए गए जहरीले रंग, डाइऑक्सिन और थैलेट्स भोजन में रिस जाते हैं जो हार्मोन्स असंतुलन और त्वचा रोग पैदा करते हैं।',
    healthHazardsEn: 'Toxic colorants, plasticizers, and persistent contaminants leach into food, disrupting endocrine systems.',
    recommendationHi: 'केवल वर्जिन खाद्य-ग्रेड पॉलिमर (IS 10146 / IS 10142) प्रमाणित पारदर्शी थैली का उपयोग करें।',
    recommendationEn: 'Use only certified food-contact virgin LDPE/PP compliant with IS 10146.',
    migrationRateMgKg: 195.0,
    isCompliant: false,
  },
  {
    id: 'stapler_pins',
    nameHi: 'स्टेपलर पिन व धातु के तार (Stapler Pins & Wire Clips)',
    nameEn: 'Stapler Pins on Food Packets / Sweet Boxes',
    category: 'banned',
    statusBadge: '🚫 एफएसएसएआई निषेध (PHYSICAL HAZARD)',
    standard: 'FSSAI Advisory 2019 / Section 16(5)',
    fssaiRule: 'मिठाई के डिब्बों या खाद्य थैलियों पर स्टेपलर पिन का उपयोग प्रतिबंधित है।',
    penaltyFine: '₹25,000 जुर्माना व एफएसएसएआई नोटिस',
    healthHazardsHi: 'पिन भोजन में गिरकर पेट में कट लगा सकती है, आंतों को फाड़ सकती है और गंभीर आंतरिक रक्तस्राव का कारण बन सकती है।',
    healthHazardsEn: 'Accidental ingestion causes severe internal gastrointestinal perforations and choking hazards.',
    recommendationHi: 'खाद्य-सुरक्षित चिपकने वाले टेप, सीलिंग या स्लीव लॉक का उपयोग करें।',
    recommendationEn: 'Use food-safe tamper seals, thermal heat sealing, or paper sleeve bands.',
    migrationRateMgKg: 0,
    isCompliant: false,
  },
  {
    id: 'bopp_antifog',
    nameHi: 'वर्जिन फूड-ग्रेड एंटी-फॉग बीओपीपी (Virgin Anti-Fog BOPP)',
    nameEn: 'Virgin Food-Grade Anti-Fog BOPP Pouch',
    category: 'approved',
    statusBadge: '✅ एफएसएसएआई प्रमाणित (CERTIFIED FOOD SAFE)',
    standard: 'IS 10142 & IS 9845 Approved',
    fssaiRule: '100% वर्जिन पॉलीप्रोपाइलीन, समग्र प्रवासन सीमा (OML < 60 mg/kg) परीक्षण में उत्तीर्ण।',
    penaltyFine: 'कोई जुर्माना नहीं - पूर्णतः वैध एवं अनुपालनित',
    healthHazardsHi: 'शून्य विषाक्तता। सूक्ष्म-छिद्रों से प्राकृतिक श्वसन होता है और पसीना नहीं जमता, जिससे बैक्टीरिया नहीं पनपते।',
    healthHazardsEn: 'Non-toxic, inert food contact barrier. Prevents moisture condensation and microbial spoilage.',
    recommendationHi: 'सब्जियों, फलों और बेकरी उत्पादों के लिए सर्वोत्तम और आधिकारिक रूप से अनुशंसित।',
    recommendationEn: 'Highly recommended for fresh fruits, vegetables, and bakery produce.',
    migrationRateMgKg: 14.5,
    isCompliant: true,
  },
  {
    id: 'evoh_vacuum',
    nameHi: '7-लेयर EVOH मल्टी-लेयर वैक्यूम फिल्म',
    nameEn: '7-Layer Coextruded EVOH Vacuum Barrier',
    category: 'approved',
    statusBadge: '✅ प्रीमियम डेयरी व मांस ग्रेड (A+ COMPLIANT)',
    standard: 'IS 9845 (Dairy & Fatty Food Simulant Test Passed)',
    fssaiRule: 'सॉल्वेंट-रहित लेमिनेशन, शून्य विलायक अवशेष (Zero Solvent Residue), डेयरी एवं प्रसंस्कृत खाद्य हेतु स्वीकृत।',
    penaltyFine: 'कोई जुर्माना नहीं - निर्यात ग्रेड मानक',
    healthHazardsHi: 'शून्य विषाक्तता। ऑक्सीजन अवरोधक होने से वसा का ऑक्सीकरण (सड़न) और दुर्गंध पूरी तरह रुकती है।',
    healthHazardsEn: 'Impermeable oxygen barrier prevents lipid peroxidation and aerobic microbial growth.',
    recommendationHi: 'पनीर, घी, सूखे मेवे, प्रसंस्कृत मीट और मसालों के लिए मानक पैकेजिंग।',
    recommendationEn: 'Standard packaging for dairy, cheese, paneer, nuts, and processed meat.',
    migrationRateMgKg: 8.2,
    isCompliant: true,
  },
  {
    id: 'leno_mesh',
    nameHi: 'आईएस 16187 हवादार लेनो मेश बोरी',
    nameEn: 'IS 16187 Ventilated Leno Mesh Sacks',
    category: 'approved',
    standard: 'BIS IS 16187 & Agmark Standard',
    statusBadge: '✅ बीआईएस मानक प्रमाणित (BIS CERTIFIED)',
    fssaiRule: 'कृषि उपज (आलू, प्याज, लहसुन, संतरा) के थोक परिवहन हेतु भारतीय मानक ब्यूरो द्वारा प्रमाणित।',
    penaltyFine: 'कोई जुर्माना नहीं - मंडी मानक अनुसार पूर्णतः मान्य',
    healthHazardsHi: 'शून्य विषाक्तता। वेंटिलेशन से फसल में सड़ांध और गर्मी नहीं बनती।',
    healthHazardsEn: 'Safe aeration prevents internal condensation, hot-spots, and fungal rot.',
    recommendationHi: 'मंडी में 25-50 किग्रा आलू, प्याज और साइट्रस फलों के परिवहन हेतु अनिवार्य।',
    recommendationEn: 'Mandatory standard for potato, onion, and citrus bulk transit.',
    migrationRateMgKg: 6.0,
    isCompliant: true,
  },
];

type PortalTab =
  | 'audit'
  | 'banned_list'
  | 'alcohol_standards'
  | 'contaminants_limits'
  | 'fortification_staples'
  | 'additives_registry'
  | 'calculator'
  | 'certificate';

export const FoodDepartmentPortal: React.FC<FoodDepartmentPortalProps> = ({
  currentLanguage = 'hi',
  onSpeakText,
  onStopSpeaking,
  isSpeaking = false,
}) => {
  const [activeTab, setActiveTab] = useState<PortalTab>('audit');
  const [selectedMaterial, setSelectedMaterial] = useState<PackagingMaterialAudit>(PACKAGING_AUDIT_DATABASE[0]);

  // Search queries for new tabs
  const [alcoholSearch, setAlcoholSearch] = useState<string>('');
  const [contaminantSearch, setContaminantSearch] = useState<string>('');
  const [additiveSearch, setAdditiveSearch] = useState<string>('');
  const [botanicalSearch, setBotanicalSearch] = useState<string>('');

  // Interactive Live Threshold Tester State
  const [testCategory, setTestCategory] = useState<'alcohol' | 'metal' | 'toxin' | 'fortification'>('metal');
  const [testParam, setTestParam] = useState<string>('Lead (Pb)');
  const [testFood, setTestFood] = useState<string>('Fruit and vegetable juice');
  const [testValue, setTestValue] = useState<string>('0.8');
  const [testResult, setTestResult] = useState<{
    status: 'pass' | 'fail';
    limit: string;
    measured: string;
    msg: string;
    ref: string;
  } | null>(null);

  // Certificate Generator Form State
  const [inspectorName, setInspectorName] = useState<string>('अमित कुमार (खाद्य सुरक्षा अधिकारी)');
  const [mandiStation, setMandiStation] = useState<string>('आजादपुर थोक फल एवं सब्जी मंडी, दिल्ली');
  const [consignmentProduce, setConsignmentProduce] = useState<string>('हाइब्रिड टमाटर (Hybrid Tomato)');
  const [batchLotNo, setBatchLotNo] = useState<string>(`LOT-FSSAI-${Math.floor(100000 + Math.random() * 900000)}`);
  const [consignmentQty, setConsignmentQty] = useState<number>(50); // quintals
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Quick Threshold Verification Runner
  const handleRunTest = () => {
    const val = parseFloat(testValue);
    if (isNaN(val)) return;

    if (testCategory === 'metal') {
      const match = METAL_CONTAMINANTS_STANDARDS.find(
        (m) => m.metal.toLowerCase().includes(testParam.toLowerCase()) && m.articleOfFood.toLowerCase().includes(testFood.toLowerCase())
      ) || METAL_CONTAMINANTS_STANDARDS[0];

      const limitNum = typeof match.ppmMax === 'number' ? match.ppmMax : 2.5;
      const isPass = val <= limitNum;

      const res = {
        status: (isPass ? 'pass' : 'fail') as 'pass' | 'fail',
        limit: `${match.ppmMax} ppm (mg/kg)`,
        measured: `${val} ppm`,
        msg: isPass
          ? `परीक्षण उत्तीर्ण: ${testParam} का स्तर FSSAI 2011 सीमा (${match.ppmMax} ppm) के सुरक्षित दायरे में है।`
          : `⚠️ मानक उल्लंघन (VIOLATION): ${testParam} का स्तर सीमा (${match.ppmMax} ppm) से अधिक है! बैच को धारा 38 के तहत सील करें।`,
        ref: 'FSSAI (Contaminants, Toxins and Residues) Regulations 2011, Table 2.1.1',
      };
      setTestResult(res);

      if (onSpeakText) {
        onSpeakText(res.msg);
      }
    } else if (testCategory === 'alcohol') {
      const isWine = testFood.includes('Wine');
      const limit = isWine ? 400 : 150; // mg/L methanol
      const isPass = val <= limit;
      const res = {
        status: (isPass ? 'pass' : 'fail') as 'pass' | 'fail',
        limit: `${limit} mg/L (Distillate/Wine limit)`,
        measured: `${val} mg/L`,
        msg: isPass
          ? `अल्कोहल परीक्षण उत्तीर्ण: मिथाइल अल्कोहल सीमा के भीतर है। पेय पीने योग्य है।`
          : `⚠️ ज़हरीली मिलावट का खतरा! मेथनॉल अनुमेय सीमा से अधिक है। अंधापन या मृत्यु का गंभीर जोखिम।`,
        ref: 'FSSAI (Alcoholic Beverages Standards) Regulations 2018, Table 1 & 2',
      };
      setTestResult(res);
      if (onSpeakText) onSpeakText(res.msg);
    } else {
      const isPass = val <= 30; // Aflatoxin 30 ug/kg
      const res = {
        status: (isPass ? 'pass' : 'fail') as 'pass' | 'fail',
        limit: '30 µg/kg (ppb)',
        measured: `${val} µg/kg`,
        msg: isPass ? `एफ्लाटॉक्सिन स्तर अनुमेय सीमा के भीतर है।` : `माइकोटॉक्सिन उल्लंघन! लिवर कैंसरकारी फफूंद विषाक्तता।`,
        ref: 'FSSAI 2011 Regulation 2.2.1 (Crop Contaminants)',
      };
      setTestResult(res);
      if (onSpeakText) onSpeakText(res.msg);
    }
  };

  // Speak Regulatory Briefing
  const handleSpeakGuidance = () => {
    if (isSpeaking && onStopSpeaking) {
      onStopSpeaking();
      return;
    }
    if (!onSpeakText) return;

    let speech = '';
    if (activeTab === 'alcohol_standards') {
      speech = `FSSAI अल्कोहलिक पेय नियम 2018: डिस्टिल्ड स्पिरिट्स, वाइन और बीयर के लिए विशिष्ट मानक। हर बोतल पर वैधानिक चेतावनी अनिवार्य है: मदिरापान स्वास्थ्य के लिए हानिकारक है, सुरक्षित रहें वाहन न चलाएं। न्यूनतम आकार 3 मिलीमीटर। 10 प्रतिशत से कम अल्कोहल वाले पेयों पर एक्सपायरी तारीख अनिवार्य है।`;
    } else if (activeTab === 'contaminants_limits') {
      speech = `FSSAI संदूषक, टॉक्सिन एवं अवशेष नियम 2011: खाद्य पदार्थों में लेड, कॉपर, आर्सेनिक, टिन और कैडमियम की अधिकतम सीमा निर्धारित है। बच्चों के शिशु आहार में लेड की सीमा 0.2 पीपीएम है। एफ्लाटॉक्सिन की सीमा 30 माइक्रोग्राम प्रति किलोग्राम है।`;
    } else if (activeTab === 'fortification_staples') {
      speech = `FSSAI सुदृढ़ीकृत खाद्य नियम 2018: पांच मुख्य खाद्य पदार्थों के लिए प्लस एफ लोगो अनिवार्य है: नमक, तेल, दूध, आटा और चावल। थैलेसीमिया के मरीजों के लिए विशेष चेतावनी अनिवार्य है।`;
    } else {
      speech = `खाद्य सुरक्षा विभाग (FSSAI) पैकेजिंग जांच: ${selectedMaterial.nameHi} की स्थिति है - ${selectedMaterial.isCompliant ? 'भोजन के लिए सुरक्षित एवं प्रमाणित' : 'सख्त गैरकानूनी एवं प्रतिबंधित'}। लागू कानून: ${selectedMaterial.standard}। स्वास्थ्य खतरा: ${selectedMaterial.healthHazardsHi} अनुशंसित सुझाव: ${selectedMaterial.recommendationHi}`;
    }

    onSpeakText(speech);
  };

  const isEn = currentLanguage === 'en';

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 text-left">
      {/* Header Banner */}
      <div className="mb-8 p-4 sm:p-7 rounded-3xl glass-card border border-emerald-500/40 shadow-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-500 p-[1.5px] shadow-lg shadow-emerald-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mb-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>
                {isEn
                  ? 'Food Safety & Standards Authority of India (FSSAI) • Official Gazette Portal'
                  : 'खाद्य सुरक्षा व मानक प्राधिकरण (FSSAI) • आधिकारिक राजपत्र एवं मानक पोर्टल'}
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
              {isEn ? 'FSSAI National Food Safety & Standards Database' : 'FSSAI राष्ट्रीय खाद्य सुरक्षा व मानक डेटाबेस'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {isEn
                ? 'Alcoholic Beverages 2018, Heavy Metals 2011, Fortification (+F) 2018, Botanicals & INS Additives'
                : 'अल्कोहलिक पेय 2018, भारी धातु व संदूषक 2011, सुदृढ़ीकरण (+F) 2018, न्यूट्रास्यूटिकल व INS योज्य निर्देशिका'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-start sm:justify-end flex-wrap">
          <button
            onClick={handleSpeakGuidance}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? (isEn ? 'Stop Speaking' : 'बोलना बंद करें') : (isEn ? '🔊 Listen Rules' : '🔊 नियम बोलकर सुनें')}</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className="w-full sm:w-auto px-4 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Stamp className="w-4 h-4" />
            <span>{isEn ? 'Inspection Certificate' : 'निरीक्षण पास प्रमाण-पत्र'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs - Comprehensive Regulatory Suite */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 overflow-x-auto scrollbar-thin">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Search className="w-4 h-4 text-emerald-400" />
          <span>{isEn ? '1. Material Safety Audit' : '१. सामग्री सुरक्षा ऑडिट'}</span>
        </button>

        <button
          onClick={() => setActiveTab('banned_list')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'banned_list'
              ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BadgeAlert className="w-4 h-4 text-rose-400" />
          <span>{isEn ? '2. Banned Red List' : '२. प्रतिबंधित रेड लिस्ट'}</span>
        </button>

        <button
          onClick={() => setActiveTab('alcohol_standards')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'alcohol_standards'
              ? 'bg-purple-500/25 text-purple-300 border border-purple-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Wine className="w-4 h-4 text-purple-400" />
          <span>{isEn ? '3. Alcoholic Beverages 2018' : '३. अल्कोहलिक पेय मानक 2018'}</span>
        </button>

        <button
          onClick={() => setActiveTab('contaminants_limits')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'contaminants_limits'
              ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Biohazard className="w-4 h-4 text-amber-400" />
          <span>{isEn ? '4. Heavy Metals 2011' : '४. भारी धातु व संदूषक 2011'}</span>
        </button>

        <button
          onClick={() => setActiveTab('fortification_staples')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'fortification_staples'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Wheat className="w-4 h-4 text-cyan-400" />
          <span>{isEn ? '5. +F Fortification & Botanicals' : '५. +F सुदृढ़ीकरण व औषधीय पौधे'}</span>
        </button>

        <button
          onClick={() => setActiveTab('additives_registry')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'additives_registry'
              ? 'bg-teal-500/25 text-teal-300 border border-teal-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-teal-400" />
          <span>{isEn ? '6. INS Additives & Sweeteners' : '६. INS योज्य व स्वीटनर'}</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'calculator'
              ? 'bg-yellow-500/25 text-yellow-300 border border-yellow-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Scale className="w-4 h-4 text-yellow-400" />
          <span>{isEn ? '7. Threshold Calculator' : '७. त्वरित सीमा जांच कैलकुलेटर'}</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'certificate'
              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>{isEn ? '8. Digital Certificate' : '८. डिजिटल प्रमाण-पत्र'}</span>
        </button>
      </div>

      {/* TAB 1: MATERIAL AUDIT ENGINE */}
      {activeTab === 'audit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 sm:p-5 rounded-3xl glass-card border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold uppercase text-slate-400 block tracking-wider">
                {isEn ? 'Select Packaging Material for Audit:' : 'निरीक्षण हेतु पैकेजिंग सामग्री चुनें (Select Material):'}
              </span>

              <div className="space-y-2">
                {PACKAGING_AUDIT_DATABASE.map((mat) => {
                  const isSelected = mat.id === selectedMaterial.id;
                  const isBanned = mat.category === 'banned';
                  return (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all border ${
                        isSelected
                          ? isBanned
                            ? 'bg-rose-950/40 border-rose-500 text-white shadow-lg shadow-rose-500/20'
                            : 'bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {isBanned ? (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          <span className="text-xs font-extrabold">{isEn ? mat.nameEn : mat.nameHi}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block pl-6">
                          {mat.standard}
                        </span>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                          isBanned
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {isBanned ? (isEn ? 'BANNED' : 'गैरकानूनी') : (isEn ? 'APPROVED' : 'प्रमाणित')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div
              className={`p-6 sm:p-7 rounded-3xl glass-card border shadow-2xl space-y-5 ${
                selectedMaterial.isCompliant
                  ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-950'
                  : 'border-rose-500/50 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-black mb-2 ${
                      selectedMaterial.isCompliant
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/50 animate-pulse'
                    }`}
                  >
                    {selectedMaterial.statusBadge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                    {isEn ? selectedMaterial.nameEn : selectedMaterial.nameHi}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">{isEn ? selectedMaterial.nameHi : selectedMaterial.nameEn}</span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {isEn ? 'Migration Limit (OML):' : 'प्रवासन सीमा (OML):'}
                  </span>
                  <span
                    className={`text-xl font-mono font-black ${
                      selectedMaterial.migrationRateMgKg <= 60 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {selectedMaterial.migrationRateMgKg} mg/kg
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    {isEn ? 'Max Safe Limit: 60 mg/kg' : 'मानक अधिकतम: 60 mg/kg'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase block">
                    {isEn ? 'Applicable FSSAI & IS Law Standards' : 'लागू कानूनी नियम व मानक (Applicable FSSAI & IS Law)'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold">
                    {selectedMaterial.fssaiRule}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                  <span className="text-xs font-mono text-rose-400 font-bold uppercase block flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    {isEn ? 'Health Hazards & Contamination Risk' : 'स्वास्थ्य जोखिम व रासायनिक संदूषण (Health Hazards)'}
                  </span>
                  <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                    {isEn ? selectedMaterial.healthHazardsEn : selectedMaterial.healthHazardsHi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {isEn ? 'Recommended Food-Grade Alternative' : 'अनुशंसित खाद्य-ग्रेड विकल्प (Recommendation)'}
                  </span>
                  <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-medium">
                    {isEn ? selectedMaterial.recommendationEn : selectedMaterial.recommendationHi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BANNED PACKAGING RED LIST */}
      {activeTab === 'banned_list' && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex items-center gap-3">
            <BadgeAlert className="w-6 h-6 text-rose-400 shrink-0" />
            <p className="text-xs sm:text-sm">
              {isEn
                ? 'Under FSSAI (Packaging) Regulations 2018, direct food contact with the following materials is a strictly punishable legal offense.'
                : 'एफएसएसएआई (FSSAI) पैकेजिंग विनियम 2018 के तहत निम्नलिखित सामग्रियों का प्रत्यक्ष खाद्य संपर्क में उपयोग दण्डनीय अपराध है।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGING_AUDIT_DATABASE.filter((m) => m.category === 'banned').map((banned) => (
              <div
                key={banned.id}
                className="p-6 rounded-3xl glass-card border border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-slate-950 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    BANNED ITEM
                  </span>
                  <span className="text-xs font-mono font-bold text-rose-400">{banned.penaltyFine}</span>
                </div>
                <h3 className="text-lg font-black text-white">{isEn ? banned.nameEn : banned.nameHi}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isEn ? banned.healthHazardsEn : banned.healthHazardsHi}
                </p>
                <div className="pt-2 border-t border-rose-500/20 text-xs text-emerald-300">
                  <strong>{isEn ? 'Approved Alternative:' : 'स्वीकृत विकल्प:'}</strong> {isEn ? banned.recommendationEn : banned.recommendationHi}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ALCOHOLIC BEVERAGES REGULATIONS 2018 */}
      {activeTab === 'alcohol_standards' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl glass-card border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 mb-1">
                <Wine className="w-3.5 h-3.5" /> FSSAI 2018 {isEn ? 'Gazette (Enforced 1st April 2019)' : 'राजपत्र (1st April 2019 से प्रवर्तित)'}
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white font-['Outfit']">
                {isEn ? 'Alcoholic Beverages Standards & Mandatory Labeling Regulations' : 'अल्कोहलिक पेय मानक एवं वैधानिक लेबलिंग नियम'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {isEn
                  ? 'Table-1 (Distilled Spirits), Table-2 (Wines), Table-3 (Beers & Draught Beers)'
                  : 'सारणी-1 (आसुत स्पिरिट्स), सारणी-2 (वाइन एवं किण्वित पेय), सारणी-3 (बीयर एवं ड्रॉट बीयर)'}
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={isEn ? 'Search beverage (e.g. Brandy, Rum, Beer)...' : 'पेय खोजें (e.g. Brandy, Rum, Beer)...'}
                value={alcoholSearch}
                onChange={(e) => setAlcoholSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-purple-500/30 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* Statutory Warning Box */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/50 text-center space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              {isEn
                ? 'Rule 5.12: Mandatory Statutory Health Warning on Label (Min 3mm height)'
                : 'नियम 5.12: लेबल पर अनिवार्य वैधानिक चेतावनी (न्यूनतम 3 मिलीमीटर आकार)'}
            </span>
            <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 text-amber-200 text-sm sm:text-base font-black tracking-wide">
              "CONSUMPTION OF ALCOHOL IS INJURIOUS TO HEALTH. BE SAFE-DONT DRINK AND DRIVE."
              <br />
              <span className="text-xs font-normal text-amber-300/80">"मदिरापान स्वास्थ्य के लिए हानिकारक है। सुरक्षित रहें - शराब पीकर गाड़ी न चलाएं।"</span>
            </div>
            <div className="text-[11px] text-slate-400 flex flex-wrap items-center justify-center gap-4 pt-1">
              <span>• <strong>{isEn ? 'Standard Drink:' : 'मानक पेय:'}</strong> 12.7 mL ethyl alcohol at 20°C</span>
              <span>• <strong>{isEn ? 'Allergen Declaration:' : 'एलर्जन घोषणा:'}</strong> Mandatory 'Contains sulfite' if SO₂ &gt; 10 mg/L</span>
              <span>• <strong>{isEn ? 'Expiry Date:' : 'एक्सपायरी:'}</strong> Mandatory for beverages with &lt;10% alcohol</span>
            </div>
          </div>

          {/* Table of Standards */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 glass-card">
            <table className="w-full min-w-[640px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-purple-950/50 border-b border-purple-500/30 text-purple-200 font-mono uppercase">
                  <th className="p-3.5">{isEn ? 'Beverage Name' : 'पेय का नाम (Beverage)'}</th>
                  <th className="p-3.5">{isEn ? 'Category' : 'श्रेणी'}</th>
                  <th className="p-3.5">{isEn ? 'Ethanol (%)' : 'इथाइल अल्कोहल (%)'}</th>
                  <th className="p-3.5">{isEn ? 'Max Methanol' : 'मेथनॉल अधिकतम'}</th>
                  <th className="p-3.5">{isEn ? 'Volatile Acids' : 'वाष्पशील अम्ल (g/100L)'}</th>
                  <th className="p-3.5">{isEn ? 'Heavy Metals (Pb/As/Cu)' : 'भारी धातु (Pb / As / Cu)'}</th>
                  <th className="p-3.5">{isEn ? 'Special Notes' : 'विशेष मानक'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ALCOHOLIC_BEVERAGES_STANDARDS.filter(
                  (b) =>
                    b.beverageName.toLowerCase().includes(alcoholSearch.toLowerCase()) ||
                    b.category.toLowerCase().includes(alcoholSearch.toLowerCase())
                ).map((bev, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-white">
                      {bev.beverageName}
                      <span className="block text-[10px] text-slate-400 font-normal">{bev.subType}</span>
                    </td>
                    <td className="p-3.5 text-purple-300 font-medium">{bev.category}</td>
                    <td className="p-3.5 font-mono text-cyan-300 font-bold">{bev.ethanolPctVolume}</td>
                    <td className="p-3.5 font-mono text-rose-300">{bev.methylAlcoholMax} {typeof bev.methylAlcoholMax === 'number' && bev.methylAlcoholMax > 50 ? 'g/100L' : 'mg/L'}</td>
                    <td className="p-3.5 font-mono text-slate-300">{bev.volatileAcidsMax}</td>
                    <td className="p-3.5 font-mono text-slate-300">
                      Pb: {bev.leadMgLMax} | As: {bev.arsenicMgLMax} | Cu: {bev.copperMgLMax} mg/L
                    </td>
                    <td className="p-3.5 text-[11px] text-slate-400 max-w-xs">{bev.specialNotes || (isEn ? 'Table-1 Standard' : 'सारणी-1 मानक अनुसार')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CONTAMINANTS & HEAVY METALS REGULATIONS 2011 */}
      {activeTab === 'contaminants_limits' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl glass-card border border-amber-500/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-1">
                <Biohazard className="w-3.5 h-3.5" /> FSSAI 2011 {isEn ? 'Chapter 2: Metal Contaminants & Toxins' : 'अध्याय 2: धातु संदूषक व टॉक्सिन'}
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white font-['Outfit']">
                {isEn ? 'Heavy Metals, Mycotoxins & Natural Contaminants Limits' : 'धातु संदूषक, माइकोटॉक्सिन एवं प्राकृतिक विषैले पदार्थ सीमा'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {isEn
                  ? 'Lead, Copper, Arsenic, Tin, Zinc, Cadmium, Mercury & Aflatoxin Legal Limits (PPM / mg/kg)'
                  : 'लेड (Lead), कॉपर, आर्सेनिक, टिन, जिंक, कैडमियम, मरकरी व एफ्लाटॉक्सिन की कानूनी सीमा (Parts Per Million / mg/kg)'}
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={isEn ? 'Search food or metal (e.g. Lead, Milk, Juice)...' : 'खाद्य या धातु खोजें (e.g. Lead, Milk, Juice)...'}
                value={contaminantSearch}
                onChange={(e) => setContaminantSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Cards for Crop Contaminants & Naturally Occurring Toxins */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Crop Toxins */}
            <div className="p-5 rounded-3xl glass-card border border-rose-500/40 space-y-3">
              <h4 className="font-extrabold text-sm text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> {isEn ? 'Crop Contaminants & Mold Toxins' : 'फसल संदूषक व फफूंद टॉक्सिन (Crop Contaminants)'}
              </h4>
              <div className="space-y-2">
                {CROP_CONTAMINANTS_STANDARDS.map((c, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{c.contaminant}</span>
                      <span className="text-[11px] text-slate-400">{c.foodArticle}</span>
                    </div>
                    <span className="font-mono font-black text-rose-400 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30">
                      {c.limitUgKg} {c.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Natural Toxins */}
            <div className="p-5 rounded-3xl glass-card border border-amber-500/40 space-y-3">
              <h4 className="font-extrabold text-sm text-amber-300 flex items-center gap-2">
                <Biohazard className="w-4 h-4 text-amber-400" /> {isEn ? 'Naturally Occurring Toxic Substances' : 'प्राकृतिक रूप से पाए जाने वाले विषैले पदार्थ'}
              </h4>
              <div className="space-y-2">
                {NATURAL_TOXINS_STANDARDS.map((tox, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{tox.substance}</span>
                      <span className="text-[11px] text-slate-400">{tox.naturalOccurrence}</span>
                    </div>
                    <span className="font-mono font-black text-amber-400 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      Max {tox.maxLimitPpm} ppm
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metal Contaminants Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 glass-card">
            <table className="w-full min-w-[620px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-amber-950/50 border-b border-amber-500/30 text-amber-200 font-mono uppercase">
                  <th className="p-3.5">{isEn ? 'Metal' : 'धातु संदूषक (Metal)'}</th>
                  <th className="p-3.5">{isEn ? 'Article of Food' : 'खाद्य पदार्थ (Article of Food)'}</th>
                  <th className="p-3.5">{isEn ? 'Category' : 'श्रेणी (Category)'}</th>
                  <th className="p-3.5">{isEn ? 'Max Legal Limit' : 'कानूनी अधिकतम सीमा (Max Limit)'}</th>
                  <th className="p-3.5">{isEn ? 'Safety Reference' : 'स्वास्थ्य सुरक्षा टिप्पणी'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {METAL_CONTAMINANTS_STANDARDS.filter(
                  (m) =>
                    m.metal.toLowerCase().includes(contaminantSearch.toLowerCase()) ||
                    m.articleOfFood.toLowerCase().includes(contaminantSearch.toLowerCase()) ||
                    m.category.toLowerCase().includes(contaminantSearch.toLowerCase())
                ).map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold text-amber-300 font-mono">{item.metal}</td>
                    <td className="p-3.5 font-medium text-white">{item.articleOfFood}</td>
                    <td className="p-3.5 text-slate-400">{item.category}</td>
                    <td className="p-3.5 font-mono text-rose-300 font-extrabold">{item.ppmMax} ppm</td>
                    <td className="p-3.5 text-slate-400 text-[11px]">FSSAI 2011 Regulation 2.1.1 Table Col 3</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: FORTIFICATION +F STANDARDS & NUTRACEUTICAL BOTANICALS */}
      {activeTab === 'fortification_staples' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl glass-card border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 mb-1">
                <Wheat className="w-3.5 h-3.5" /> FSSAI {isEn ? 'Fortified Foods Regulations 2018 & Nutraceuticals' : 'सुदृढ़ीकृत खाद्य (Fortification) 2018 व न्यूट्रास्यूटिकल'}
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white font-['Outfit']">
                {isEn ? '+F Fortified Staples & Permitted Botanicals (Schedule-IV)' : '+F सुदृढ़ीकृत मुख्य खाद्य पदार्थ एवं अनुमत औषधीय पौधे (अनुसूची-IV)'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {isEn
                  ? 'Mandatory micronutrients for Salt, Oil, Milk, Flour, Rice and 400+ Indian medicinal plant daily adult doses'
                  : 'नमक, तेल, दूध, आटा, चावल हेतु अनिवार्य माइक्रोन्यूट्रीएंट्स स्तर एवं 400+ भारतीय औषधीय पौधों की दैनिक खुराक'}
              </p>
            </div>

            {/* +F Official Logo Badge */}
            <div className="p-3 rounded-2xl bg-black/60 border border-cyan-500/40 flex items-center gap-3 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#0074C8] text-white font-black flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/30">
                +F
              </div>
              <div>
                <span className="text-xs font-bold text-white block">FORTIFIED LOGO</span>
                <span className="text-[10px] font-mono text-cyan-300">PANTONE 3005 C</span>
                <span className="text-[9px] text-slate-400 block">{isEn ? 'Complete Nutrition Healthy Life' : 'सम्पूर्ण पोषण स्वस्थ जीवन'}</span>
              </div>
            </div>
          </div>

          {/* 5 Staple Foods Fortification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FOOD_FORTIFICATION_STANDARDS.map((staple, i) => (
              <div
                key={i}
                className="p-5 rounded-3xl glass-card border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-slate-950 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                    {staple.fssaiSchedule}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300">{staple.category}</span>
                </div>
                <h4 className="text-base font-extrabold text-white">{isEn ? staple.commodity : staple.commodityHi}</h4>
                <div className="space-y-1 text-xs">
                  <p className="text-slate-300"><strong>{isEn ? 'Nutrient:' : 'पोषक तत्व:'}</strong> <span className="text-cyan-200">{staple.fortificant}</span></p>
                  <p className="text-slate-300"><strong>{isEn ? 'Standard Level:' : 'मानक स्तर:'}</strong> <span className="text-emerald-300 font-mono">{staple.level}</span></p>
                  <p className="text-slate-400 text-[11px]"><strong>{isEn ? 'Source:' : 'स्रोत:'}</strong> {staple.sourceOfNutrient}</p>
                </div>
                {staple.mandatoryWarning && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-200 font-medium">
                    ⚠️ {staple.mandatoryWarning}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Top Botanicals Schedule IV Section */}
          <div className="p-4 sm:p-6 rounded-3xl glass-card border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" /> {isEn ? 'Schedule-IV: Permitted Botanicals & Herbs' : 'अनुसूची-IV: अनुमत पादप एवं वानस्पतिक घटक (Permitted Botanicals)'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isEn
                    ? 'Maximum safe daily adult consumption levels (raw herb/material basis)'
                    : 'वयस्कों के लिए प्रति दिन इस्तेमाल किए जाने वाले अधिकतम अनुमेय स्तर (raw herb/material basis)'}
                </p>
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={isEn ? 'Search herb (e.g. Amla, Neem)...' : 'पौधा खोजें (e.g. Amla, Neem)...'}
                  value={botanicalSearch}
                  onChange={(e) => setBotanicalSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BOTANICAL_NUTRACEUTICALS.filter(
                (b) =>
                  b.commonName.toLowerCase().includes(botanicalSearch.toLowerCase()) ||
                  b.commonNameHi.toLowerCase().includes(botanicalSearch.toLowerCase()) ||
                  b.botanicalName.toLowerCase().includes(botanicalSearch.toLowerCase())
              ).map((bot) => (
                <div key={bot.sNo} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-amber-300">{isEn ? bot.commonName : bot.commonNameHi}</span>
                    <span className="text-[10px] font-mono text-slate-400">{isEn ? bot.commonNameHi : bot.commonName}</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 italic">{bot.botanicalName}</p>
                  <p className="text-slate-300"><strong>{isEn ? 'Part Used:' : 'उपयोगी भाग:'}</strong> {bot.partUsed}</p>
                  <p className="text-emerald-300 font-mono font-bold bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                    {isEn ? `Daily Adult Dose: ${bot.dailyAdultDose}` : `दैनिक खुराक: ${bot.dailyAdultDose}`}
                  </p>
                  {bot.precautions && (
                    <p className="text-[11px] text-amber-200/90">⚠️ {bot.precautions}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Probiotics & Prebiotics Pills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
              <h5 className="font-bold text-sm text-cyan-300">
                {isEn ? 'Schedule-VII: Approved Live Probiotic Strains (>= 10⁸ CFU/g)' : 'अनुसूची-VII: अनुमोदित प्रोबायोटिक्स जीवाणु (Live Probiotics >= 10⁸ CFU/g)'}
              </h5>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                {APPROVED_PROBIOTICS.map((p, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[11px] text-cyan-200 font-mono">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
              <h5 className="font-bold text-sm text-amber-300">
                {isEn ? 'Schedule-VIII: Approved Prebiotic Compounds' : 'अनुसूची-VIII: अनुमोदित प्रीबायोटिक्स रसायन (Approved Prebiotics)'}
              </h5>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {APPROVED_PREBIOTICS.map((pre, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-200">{pre.name}</span>
                    <span className="text-[10px] text-slate-400">{pre.source}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: INS FOOD ADDITIVES & SWEETENERS */}
      {activeTab === 'additives_registry' && (
        <div className="space-y-6">
          <div className="p-5 rounded-3xl glass-card border border-teal-500/40 bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 mb-1">
                <FlaskConical className="w-3.5 h-3.5" /> FSSAI 2011 {isEn ? 'Appendix A & B: Food Additives Directory' : 'परिशिष्ट A & B: खाद्य योज्य निर्देशिका'}
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white font-['Outfit']">
                {isEn ? 'Approved Food Additives (INS / E-Numbers), Sweeteners & Preservatives' : 'स्वीकृत खाद्य योज्य (INS / E-Numbers), स्वीटनर व परिरक्षक'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {isEn
                  ? 'Artificial sweeteners, Class II preservatives, colors, antioxidants & Good Manufacturing Practice (GMP) limits'
                  : 'कृत्रिम मिठासक, क्लास II परिरक्षक, खाद्य रंग, एंटीऑक्सीडेंट एवं गुड मैन्युफैक्चरिंग प्रैक्सिट (GMP) स्तर'}
              </p>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder={isEn ? 'Search INS or additive (e.g. INS 955, Benzoic)...' : 'INS या योज्य खोजें (e.g. INS 955, Benzoic)...'}
                value={additiveSearch}
                onChange={(e) => setAdditiveSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-teal-500/30 text-xs text-white focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>

          {/* Additives Table */}
          <div className="overflow-x-auto rounded-2xl border border-white/10 glass-card">
            <table className="w-full min-w-[620px] text-left border-collapse text-xs">
              <thead>
                <tr className="bg-teal-950/50 border-b border-teal-500/30 text-teal-200 font-mono uppercase">
                  <th className="p-3.5">{isEn ? 'INS Number' : 'INS संख्या'}</th>
                  <th className="p-3.5">{isEn ? 'Additive Name' : 'योज्य का नाम (Additive Name)'}</th>
                  <th className="p-3.5">{isEn ? 'Category' : 'श्रेणी'}</th>
                  <th className="p-3.5">{isEn ? 'Functional Class' : 'कार्यात्मक वर्ग (Function)'}</th>
                  <th className="p-3.5">{isEn ? 'Max Safe Limit' : 'अधिकतम अनुमत सीमा (Max Limit)'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {KEY_INS_ADDITIVES.filter(
                  (a) =>
                    a.insNo.toLowerCase().includes(additiveSearch.toLowerCase()) ||
                    a.name.toLowerCase().includes(additiveSearch.toLowerCase()) ||
                    a.category.toLowerCase().includes(additiveSearch.toLowerCase())
                ).map((add, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-cyan-300">{add.insNo}</td>
                    <td className="p-3.5 font-bold text-white">
                      {add.name}
                      <span className="block text-[10px] text-teal-300 font-normal">{add.nameHi}</span>
                    </td>
                    <td className="p-3.5 text-slate-300">{add.category}</td>
                    <td className="p-3.5 text-slate-400 text-[11px]">{add.functionalClass}</td>
                    <td className="p-3.5 font-mono text-amber-300 font-semibold">{add.maxPermittedLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: LIVE THRESHOLD TESTER CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-yellow-500/40 bg-gradient-to-br from-yellow-950/30 via-slate-900 to-slate-950 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                  {isEn ? 'Quick FSSAI Standards & Compliance Calculator' : 'त्वरित FSSAI मानक व अनुपालन कैलकुलेटर'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  {isEn
                    ? 'Enter laboratory measured readings to verify whether produce complies with statutory legal limits.'
                    : 'प्रयोगशाला में मापे गए स्तर दर्ज करें और देखें कि उत्पाद कानूनी मानकों पर खरा उतरता है या नहीं।'}
                </p>
              </div>
            </div>

            {/* Form inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  {isEn ? 'Test Category:' : 'परीक्षण श्रेणी (Test Category):'}
                </label>
                <select
                  value={testCategory}
                  onChange={(e) => setTestCategory(e.target.value as 'alcohol' | 'metal' | 'toxin' | 'fortification')}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="metal">{isEn ? 'Heavy Metals (Lead, Arsenic, etc.)' : 'धातु संदूषक (Heavy Metals - Lead, Arsenic, etc.)'}</option>
                  <option value="alcohol">{isEn ? 'Alcoholic Beverages (Alcohol, Methanol & Acids)' : 'अल्कोहलिक पेय (Alcohol, Methanol & Acids)'}</option>
                  <option value="toxin">{isEn ? 'Mycotoxins (Aflatoxin / Patulin)' : 'माइकोटॉक्सिन (Aflatoxin / Patulin)'}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  {isEn ? 'Food / Beverage Name:' : 'खाद्य / पेय का नाम (Food Item):'}
                </label>
                <input
                  type="text"
                  value={testFood}
                  onChange={(e) => setTestFood(e.target.value)}
                  placeholder="e.g. Fruit juice, Infant food, Beer..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  {isEn ? 'Parameter to Test:' : 'मापे जाने वाला तत्व (Parameter):'}
                </label>
                <input
                  type="text"
                  value={testParam}
                  onChange={(e) => setTestParam(e.target.value)}
                  placeholder="e.g. Lead, Methanol, Copper..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  {isEn ? 'Measured Laboratory Reading:' : 'प्रयोगशाला रीडिंग (Measured Value):'}
                </label>
                <input
                  type="number"
                  step="any"
                  value={testValue}
                  onChange={(e) => setTestValue(e.target.value)}
                  placeholder="e.g. 0.8"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <button
              onClick={handleRunTest}
              className="w-full py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-300 text-slate-950 shadow-xl shadow-yellow-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isEn ? '⚖️ VERIFY COMPLIANCE NOW' : '⚖️ तुरंत अनुपालन जांचें (VERIFY COMPLIANCE)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Test Result Display */}
            {testResult && (
              <div
                className={`p-6 rounded-3xl border transition-all ${
                  testResult.status === 'pass'
                    ? 'bg-emerald-950/40 border-emerald-500/50 shadow-xl shadow-emerald-500/20'
                    : 'bg-rose-950/40 border-rose-500/60 shadow-xl shadow-rose-500/25 animate-pulse'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {testResult.status === 'pass' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400" />
                    )}
                    <span className="text-base sm:text-lg font-black text-white">
                      {testResult.status === 'pass'
                        ? (isEn ? '✅ COMPLIANT (PASSED)' : '✅ मानक उत्तीर्ण (PASSED)')
                        : (isEn ? '❌ NON-COMPLIANT (REJECTED)' : '❌ गैरकानूनी / अस्वीकृत (REJECTED)')}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/40 text-slate-300">
                    {isEn
                      ? `Measured: ${testResult.measured} / Max: ${testResult.limit}`
                      : `मापा गया: ${testResult.measured} / अधिकतम: ${testResult.limit}`}
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-100 leading-relaxed">{testResult.msg}</p>

                <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 font-mono">
                  <span>{isEn ? 'Statutory Reference:' : 'कानूनी संदर्भ:'} {testResult.ref}</span>
                  <span className="text-yellow-400 font-bold">FSS Act 2006 Statutory Check</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 8: CERTIFICATE GENERATOR */}
      {activeTab === 'certificate' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <Stamp className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                  {isEn ? 'Food Safety Officer • Digital Clearance Certificate' : 'खाद्य सुरक्षा अधिकारी • डिजिटल प्रेषण एवं सुरक्षा प्रमाण-पत्र'}
                </h3>
                <p className="text-xs text-slate-300">
                  {isEn
                    ? 'Generate official packaging safety and overall migration clearance certificate for mandi consignment.'
                    : 'मंडी निरीक्षण के उपरांत सुरक्षित पैकेजिंग व प्रवासन जांच का अधिकृत प्रमाण-पत्र तैयार करें।'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">{isEn ? 'Inspector Name:' : 'अधिकारी का नाम (Inspector Name):'}</label>
                <input
                  type="text"
                  value={inspectorName}
                  onChange={(e) => setInspectorName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">{isEn ? 'Inspection Station / Mandi:' : 'मंडी स्टेशन (Inspection Station):'}</label>
                <input
                  type="text"
                  value={mandiStation}
                  onChange={(e) => setMandiStation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">{isEn ? 'Consignment Produce:' : 'फसल / उत्पाद (Consignment Produce):'}</label>
                <input
                  type="text"
                  value={consignmentProduce}
                  onChange={(e) => setConsignmentProduce(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">{isEn ? 'Quantity in Quintals:' : 'मात्रा क्विंटल में (Quantity):'}</label>
                <input
                  type="number"
                  value={consignmentQty}
                  onChange={(e) => setConsignmentQty(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <button
              onClick={() => setShowCertificateModal(true)}
              className="w-full py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 shadow-xl shadow-emerald-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Stamp className="w-5 h-5" />
              <span>{isEn ? 'GENERATE OFFICIAL FSSAI PASS CERTIFICATE' : 'प्रमाण-पत्र जनरेट करें (GENERATE OFFICIAL FSSAI PASS CERTIFICATE)'}</span>
            </button>
          </div>
        </div>
      )}

      {/* OFFICIAL CERTIFICATE POPUP MODAL */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white text-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-emerald-600 print:m-0 print:border-none my-6">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 print:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Emblem & Certificate Header */}
            <div className="text-center space-y-1 pb-4 border-b-2 border-emerald-700">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-extrabold text-sm uppercase tracking-widest">
                <ShieldCheck className="w-5 h-5" /> {isEn ? 'GOVERNMENT OF INDIA • FOOD SAFETY AND STANDARDS AUTHORITY' : 'भारत सरकार • खाद्य सुरक्षा एवं मानक प्राधिकरण'}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
                {isEn ? 'FOOD PACKAGING SAFETY & MIGRATION COMPLIANCE CERTIFICATE' : 'खाद्य पैकेजिंग सुरक्षा एवं प्रवासन अनुपालन प्रमाण-पत्र'}
              </h2>
              <p className="text-[11px] font-mono text-slate-600 uppercase">
                CERTIFICATE OF FOOD SAFETY & OVERALL MIGRATION CONFORMITY (FSS ACT 2006)
              </p>
            </div>

            {/* Certificate Body */}
            <div className="my-6 space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between font-mono text-xs">
                <span><strong>{isEn ? 'Certificate No:' : 'प्रमाण-पत्र क्र.:'}</strong> {batchLotNo}</span>
                <span><strong>{isEn ? 'Date:' : 'तारीख:'}</strong> {new Date().toLocaleDateString(isEn ? 'en-IN' : 'hi-IN')}</span>
              </div>

              <p>
                {isEn
                  ? `This is to certify that packaging samples for food consignment "${consignmentProduce}" (Quantity: ${consignmentQty} Quintals) inspected at ${mandiStation} have undergone statutory migration testing.`
                  : `यह प्रमाणित किया जाता है कि ${mandiStation} पर प्रस्तुत की गई खाद्य खेप "${consignmentProduce}" (मात्रा: ${consignmentQty} क्विंटल) के पैकेजिंग नमूनों का परीक्षण किया गया है।`}
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">{isEn ? 'Packaging Material:' : 'उपयोग की गई पैकेजिंग:'}</span>
                  <span className="font-bold text-slate-900">{isEn ? selectedMaterial.nameEn : selectedMaterial.nameHi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{isEn ? 'Applicable Standard:' : 'लागू मानक (Standard):'}</span>
                  <span className="font-mono font-bold text-emerald-700">{selectedMaterial.standard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{isEn ? 'Tested Migration Rate (OML):' : 'परीक्षित प्रवासन दर (OML):'}</span>
                  <span className="font-mono font-bold text-emerald-700">{selectedMaterial.migrationRateMgKg} mg/kg ({isEn ? 'Limit: <60 mg/kg' : 'सीमा: <60 mg/kg'})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">{isEn ? 'Prohibited Recycled Waste / Ink:' : 'प्रतिबंधित स्याही/रीसाइकल्ड कचरा:'}</span>
                  <span className="font-bold text-emerald-700">{isEn ? 'NIL (PASS - Food Contact Safe)' : 'शून्य (PASS - गैर-विषाक्त)'}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 italic">
                {isEn
                  ? 'This consignment is declared 100% compliant with FSSAI regulations, suitable for human consumption, inter-state transit, and mandi commerce.'
                  : 'यह खेप मानव उपभोग, अंतरराज्यीय परिवहन एवं मंडी विपणन हेतु पूर्णतः सुरक्षित एवं FSSAI विनियमों के अनुकूल पाई गई है।'}
              </p>

              {/* Signatures */}
              <div className="pt-8 flex items-end justify-between border-t border-slate-200">
                <div className="text-left">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center mb-1">
                    <QrCode className="w-12 h-12 text-slate-700" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{isEn ? 'Scan to Verify' : 'स्कैन कर सत्यापन करें'}</span>
                </div>

                <div className="text-center space-y-1">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-700 mx-auto flex items-center justify-center text-emerald-800 font-bold text-[10px] rotate-[-12deg]">
                    FSSAI PASSED
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 block">{isEn ? 'Official Seal' : 'आधिकारिक मुहर'}</span>
                </div>

                <div className="text-right">
                  <span className="font-serif font-black text-slate-900 block">{inspectorName}</span>
                  <span className="text-[11px] text-slate-500 block">{isEn ? 'Food Safety Officer' : 'खाद्य सुरक्षा एवं मानक अधिकारी'}</span>
                  <span className="text-[10px] text-slate-400 block">{mandiStation}</span>
                </div>
              </div>
            </div>

            {/* Print button */}
            <div className="flex gap-3 print:hidden pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{isEn ? 'Print / Download PDF' : 'प्रिंट / PDF सेव करें'}</span>
              </button>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-200 hover:bg-slate-300 text-slate-800 cursor-pointer"
              >
                {isEn ? 'Close' : 'बंद करें'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
