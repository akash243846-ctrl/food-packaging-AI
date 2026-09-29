import React, { useState, useId } from 'react';
import {
  Calculator,
  TrendingUp,
  Package,
  Sparkles,
  Volume2,
  VolumeX,
  ShieldCheck,
  Truck,
  Leaf,
  ArrowRight,
  RefreshCw,
  Coins,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Share2,
  Wind,
  Snowflake,
  Clock,
  Percent,
  X,
} from 'lucide-react';
import { SupportedLanguage, TRANSLATIONS } from '../i18n/translations';

interface FoodPackagingCalculatorProps {
  currentLanguage?: SupportedLanguage;
  onSpeakText?: (text: string) => void;
  onStopSpeaking?: () => void;
  isSpeaking?: boolean;
}

interface CommodityPreset {
  id: string;
  emoji: string;
  nameEn: string;
  nameHi: string;
  nameMr: string;
  nameTa: string;
  nameTe: string;
  nameGu: string;
  nameBn: string;
  namePa: string;
  basePriceKg: number;
  typicalLossPct: number;
  postPackLossPct: number;
  pkgMaterialHi: string;
  pkgMaterialEn: string;
  pkgCostPerKg: number;
  shelfLifeGainDays: number;
  defaultQtyKg: number;
  fssaiStandard: string;
  storageTemp: string;
}

const COMMODITY_PRESETS: CommodityPreset[] = [
  {
    id: 'tomato',
    emoji: '🍅',
    nameEn: 'Hybrid Tomato',
    nameHi: 'टमाटर',
    nameMr: 'टोमॅटो',
    nameTa: 'தக்காளி',
    nameTe: 'టమోటా',
    nameGu: 'ટામેટા',
    nameBn: 'টমেটো',
    namePa: 'ਟਮਾਟਰ',
    basePriceKg: 35,
    typicalLossPct: 30,
    postPackLossPct: 4,
    pkgMaterialHi: 'एंटी-फॉग व सूक्ष्म-छिद्रित पाउच (Anti-Fog BOPP Pouch)',
    pkgMaterialEn: 'Anti-Fog Micro-Perforated BOPP Pouch',
    pkgCostPerKg: 1.4,
    shelfLifeGainDays: 14,
    defaultQtyKg: 1000,
    fssaiStandard: 'IS 9845 / IS 10146',
    storageTemp: '12°C - 15°C',
  },
  {
    id: 'mango',
    emoji: '🥭',
    nameEn: 'Alphonso Mango',
    nameHi: 'हापुस आम',
    nameMr: 'हापूस आंबा',
    nameTa: 'அல்போன்சா மாம்பழம்',
    nameTe: 'ఆల్ఫోన్సో మామిడి',
    nameGu: 'હાફૂસ કેરી',
    nameBn: 'আলফানসো আম',
    namePa: 'ਅਲਫੋਂਸੋ ਅੰਬ',
    basePriceKg: 130,
    typicalLossPct: 35,
    postPackLossPct: 4.5,
    pkgMaterialHi: 'फोम नेट + एथिलीन-शोषक MAP हवादार बॉक्स',
    pkgMaterialEn: 'Foam Net + Ethylene Absorber MAP Corrugated Box',
    pkgCostPerKg: 4.5,
    shelfLifeGainDays: 16,
    defaultQtyKg: 500,
    fssaiStandard: 'IS 10146 / FSSAI 2018',
    storageTemp: '10°C - 13°C',
  },
  {
    id: 'potato',
    emoji: '🥔',
    nameEn: 'Potato',
    nameHi: 'आलू',
    nameMr: 'बटाटा',
    nameTa: 'உருளைக்கிழங்கு',
    nameTe: 'బంగాళాదుంప',
    nameGu: 'બટાકા',
    nameBn: 'আলু',
    namePa: 'ਆਲੂ',
    basePriceKg: 22,
    typicalLossPct: 20,
    postPackLossPct: 3,
    pkgMaterialHi: 'हवादार लेनो मेश जालीदार बैग (Leno Mesh Bag)',
    pkgMaterialEn: 'Ventilated Leno Mesh Sacks',
    pkgCostPerKg: 0.8,
    shelfLifeGainDays: 60,
    defaultQtyKg: 2000,
    fssaiStandard: 'IS 16187 Leno Grade',
    storageTemp: '15°C - 20°C (Dark)',
  },
  {
    id: 'onion',
    emoji: '🧅',
    nameEn: 'Nashik Red Onion',
    nameHi: 'प्याज',
    nameMr: 'कांदा',
    nameTa: 'வெங்காயம்',
    nameTe: 'ఉల్లిపాయ',
    nameGu: 'ડુંગળી',
    nameBn: 'পেঁয়াজ',
    namePa: 'ਪਿਆਜ਼',
    basePriceKg: 28,
    typicalLossPct: 25,
    postPackLossPct: 3.5,
    pkgMaterialHi: 'यूवी-संरक्षित रेड लेनो मेश बोरी',
    pkgMaterialEn: 'UV-Stabilized Red Leno Mesh Bags',
    pkgCostPerKg: 0.9,
    shelfLifeGainDays: 50,
    defaultQtyKg: 2000,
    fssaiStandard: 'IS 16187 Ventilated',
    storageTemp: '20°C - 25°C Dry',
  },
  {
    id: 'apple',
    emoji: '🍎',
    nameEn: 'Kashmiri Apple',
    nameHi: 'कश्मीरी सेब',
    nameMr: 'काश्मिरी सफरचंद',
    nameTa: 'காஷ்மீர் ஆப்பிள்',
    nameTe: 'కాశ్మీరీ ఆపిల్',
    nameGu: 'કાશ્મીરી સફરજન',
    nameBn: 'কাশ্মীরি আপেল',
    namePa: 'ਕਸ਼ਮੀਰੀ ਸੇਬ',
    basePriceKg: 110,
    typicalLossPct: 22,
    postPackLossPct: 3,
    pkgMaterialHi: 'मोल्डेड पल्प ट्रे + छिद्रित एलडीपीई पाउच',
    pkgMaterialEn: 'Molded Fiber Pulp Trays + Micro-vent LDPE Film',
    pkgCostPerKg: 3.2,
    shelfLifeGainDays: 45,
    defaultQtyKg: 800,
    fssaiStandard: 'IS 9845 / IS 10146',
    storageTemp: '1°C - 4°C',
  },
  {
    id: 'grapes',
    emoji: '🍇',
    nameEn: 'Export Grapes',
    nameHi: 'अंगूर',
    nameMr: 'द्राक्षे',
    nameTa: 'திராட்சை',
    nameTe: 'ద్రాక్ష',
    nameGu: 'દ્રાક્ષ',
    nameBn: 'আঙুর',
    namePa: 'ਅੰਗੂਰ',
    basePriceKg: 80,
    typicalLossPct: 35,
    postPackLossPct: 5,
    pkgMaterialHi: 'SO₂ सल्फर पैड युक्त छिद्रित पाउच + ईपीएस क्रेट्स',
    pkgMaterialEn: 'Perforated Polybags + SO₂ Pad in Ventilated Crates',
    pkgCostPerKg: 2.8,
    shelfLifeGainDays: 30,
    defaultQtyKg: 600,
    fssaiStandard: 'FSSAI Food Contact 2018',
    storageTemp: '0°C - 2°C',
  },
  {
    id: 'chilli',
    emoji: '🌶️',
    nameEn: 'Green Chilli',
    nameHi: 'हरी मिर्च',
    nameMr: 'हिरवी मिरची',
    nameTa: 'பச்சை மிளகாய்',
    nameTe: 'పచ్చి మిర్చి',
    nameGu: 'લીલા મરચાં',
    nameBn: 'কাঁচা মরিচ',
    namePa: 'ਹਰੀ ਮਿਰਚ',
    basePriceKg: 65,
    typicalLossPct: 28,
    postPackLossPct: 4,
    pkgMaterialHi: 'एंटी-फॉग बीओपीपी पाउच (Anti-Fog BOPP)',
    pkgMaterialEn: 'Micro-Perforated Anti-Fog BOPP Pouches',
    pkgCostPerKg: 1.8,
    shelfLifeGainDays: 15,
    defaultQtyKg: 400,
    fssaiStandard: 'IS 9845 Compliant',
    storageTemp: '8°C - 10°C',
  },
  {
    id: 'paneer',
    emoji: '🧀',
    nameEn: 'Fresh Malai Paneer',
    nameHi: 'ताजा पनीर',
    nameMr: 'ताजे पनीर',
    nameTa: 'பன்னீர்',
    nameTe: 'పనీర్',
    nameGu: 'તાજું પનીર',
    nameBn: 'তাজা পনির',
    namePa: 'ਤਾਜ਼ਾ ਪਨੀਰ',
    basePriceKg: 340,
    typicalLossPct: 25,
    postPackLossPct: 2,
    pkgMaterialHi: 'मल्टी-लेयर EVOH वैक्यूम थर्मोफॉर्म पाउच',
    pkgMaterialEn: 'Coextruded EVOH Barrier Vacuum Pouch',
    pkgCostPerKg: 6.0,
    shelfLifeGainDays: 20,
    defaultQtyKg: 200,
    fssaiStandard: 'IS 9845 Dairy Grade',
    storageTemp: '2°C - 4°C Chilled',
  },
  {
    id: 'banana',
    emoji: '🍌',
    nameEn: 'Fresh Banana',
    nameHi: 'केला',
    nameMr: 'केळी',
    nameTa: 'வாழைப்பழம்',
    nameTe: 'అరటిపండు',
    nameGu: 'કેળાં',
    nameBn: 'কলা',
    namePa: 'ਕੇਲਾ',
    basePriceKg: 32,
    typicalLossPct: 32,
    postPackLossPct: 5,
    pkgMaterialHi: 'एथिलीन सोखने वाला MAP पाउच (Ethylene Absorber MAP)',
    pkgMaterialEn: 'Ethylene Scavenging Active MAP Bags',
    pkgCostPerKg: 1.6,
    shelfLifeGainDays: 16,
    defaultQtyKg: 1000,
    fssaiStandard: 'IS 10146 Active Food Grade',
    storageTemp: '13°C - 14°C',
  },
  {
    id: 'spinach',
    emoji: '🥬',
    nameEn: 'Spinach / Greens',
    nameHi: 'पालक व हरी पत्तेदार',
    nameMr: 'पालक व भाजी',
    nameTa: 'பசலைக்கீரை',
    nameTe: 'పాలకూర',
    nameGu: 'પાલક / ભાજી',
    nameBn: 'পালং শাক',
    namePa: 'ਪਾਲਕ',
    basePriceKg: 30,
    typicalLossPct: 45,
    postPackLossPct: 6,
    pkgMaterialHi: 'हाई-रेस्पिरेशन एंटी-फॉग फिल्म (Anti-Fog Film)',
    pkgMaterialEn: 'High Permeability Anti-Fog Polyolefin Film',
    pkgCostPerKg: 1.5,
    shelfLifeGainDays: 10,
    defaultQtyKg: 300,
    fssaiStandard: 'IS 9845 Safe Film',
    storageTemp: '4°C - 8°C',
  },
  {
    id: 'rice',
    emoji: '🌾',
    nameEn: 'Basmati Rice',
    nameHi: 'बासमती चावल',
    nameMr: 'बासमती तांदूळ',
    nameTa: 'பாசுமதி அரிசி',
    nameTe: 'బాస్మతి బియ్యం',
    nameGu: 'બાસમતી ચોખા',
    nameBn: 'বাসমতী চাল',
    namePa: 'ਬਾਸਮਤੀ ਚੌਲ',
    basePriceKg: 85,
    typicalLossPct: 15,
    postPackLossPct: 1,
    pkgMaterialHi: 'बीओपीपी लैमिनेटेड वूवन बैग + नाइट्रोजन फ्लश',
    pkgMaterialEn: 'BOPP Laminated Woven Sack with Moisture Barrier',
    pkgCostPerKg: 1.8,
    shelfLifeGainDays: 365,
    defaultQtyKg: 2500,
    fssaiStandard: 'IS 14887 Food Grains',
    storageTemp: 'Ambient Dry (20°C - 30°C)',
  },
  {
    id: 'strawberry',
    emoji: '🍓',
    nameEn: 'Mahabaleshwar Strawberry',
    nameHi: 'स्ट्रॉबेरी',
    nameMr: 'स्ट्रॉबेरी',
    nameTa: 'ஸ்ட்ராபெரி',
    nameTe: 'స్ట్రాబెర్రీ',
    nameGu: 'સ્ટ્રોબેરી',
    nameBn: 'স্ট্রবেরি',
    namePa: 'ਸਟ੍ਰਾਬੇਰੀ',
    basePriceKg: 220,
    typicalLossPct: 40,
    postPackLossPct: 6,
    pkgMaterialHi: 'हवादार आर-पीईटी क्लैमशेल + पैड (rPET Clamshell)',
    pkgMaterialEn: 'Ventilated Recycled rPET Clamshell with Absorbent Pad',
    pkgCostPerKg: 5.5,
    shelfLifeGainDays: 12,
    defaultQtyKg: 300,
    fssaiStandard: 'IS 10146 / FSSAI Food Grade',
    storageTemp: '1°C - 3°C',
  },
  {
    id: 'guava',
    emoji: '🍈',
    nameEn: 'Allahabad Guava',
    nameHi: 'सफेदा अमरूद',
    nameMr: 'पेरू / अमरूद',
    nameTa: 'கொய்யா',
    nameTe: 'జామపండు',
    nameGu: 'જામફળ',
    nameBn: 'পেয়ারা',
    namePa: 'ਅਮਰੂਦ',
    basePriceKg: 45,
    typicalLossPct: 32,
    postPackLossPct: 5,
    pkgMaterialHi: 'माइक्रो-परफोरेटेड एंटी-फॉग बैग + फोम नेट',
    pkgMaterialEn: 'Anti-Fog Micro-perforated Polybag + Foam Sleeve',
    pkgCostPerKg: 2.2,
    shelfLifeGainDays: 14,
    defaultQtyKg: 500,
    fssaiStandard: 'IS 10146 / FSSAI 2018',
    storageTemp: '8°C - 10°C',
  },
  {
    id: 'nashik_grapes',
    emoji: '🍇',
    nameEn: 'Nashik Grapes',
    nameHi: 'नासिक अंगूर',
    nameMr: 'नाशिक द्राक्षे',
    nameTa: 'திராட்சை',
    nameTe: 'ద్రాక్ష',
    nameGu: 'દ્રાક્ષ',
    nameBn: 'আঙ্গুর',
    namePa: 'ਅੰਗੂਰ',
    basePriceKg: 90,
    typicalLossPct: 28,
    postPackLossPct: 4,
    pkgMaterialHi: 'हवादार ट्रे + SO₂ सल्फर पैड (Botrytis Barrier)',
    pkgMaterialEn: 'Vented Clamshell + Dual SO₂ Preservative Pad',
    pkgCostPerKg: 3.8,
    shelfLifeGainDays: 35,
    defaultQtyKg: 500,
    fssaiStandard: 'IS 12252 / FSSAI Additives',
    storageTemp: '0°C - 2°C',
  },
  {
    id: 'green_chilli',
    emoji: '🌶️',
    nameEn: 'Pusa Green Chilli',
    nameHi: 'तीखी हरी मिर्च',
    nameMr: 'हिरवी मिरची',
    nameTa: 'பச்சை மிளகாய்',
    nameTe: 'పచ్చి మిరపకాయలు',
    nameGu: 'લીલા મરચાં',
    nameBn: 'কাঁচা মরিচ',
    namePa: 'ਹਰੀ ਮਿਰਚ',
    basePriceKg: 60,
    typicalLossPct: 35,
    postPackLossPct: 5.5,
    pkgMaterialHi: 'एंटी-फॉग सूक्ष्म-छिद्रित PP पाउच (Calyx Shield)',
    pkgMaterialEn: 'Anti-Fog Breathable PP Pouch (Stem Fresh)',
    pkgCostPerKg: 1.8,
    shelfLifeGainDays: 20,
    defaultQtyKg: 200,
    fssaiStandard: 'IS 10142 Food Grade',
    storageTemp: '8°C - 10°C',
  },
  {
    id: 'okra',
    emoji: '🥬',
    nameEn: 'Okra / Bhindi',
    nameHi: 'ताज़ा भिंडी',
    nameMr: 'भेंडी',
    nameTa: 'வெண்டைக்காய்',
    nameTe: 'బెండకాయ',
    nameGu: 'ભીંડા',
    nameBn: 'ঢেঁড়স',
    namePa: 'ਭਿੰਡੀ',
    basePriceKg: 40,
    typicalLossPct: 38,
    postPackLossPct: 6,
    pkgMaterialHi: 'लेज़र-छिद्रित सांस लेने वाली LDPE थैली (Anti-Lignification)',
    pkgMaterialEn: 'Laser-Vented LDPE Pouch (Chilling-Free)',
    pkgCostPerKg: 1.6,
    shelfLifeGainDays: 12,
    defaultQtyKg: 400,
    fssaiStandard: 'IS 10146 / FSSAI 2018',
    storageTemp: '9°C - 11°C',
  },
  {
    id: 'green_peas',
    emoji: '🫛',
    nameEn: 'Sweet Green Peas',
    nameHi: 'हरी मटर',
    nameMr: 'मटार',
    nameTa: 'பச்சை பட்டாணி',
    nameTe: 'పచ్చి బఠానీలు',
    nameGu: 'લીલા વટાણા',
    nameBn: 'কড়াইশুঁটি',
    namePa: 'ਹਰੀ ਮਟਰ',
    basePriceKg: 55,
    typicalLossPct: 34,
    postPackLossPct: 5,
    pkgMaterialHi: 'चिल्ड MAP पाउच (Sucrose Lock)',
    pkgMaterialEn: 'Chilled Controlled Atmosphere Polybag',
    pkgCostPerKg: 2.0,
    shelfLifeGainDays: 14,
    defaultQtyKg: 500,
    fssaiStandard: 'IS 9845 Safe Polymer',
    storageTemp: '1°C - 2°C',
  },
  {
    id: 'makhana',
    emoji: '⚪',
    nameEn: 'Phool Makhana',
    nameHi: 'फूल मखाना',
    nameMr: 'मखाणा',
    nameTa: 'தாமரை விதை',
    nameTe: 'తామర గింజలు',
    nameGu: 'મખાના',
    nameBn: 'মাখানা',
    namePa: 'ਮਖਾਣੇ',
    basePriceKg: 550,
    typicalLossPct: 22,
    postPackLossPct: 2.5,
    pkgMaterialHi: 'नाइट्रोजन कुशन मेटलाइज्ड बैरियर पाउच (Met-BOPP/PE)',
    pkgMaterialEn: 'Nitrogen-Flushed Metallized Cushion Barrier Pouch',
    pkgCostPerKg: 8.5,
    shelfLifeGainDays: 240,
    defaultQtyKg: 100,
    fssaiStandard: 'IS 10142 / IS 12252',
    storageTemp: '18°C - 24°C',
  },
  {
    id: 'dahi',
    emoji: '🥣',
    nameEn: 'Desi Dahi / Curd',
    nameHi: 'ताज़ा देसी दही',
    nameMr: 'दही',
    nameTa: 'தயிர்',
    nameTe: 'పెరుగు',
    nameGu: 'દહીં',
    nameBn: 'দই',
    namePa: 'ਦਹੀਂ',
    basePriceKg: 65,
    typicalLossPct: 25,
    postPackLossPct: 2,
    pkgMaterialHi: 'PP सील्ड कप + एल्युमिनियम फॉयल लिड (Foil-Sealed Cup)',
    pkgMaterialEn: 'Food-Grade PP Cup with Aluminium Foil Peelable Lid',
    pkgCostPerKg: 3.2,
    shelfLifeGainDays: 18,
    defaultQtyKg: 300,
    fssaiStandard: 'IS 10142 / FSSAI Dairy',
    storageTemp: '2°C - 4°C',
  },
  {
    id: 'moong_dal',
    emoji: '🟡',
    nameEn: 'Dhuli Moong Dal',
    nameHi: 'मूँग दाल',
    nameMr: 'मूग डाळ',
    nameTa: 'பாசிப்பருப்பு',
    nameTe: 'పెసరపప్పు',
    nameGu: 'મગની દાળ',
    nameBn: 'মুগ ডাল',
    namePa: 'ਮੂੰਗੀ ਦੀ ਦਾਲ',
    basePriceKg: 110,
    typicalLossPct: 18,
    postPackLossPct: 1.5,
    pkgMaterialHi: '100% रीसाइक्लेबल मोनो-PE स्टैंड-अप पाउच + ज़िपर',
    pkgMaterialEn: '100% Recyclable Mono-PE Barrier Pouch with Ziplock',
    pkgCostPerKg: 3.5,
    shelfLifeGainDays: 300,
    defaultQtyKg: 500,
    fssaiStandard: 'IS 10146 / PWM Rules 2022',
    storageTemp: '20°C - 24°C',
  },
];

export const FoodPackagingCalculator: React.FC<FoodPackagingCalculatorProps> = ({
  currentLanguage = 'hi',
  onSpeakText,
  onStopSpeaking,
  isSpeaking = false,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<CommodityPreset>(COMMODITY_PRESETS[0]);
  const [quantityKg, setQuantityKg] = useState<number>(selectedCrop.defaultQtyKg);
  const [pricePerKg, setPricePerKg] = useState<number>(selectedCrop.basePriceKg);
  const [distanceKm, setDistanceKm] = useState<number>(350);
  const [customPkgCost, setCustomPkgCost] = useState<number>(selectedCrop.pkgCostPerKg);
  const [useReeferCold, setUseReeferCold] = useState<boolean>(true);
  const [useMapGasFlush, setUseMapGasFlush] = useState<boolean>(false);
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);

  // Translation dictionary
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.hi;

  // Generate unique IDs for accessibility
  const qtyInputId = useId();
  const priceInputId = useId();
  const distanceInputId = useId();
  const pkgCostInputId = useId();

  // Helper to get localized commodity name
  const getLocalizedCropName = (crop: CommodityPreset) => {
    switch (currentLanguage) {
      case 'en': return crop.nameEn;
      case 'mr': return crop.nameMr;
      case 'ta': return crop.nameTa;
      case 'te': return crop.nameTe;
      case 'gu': return crop.nameGu;
      case 'bn': return crop.nameBn;
      case 'pa': return crop.namePa;
      case 'hi':
      default:
        return crop.nameHi;
    }
  };

  const getLocalizedPkgMaterial = (crop: CommodityPreset) => {
    return currentLanguage === 'en' ? crop.pkgMaterialEn : crop.pkgMaterialHi;
  };

  // Select crop preset
  const handleCropChange = (crop: CommodityPreset) => {
    setSelectedCrop(crop);
    setQuantityKg(crop.defaultQtyKg);
    setPricePerKg(crop.basePriceKg);
    setCustomPkgCost(crop.pkgCostPerKg);
  };

  // Calculations:
  // 1. Loss without packaging
  const unpkgLossKg = quantityKg * (selectedCrop.typicalLossPct / 100);
  const unpkgLossAmount = unpkgLossKg * pricePerKg;

  // 2. Loss with smart packaging
  // Extra transport distance adds slight loss if distance > 500km and no cold chain
  const distancePenalty = distanceKm > 500 && !useReeferCold ? 2 : 0;
  const gasFlushBenefit = useMapGasFlush ? 1.5 : 0;
  const rawPackLoss = selectedCrop.postPackLossPct + distancePenalty - gasFlushBenefit;
  const effectivePackLossPct = Math.max(Math.min(rawPackLoss, 14), 1.0);
  const pkgLossKg = quantityKg * (effectivePackLossPct / 100);
  const pkgLossAmount = pkgLossKg * pricePerKg;

  // 3. Saved crop
  const savedKg = Math.max(unpkgLossKg - pkgLossKg, 0);
  const savedAmount = Math.max(unpkgLossAmount - pkgLossAmount, 0);

  // 4. Packaging investment
  const effectivePkgUnitCost = customPkgCost + (useMapGasFlush ? 0.4 : 0);
  const totalPkgCost = quantityKg * effectivePkgUnitCost;

  // 5. Net extra profit
  const netExtraProfit = savedAmount - totalPkgCost;

  // 6. Return on Investment (ROI)
  const roiPct = totalPkgCost > 0 ? Math.round((netExtraProfit / totalPkgCost) * 100) : 0;

  // 7. Shelf life gain
  const totalShelfGain = selectedCrop.shelfLifeGainDays + (useMapGasFlush ? 5 : 0);

  // Read calculation aloud in the active language
  const handleSpeakCalculation = () => {
    if (isSpeaking && onStopSpeaking) {
      onStopSpeaking();
      return;
    }
    if (!onSpeakText) return;

    const cropName = getLocalizedCropName(selectedCrop);

    let speech = '';
    if (currentLanguage === 'en') {
      speech = `Calculation for ${quantityKg.toLocaleString('en-IN')} kg of ${cropName}: Without smart packaging, ₹${Math.round(unpkgLossAmount).toLocaleString('en-IN')} worth of produce would rot. Recommended packaging cost is ₹${Math.round(totalPkgCost).toLocaleString('en-IN')}. By preventing spoilage, you save ₹${Math.round(savedAmount).toLocaleString('en-IN')} worth of produce. Your net extra profit is ₹${Math.round(netExtraProfit).toLocaleString('en-IN')} with an ROI of ${roiPct} percent, extending shelf life by ${totalShelfGain} days.`;
    } else if (currentLanguage === 'mr') {
      speech = `${cropName} च्या ${quantityKg.toLocaleString('en-IN')} किलोवर गणना: योग्य पॅकेजिंगशिवाय ₹${Math.round(unpkgLossAmount).toLocaleString('en-IN')} चे नुकसान झाले असते. पॅकेजिंगचा खर्च ₹${Math.round(totalPkgCost).toLocaleString('en-IN')} येईल. यामुळे तुमचा ₹${Math.round(savedAmount).toLocaleString('en-IN')} चा शेतमाल वाचेल आणि निव्वळ नफा ₹${Math.round(netExtraProfit).toLocaleString('en-IN')} वाढेल.`;
    } else {
      // Default to Hindi
      speech = `${cropName} के ${quantityKg.toLocaleString('en-IN')} किलो पर गणना: बिना सही पैकेजिंग के ₹${Math.round(unpkgLossAmount).toLocaleString('en-IN')} की फसल सड़कर खराब हो सकती थी। सुझाई गई पैकेजिंग की कुल लागत ₹${Math.round(totalPkgCost).toLocaleString('en-IN')} आएगी। इससे आपकी ₹${Math.round(savedAmount).toLocaleString('en-IN')} की फसल बचेगी, और शुद्ध अतिरिक्त मुनाफा ₹${Math.round(netExtraProfit).toLocaleString('en-IN')} बढ़ेगा। निवेश पर रिटर्न ${roiPct} प्रतिशत है।`;
    }

    onSpeakText(speech);
  };

  // WhatsApp share
  const handleShareWhatsApp = () => {
    const cropName = getLocalizedCropName(selectedCrop);
    const text = currentLanguage === 'en'
      ? `🌾 *PackWise AI - Food Packaging Savings Report*\n` +
        `Produce: ${cropName} (${selectedCrop.emoji})\n` +
        `Quantity: ${quantityKg.toLocaleString('en-IN')} kg\n` +
        `Mandi Rate: ₹${pricePerKg}/kg\n` +
        `Produce Saved from Spoilage: ${Math.round(savedKg).toLocaleString('en-IN')} kg (Value: ₹${Math.round(savedAmount).toLocaleString('en-IN')})\n` +
        `Packaging Investment: ₹${Math.round(totalPkgCost).toLocaleString('en-IN')}\n` +
        `💰 *Net Extra Profit: +₹${Math.round(netExtraProfit).toLocaleString('en-IN')}*\n` +
        `📈 *ROI: ${roiPct}%* | Extra Shelf Life: +${totalShelfGain} days\n` +
        `Recommended Packaging: ${getLocalizedPkgMaterial(selectedCrop)}`
      : `🌾 *PackWise AI - खाद्य पैकेजिंग बचत रिपोर्ट*\n` +
        `फसल: ${cropName} (${selectedCrop.emoji})\n` +
        `मात्रा: ${quantityKg.toLocaleString('en-IN')} kg\n` +
        `मंडी भाव: ₹${pricePerKg}/kg\n` +
        `बर्बादी से बचाई फसल: ${Math.round(savedKg).toLocaleString('en-IN')} kg (मूल्य: ₹${Math.round(savedAmount).toLocaleString('en-IN')})\n` +
        `पैकेजिंग खर्च: ₹${Math.round(totalPkgCost).toLocaleString('en-IN')}\n` +
        `💰 *शुद्ध अतिरिक्त मुनाफा: +₹${Math.round(netExtraProfit).toLocaleString('en-IN')}*\n` +
        `📈 *ROI: ${roiPct}%* | अतिरिक्त ताज़गी: +${totalShelfGain} दिन\n` +
        `सुझाई गई पैकेजिंग: ${getLocalizedPkgMaterial(selectedCrop)}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Banner */}
      <div className="mb-8 p-5 sm:p-7 rounded-3xl glass-card-gold border border-amber-500/40 shadow-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-emerald-400 p-[1.5px] shadow-lg shadow-amber-500/25 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Calculator className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-1.5">
              <Coins className="w-3.5 h-3.5" />
              <span>{t.calculator} • {selectedCrop.emoji} {getLocalizedCropName(selectedCrop)}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-['Outfit'] tracking-tight">
              {t.calcHeroTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {t.calcHeroSubtitle}
            </p>
          </div>
        </div>

        {/* Action Buttons: Speak & Print */}
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
          <button
            onClick={handleSpeakCalculation}
            className="flex-1 sm:flex-none px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-xl shadow-amber-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? t.stopSpeakingBtn : t.speakCalculationBtn}</span>
          </button>

          <button
            onClick={() => setShowSlipModal(true)}
            className="px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center gap-2"
            title={t.printSlipBtn}
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span className="hidden lg:inline">{t.printSlipBtn}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs (Left) & Live Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Inputs (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Produce Quick Chips */}
          <div className="p-4 sm:p-5 rounded-3xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-white uppercase tracking-wider block">
                {t.selectProduce}
              </label>
              <span className="text-[11px] font-mono text-amber-300 font-bold">
                12 Indian Produce Presets
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {COMMODITY_PRESETS.map((crop) => {
                const isSelected = selectedCrop.id === crop.id;
                const cropName = getLocalizedCropName(crop);
                return (
                  <button
                    key={crop.id}
                    onClick={() => handleCropChange(crop)}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/30 scale-[1.03] border-2 border-yellow-200'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    <span className="text-2xl mb-1">{crop.emoji}</span>
                    <span className="text-[11px] font-bold leading-tight truncate w-full">
                      {cropName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders and Quantity Form */}
          <div className="p-5 sm:p-6 rounded-3xl glass-card border border-white/10 space-y-5">
            {/* Quantity Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={qtyInputId} className="font-bold text-white flex items-center gap-1.5 cursor-pointer">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>{t.produceQuantity}</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-amber-300 font-extrabold text-sm">
                    {quantityKg.toLocaleString('en-IN')} kg
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ({(quantityKg / 100).toFixed(1)} {t.quintal})
                  </span>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[100, 500, 1000, 2500, 5000, 10000, 20000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setQuantityKg(preset)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                      quantityKg === preset
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {preset >= 1000 ? `${preset / 1000}T` : `${preset}kg`}
                  </button>
                ))}
              </div>

              <input
                id={qtyInputId}
                type="range"
                min="50"
                max="25000"
                step="50"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                aria-label={t.produceQuantity}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>50 kg</span>
                <span>5,000 kg (50 {t.quintal})</span>
                <span>25,000 kg (250 {t.quintal})</span>
              </div>
            </div>

            {/* Price Per Kg */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={priceInputId} className="font-bold text-white flex items-center gap-1.5 cursor-pointer">
                  <Coins className="w-4 h-4 text-emerald-400" />
                  <span>{t.marketPrice}</span>
                </label>
                <span className="font-mono text-emerald-300 font-extrabold text-sm">
                  ₹{pricePerKg} / kg
                </span>
              </div>
              <input
                id={priceInputId}
                type="range"
                min="10"
                max="600"
                step="5"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(Number(e.target.value))}
                aria-label={t.marketPrice}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>₹10/kg</span>
                <span>₹300/kg</span>
                <span>₹600/kg</span>
              </div>
            </div>

            {/* Travel Distance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={distanceInputId} className="font-bold text-white flex items-center gap-1.5 cursor-pointer">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>{t.mandiDistance}</span>
                </label>
                <span className="font-mono text-cyan-300 font-extrabold text-sm">
                  {distanceKm} km
                </span>
              </div>
              <input
                id={distanceInputId}
                type="range"
                min="20"
                max="1500"
                step="20"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                aria-label={t.mandiDistance}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>20 km (Local)</span>
                <span>500 km (State)</span>
                <span>1,500 km (National)</span>
              </div>
            </div>

            {/* Packaging Cost per kg */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={pkgCostInputId} className="font-bold text-white flex items-center gap-1.5 cursor-pointer">
                  <Leaf className="w-4 h-4 text-amber-400" />
                  <span>{t.packagingCostRate}</span>
                </label>
                <span className="font-mono text-amber-300 font-extrabold text-sm">
                  ₹{customPkgCost.toFixed(2)} / kg
                </span>
              </div>
              <input
                id={pkgCostInputId}
                type="range"
                min="0.4"
                max="12.0"
                step="0.2"
                value={customPkgCost}
                onChange={(e) => setCustomPkgCost(Number(e.target.value))}
                aria-label={t.packagingCostRate}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>₹0.40/kg (Basic)</span>
                <span>₹5.00/kg (Barrier)</span>
                <span>₹12.00/kg (Vacuum/EVOH)</span>
              </div>
            </div>

            {/* Cold Chain Toggle */}
            <div className="pt-2 flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Snowflake className="w-4 h-4 text-cyan-400" />
                  <span>{t.reeferVanTitle}</span>
                </span>
                <p className="text-[11px] text-slate-400">{t.reeferVanDesc}</p>
              </div>
              <button
                type="button"
                onClick={() => setUseReeferCold(!useReeferCold)}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                  useReeferCold ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    useReeferCold ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* MAP Nitrogen Flush Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-colors">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  <span>{t.mapFlushTitle}</span>
                </span>
                <p className="text-[11px] text-slate-400">{t.mapFlushDesc}</p>
              </div>
              <button
                type="button"
                onClick={() => setUseMapGasFlush(!useMapGasFlush)}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                  useMapGasFlush ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    useMapGasFlush ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Calculated Profits & ROI (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          {/* Big Profit Hero Card */}
          <div className="p-6 sm:p-7 rounded-3xl glass-card border border-emerald-500/40 shadow-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-4xl">{selectedCrop.emoji}</span>
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                    {t.netExtraProfitTitle}
                  </span>
                  <h3 className="text-xl font-black text-white font-['Outfit']">
                    {getLocalizedCropName(selectedCrop)} ({selectedCrop.nameEn})
                  </h3>
                </div>
              </div>

              <span className="px-3.5 py-1.5 rounded-xl font-mono text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-sm">
                <TrendingUp className="w-4 h-4" />
                {roiPct}% ROI
              </span>
            </div>

            {/* Main Money Figure */}
            <div className="text-center py-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                {t.calcHeroTitle}
              </span>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-400 font-['Outfit'] tracking-tight mt-1">
                +₹{Math.round(netExtraProfit).toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-emerald-300/80 mt-1.5 font-medium">
                ({currentLanguage === 'en'
                  ? 'Extra money in farmer pocket after deducting all packaging costs'
                  : 'पैकेजिंग का पूरा खर्च काटकर किसान की जेब में बची अतिरिक्त शुद्ध रकम'})
              </p>
            </div>

            {/* Spoilage Visual Comparison Bar */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">{t.spoilageComparison}</span>
                <span className="text-emerald-400 font-mono">
                  {selectedCrop.typicalLossPct}% ➔ {effectivePackLossPct.toFixed(1)}%
                </span>
              </div>
              <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5">
                <div
                  className="bg-rose-500/80 h-full rounded-l-full transition-all duration-300"
                  style={{ width: `${selectedCrop.typicalLossPct}%` }}
                  title={`${t.traditionalLoss}: ${selectedCrop.typicalLossPct}%`}
                />
                <div
                  className="bg-emerald-400 h-full rounded-r-full transition-all duration-300"
                  style={{ width: `${effectivePackLossPct}%` }}
                  title={`${t.smartPackLoss}: ${effectivePackLossPct.toFixed(1)}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  {t.traditionalLoss} ({selectedCrop.typicalLossPct}%)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {t.smartPackLoss} ({effectivePackLossPct.toFixed(1)}%)
                </span>
              </div>
            </div>

            {/* 4 Key Comparison Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Metric 1: Spoilage Saved */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 block">{t.spoilageSavedTitle}</span>
                <p className="text-lg font-black text-white">
                  {Math.round(savedKg).toLocaleString('en-IN')} kg
                </p>
                <p className="text-[10px] text-emerald-400 font-mono font-bold">
                  {currentLanguage === 'en' ? 'Value: ₹' : 'मूल्य: ₹'}{Math.round(savedAmount).toLocaleString('en-IN')}
                </p>
              </div>

              {/* Metric 2: Packaging Cost */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 block">{t.packagingCostTitle}</span>
                <p className="text-lg font-black text-amber-300">
                  ₹{Math.round(totalPkgCost).toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {currentLanguage === 'en'
                    ? `(₹${effectivePkgUnitCost.toFixed(2)}/kg rate)`
                    : `(₹${effectivePkgUnitCost.toFixed(2)}/kg दर)`}
                </p>
              </div>

              {/* Metric 3: Shelf Life Gain */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 block">{t.extraFreshnessTitle}</span>
                <p className="text-lg font-black text-cyan-300">
                  +{totalShelfGain} {t.daysUnit}
                </p>
                <p className="text-[10px] text-cyan-400 font-mono font-bold">
                  {selectedCrop.storageTemp}
                </p>
              </div>

              {/* Metric 4: Spoilage Drop */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <span className="text-[11px] text-slate-400 block">{t.spoilageDropTitle}</span>
                <p className="text-lg font-black text-emerald-300">
                  -{(selectedCrop.typicalLossPct - effectivePackLossPct).toFixed(1)}%
                </p>
                <p className="text-[10px] text-emerald-400 font-mono font-bold">
                  {currentLanguage === 'en' ? 'Major spoilage prevention' : 'सड़न में भारी रोकथाम'}
                </p>
              </div>
            </div>

            {/* Recommended Bag info */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold text-amber-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{t.recommendedPackTitle}</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {selectedCrop.fssaiStandard}
                </span>
              </div>
              <p className="text-sm font-black text-white pl-6">
                {getLocalizedPkgMaterial(selectedCrop)}
              </p>
              <p className="text-xs text-slate-300 pl-6 leading-relaxed">
                {currentLanguage === 'en'
                  ? 'This tailored barrier regulates respiration OTR and water vapor WVTR to maintain optimal cellular turgor without mold or weight loss.'
                  : 'यह थैली उत्पाद की श्वसन दर (Respiration Rate) और नमी को नियंत्रित करती है, जिससे वजन नहीं घटता और फफूंद नहीं लगती।'}
              </p>
            </div>

            {/* Share / WhatsApp Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{t.shareWhatsappBtn}</span>
              </button>

              <button
                onClick={() => setShowSlipModal(true)}
                className="py-3 px-4 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>{t.printSlipBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estimation Slip Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowSlipModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Slip Header */}
            <div className="text-center pb-4 border-b border-white/10 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PACKWISE AI • MANDI SAVINGS SLIP
              </div>
              <h3 className="text-2xl font-black text-white font-['Outfit']">
                {currentLanguage === 'en' ? 'Packaging Savings & Net Profit Receipt' : 'पैकेजिंग बचत व मुनाफा रसीद'}
              </h3>
              <p className="text-xs text-slate-400">
                {currentLanguage === 'en' ? 'Date: ' : 'दिनांक: '}
                {new Date().toLocaleDateString(currentLanguage === 'en' ? 'en-IN' : 'hi-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>

            {/* Slip Details */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">{currentLanguage === 'en' ? 'Produce:' : 'फसल / Produce:'}</span>
                <span className="font-bold text-white text-sm flex items-center gap-1">
                  <span>{selectedCrop.emoji}</span>
                  <span>{getLocalizedCropName(selectedCrop)}</span>
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">{currentLanguage === 'en' ? 'Quantity:' : 'मात्रा / Quantity:'}</span>
                <span className="font-mono font-bold text-white">
                  {quantityKg.toLocaleString('en-IN')} kg ({(quantityKg / 100).toFixed(1)} {t.quintal})
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">{currentLanguage === 'en' ? 'Market Rate:' : 'मंडी भाव / Market Rate:'}</span>
                <span className="font-mono font-bold text-emerald-400">₹{pricePerKg} / kg</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">{currentLanguage === 'en' ? 'Saved from Spoilage:' : 'बर्बादी से बचाई फसल:'}</span>
                <span className="font-mono font-bold text-emerald-300">
                  {Math.round(savedKg).toLocaleString('en-IN')} kg ({currentLanguage === 'en' ? 'Value: ₹' : 'मूल्य: ₹'}{Math.round(savedAmount).toLocaleString('en-IN')})
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">{currentLanguage === 'en' ? 'Total Packaging Cost:' : 'पैकेजिंग कुल लागत:'}</span>
                <span className="font-mono font-bold text-amber-300">₹{Math.round(totalPkgCost).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-amber-500/40 bg-emerald-500/10 px-3 rounded-xl">
                <span className="font-bold text-emerald-300">
                  {currentLanguage === 'en' ? 'Net Extra Profit:' : 'शुद्ध अतिरिक्त मुनाफा (Net Profit):'}
                </span>
                <span className="font-mono font-black text-emerald-400 text-base">
                  +₹{Math.round(netExtraProfit).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">{currentLanguage === 'en' ? 'Return on Investment (ROI):' : 'निवेश पर रिटर्न (ROI):'}</span>
                <span className="font-mono font-bold text-cyan-300">{roiPct}% ROI</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-slate-400">{currentLanguage === 'en' ? 'Extra Freshness Shelf Life:' : 'अतिरिक्त ताज़गी अवधि:'}</span>
                <span className="font-mono font-bold text-white">+{totalShelfGain} {t.daysUnit}</span>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block mb-1">
                  {currentLanguage === 'en' ? 'Recommended Packaging Bag:' : 'सुझाई गई पैकेजिंग थैली:'}
                </span>
                <p className="font-bold text-amber-300 text-xs bg-white/5 p-2.5 rounded-xl border border-white/10">
                  {getLocalizedPkgMaterial(selectedCrop)}
                </p>
              </div>
            </div>

            {/* Slip Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{currentLanguage === 'en' ? 'Print Slip' : 'प्रिंट करें (Print)'}</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{currentLanguage === 'en' ? 'WhatsApp Share' : 'व्हाट्सएप शेयर'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
