import React, { useState, useEffect } from 'react';
import {
  Wheat,
  AlertCircle,
  Volume2,
  VolumeX,
  Camera,
  CheckCircle2,
  Globe,
  Sparkles,
  ArrowRight,
  Search,
  Thermometer,
  Clock,
  ShieldAlert,
  Package,
  Database,
  ThumbsUp,
  ThumbsDown,
  Sun,
  Wind,
  Check,
  X,
  Coins,
  Eye,
  Sliders,
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../i18n/translations';
import { LiveCropScannerModal } from './LiveCropScannerModal';
import { generateFoodPackagingAdviceAsync } from '../services/aiFoodAdvisor';
import { saveFarmerRecord } from '../services/api';

interface FarmerSimpleModeProps {
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onSpeakText?: (text: string) => void;
  isSpeaking?: boolean;
  onStopSpeaking?: () => void;
  onOpenDataStore?: () => void;
  onOpenScanCamera?: () => void;
  onOpenCalculator?: () => void;
}

interface CropItem {
  id: string;
  hindi: string;
  english: string;
  emoji: string;
  cropImage: string;
  pkgImage: string;
  pkgNameHindi: string;
  pkgNameEn: string;
  category: string;
  defaultPkg: string;
  defaultTemp: string;
  defaultDays: string;
  defaultWhy: string;
  defaultWarning: string;
  dosText: string;
  dontsText: string;
  spokenAudioText: string;
  savingsPer100kg: number;
}

export const VISUAL_CROPS: CropItem[] = [
  {
    id: 'tomato',
    hindi: 'टमाटर',
    english: 'Tomato',
    emoji: '🍅',
    cropImage: '/images/crops/tomato.jpg',
    pkgImage: '/images/packaging/plastic_crates.jpg',
    pkgNameHindi: 'हवादार प्लास्टिक क्रेट या सूक्ष्म-छिद्रित पाउच',
    pkgNameEn: 'Ventilated Plastic Crates / Micro-Perforated Pouch',
    category: 'सब्जी (Vegetable)',
    defaultPkg: 'हवादार प्लास्टिक क्रेट या सूक्ष्म-छिद्रित एंटी-फॉग पाउच',
    defaultTemp: '10°C से 13°C (छायादार ठंडी जगह)',
    defaultDays: '14 से 18 दिन (सामान्य से 3 गुना ज्यादा)',
    defaultWhy: 'टमाटर सांस लेता है और पसीना छोड़ता है। हवादार क्रेट में पानी की बूंदें नहीं जमती जिससे टमाटर सड़ता नहीं है।',
    defaultWarning: 'सीधे तेज धूप में कभी न रखें और बिना हवा वाली थैली में बंद न करें।',
    dosText: 'हवादार जालीदार क्रेट में रखें और छायादार ठंडी जगह (10-13°C) पर रखें।',
    dontsText: 'कड़क धूप में न छोड़ें और बिना छेद वाली पन्नी में बंद न करें।',
    spokenAudioText: 'टमाटर को धूप में न छोड़ें। हवादार प्लास्टिक क्रेट या जालीदार थैली में रखें। 10 से 13 डिग्री ठंडी छाया में रखने से 15 से 18 दिन तक टमाटर बिल्कुल ताज़ा रहेगा।',
    savingsPer100kg: 4200,
  },
  {
    id: 'potato',
    hindi: 'आलू',
    english: 'Potato',
    emoji: '🥔',
    cropImage: '/images/crops/potato.jpg',
    pkgImage: '/images/packaging/jute_sack.jpg',
    pkgNameHindi: 'पारंपरिक जूट की बोरी या लाल जालीदार बैग',
    pkgNameEn: 'Breathable Jute Gunny Sack / Leno Bag',
    category: 'सब्जी (Vegetable)',
    defaultPkg: 'हवादार जूट बोरी या जालीदार बैग (Leno Mesh Bag)',
    defaultTemp: 'सूखा और हवादार स्थान (8°C - 10°C)',
    defaultDays: '60 से 90 दिन',
    defaultWhy: 'आलू को खुली सूखी हवा चाहिए। प्लास्टिक की थैली में पसीना आने से आलू सड़ने और अंकुरित होने लगता है।',
    defaultWarning: 'आलू को सीधे तेज रोशनी या धूप में न रखें, वर्ना यह हरा और जहरीला हो जाएगा।',
    dosText: 'जूट की बोरी में रखें, फर्श से ऊपर लकड़ी के फट्टे पर और अंधेरे सूखे कमरे में रखें।',
    dontsText: 'धूप में न रखें (आलू हरा हो जाएगा) और प्लास्टिक की बंद थैली में न बांधें।',
    spokenAudioText: 'आलू को जूट की बोरी में रखें। इसे धूप से दूर अंधेरे और हवादार कमरे में रखें। प्लास्टिक थैली में पसीना आने से आलू सड़ जाएगा। जूट की बोरी में 3 महीने तक सुरक्षित रहेगा।',
    savingsPer100kg: 2800,
  },
  {
    id: 'onion',
    hindi: 'प्याज',
    english: 'Onion',
    emoji: '🧅',
    cropImage: '/images/crops/onion.jpg',
    pkgImage: '/images/packaging/leno_mesh.jpg',
    pkgNameHindi: 'लाल जालीदार बोरी (Leno Mesh Bag)',
    pkgNameEn: 'Red Ventilated Leno Mesh Net Bag',
    category: 'सब्जी (Vegetable)',
    defaultPkg: 'लाल जालीदार बोरी (Leno Mesh Bag)',
    defaultTemp: 'सूखा, ठंडा व हवादार गोदाम',
    defaultDays: '60 से 90 दिन',
    defaultWhy: 'जालीदार बोरी से चारों तरफ से हवा मिलती है और फफूंद नहीं लगती।',
    defaultWarning: 'प्याज को कभी भी प्लास्टिक की बंद थैली में न बांधें और आलू के पास न रखें।',
    dosText: 'हवादार लाल जाली की बोरी में रखें और चारों तरफ खुली हवा आने दें।',
    dontsText: 'प्लास्टिक की थैली में सील न करें और सीलन वाली गीली जगह पर न रखें।',
    spokenAudioText: 'प्याज को लाल जालीदार बोरी में रखें ताकि चारों तरफ से हवा लगे। इसे कभी प्लास्टिक की थैली में न बांधें वर्ना सड़न लग जाएगी। सूखी हवा में 2 से 3 महीने तक प्याज नहीं सड़ेगा।',
    savingsPer100kg: 3400,
  },
  {
    id: 'mango',
    hindi: 'आम',
    english: 'Mango',
    emoji: '🥭',
    cropImage: '/images/crops/mango.jpg',
    pkgImage: '/images/packaging/plastic_crates.jpg',
    pkgNameHindi: 'गद्देदार लकड़ी/प्लास्टिक क्रेट + फोम जाली',
    pkgNameEn: 'Straw/Foam Cushioned Harvest Crate',
    category: 'फल (Fruit)',
    defaultPkg: 'हवादार पाउच + फोम जाली (Foam Net + Perforated Pouch)',
    defaultTemp: '12°C से 14°C (छायादार कमरा)',
    defaultDays: '15 से 20 दिन',
    defaultWhy: 'फोम जाली से सफर में आम पिचकता या दबता नहीं है और हवादार पाउच फल को प्राकृतिक रूप से सांस लेने देता है।',
    defaultWarning: 'गीले या बारिश में भीगे आम को तुरंत पैक न करें। पहले छाया में सुखा लें।',
    dosText: 'घास-फूस या फोम की जाली लगाकर हवादार क्रेट में रखें ताकि आम दबकर न फटे।',
    dontsText: 'गीले आम को बंद न करें और 10 डिग्री से ज्यादा ठंडा न करें वर्ना छिलके पर काले धब्बे पड़ेंगे।',
    spokenAudioText: 'आम को घास या फोम की जाली लगाकर हवादार क्रेट में रखें। भीगे आम को पहले सुखा लें। 12 से 14 डिग्री पर रखने से 20 दिन तक आम मीठा और ताज़ा रहेगा।',
    savingsPer100kg: 6500,
  },
  {
    id: 'banana',
    hindi: 'केला',
    english: 'Banana',
    emoji: '🍌',
    cropImage: '/images/crops/banana.jpg',
    pkgImage: '/images/packaging/perforated_pouch.jpg',
    pkgNameHindi: 'एथिलीन सोखने वाला हवादार पाउच',
    pkgNameEn: 'Perforated Ethylene Scrubber Pouch',
    category: 'फल (Fruit)',
    defaultPkg: 'एथिलीन सोखने वाला विशेष पाउच (Ethylene Absorber MAP)',
    defaultTemp: '13°C से 15°C (कभी फ्रिज में न रखें)',
    defaultDays: '18 से 25 दिन',
    defaultWhy: 'केला पकते समय एथिलीन गैस छोड़ता है। यह पाउच उस गैस को सोख लेता है ताकि केला जल्दी काला न पड़े।',
    defaultWarning: 'केले को 12°C से नीचे रखने पर उसका छिलका काला पड़ जाता है और स्वाद खराब हो जाता है।',
    dosText: 'हवादार पाउच में रखें और 13 से 15 डिग्री सामान्य तापमान पर रखें।',
    dontsText: 'फ्रिज या बर्फ में कभी न रखें वर्ना छिलका काला पड़ जाएगा और अंदर से गल जाएगा।',
    spokenAudioText: 'केले को कभी फ्रिज में न रखें वर्ना छिलका काला पड़ जाएगा। हवादार थैली में 13 से 15 डिग्री पर रखें, 20 दिन तक केला हरा और ताज़ा रहेगा।',
    savingsPer100kg: 3800,
  },
  {
    id: 'chilli',
    hindi: 'हरी मिर्च',
    english: 'Green Chilli',
    emoji: '🌶️',
    cropImage: '/images/crops/chilli.jpg',
    pkgImage: '/images/packaging/perforated_pouch.jpg',
    pkgNameHindi: 'सूक्ष्म-छिद्रित एंटी-फॉग पाउच',
    pkgNameEn: 'Micro-Perforated Anti-Fog Pouch',
    category: 'सब्जी (Vegetable)',
    defaultPkg: 'सूक्ष्म-छिद्रित एंटी-फॉग पाउच (Micro-Perforated Pouch)',
    defaultTemp: '8°C से 10°C',
    defaultDays: '18 से 24 दिन',
    defaultWhy: 'यह पाउच डंठल को हरा रखता है और मिर्च को सूखने या झुर्रीदार होने से बचाता है।',
    defaultWarning: 'मिर्च के डंठल न तोड़ें। बिना डंठल वाली मिर्च जल्दी सड़ जाती है।',
    dosText: 'डंठल सहित सूक्ष्म-छिद्रित थैली में रखें ताकि मिर्च हरी और तीखी रहे।',
    dontsText: 'डंठल तोड़कर न रखें और बिना छेद वाली पॉलीथीन में बंद न करें।',
    spokenAudioText: 'हरी मिर्च के डंठल कभी न तोड़ें। सूक्ष्म-छिद्रित थैली में 8 से 10 डिग्री पर रखें। 3 हफ्ते तक मिर्च हरी, कड़क और ताज़ा रहेगी।',
    savingsPer100kg: 5000,
  },
  {
    id: 'spinach',
    hindi: 'पालक व हरी सब्जियां',
    english: 'Spinach & Greens',
    emoji: '🥬',
    cropImage: '/images/crops/spinach.jpg',
    pkgImage: '/images/packaging/perforated_pouch.jpg',
    pkgNameHindi: 'एंटी-फॉग हाई-रेस्पिरेशन पाउच',
    pkgNameEn: 'Anti-Fog Fresh Produce Pouch',
    category: 'पत्तेदार सब्जी',
    defaultPkg: 'एंटी-फॉग बीओपीपी पाउच (Anti-Fog High Respiration Film)',
    defaultTemp: '0°C से 2°C (ठंडी जगह / बर्फ की जाली)',
    defaultDays: '10 से 14 दिन (खुले में सिर्फ 1-2 दिन)',
    defaultWhy: 'पत्ते बहुत तेजी से सूखते हैं। एंटी-फॉग थैली पत्तों को हरा, चमकदार और कुरकुरा रखती है।',
    defaultWarning: 'पैकिंग से पहले पत्तों से पीली पत्तियां और गीला कीचड़ साफ कर लें।',
    dosText: 'साफ करके एंटी-फॉग थैली में रखें और ठंडी जगह पर रखें।',
    dontsText: 'खुले में धूप या हवा में न छोड़ें वर्ना 1 दिन में पत्ते सूखकर पीले हो जाएंगे।',
    spokenAudioText: 'पालक और हरी सब्जियों को एंटी-फॉग थैली में रखें। खुली धूप में 1 दिन में पत्तियां सूख जाती हैं। थैली में रखने से 10 से 14 दिन तक हरी और ताज़ा रहेगी।',
    savingsPer100kg: 4000,
  },
  {
    id: 'apple',
    hindi: 'सेब',
    english: 'Apple',
    emoji: '🍎',
    cropImage: '/images/crops/apple.jpg',
    pkgImage: '/images/packaging/plastic_crates.jpg',
    pkgNameHindi: 'मोल्डेड ट्रे + हवादार लकड़ी/प्लास्टिक क्रेट',
    pkgNameEn: 'Molded Fruit Tray in Ventilated Crate',
    category: 'फल (Fruit)',
    defaultPkg: 'छिद्रित एलडीपीई पाउच व मोल्डेड ट्रे (Molded Tray + Pouch)',
    defaultTemp: '0°C से 4°C (कोल्ड स्टोरेज)',
    defaultDays: '60 से 90 दिन',
    defaultWhy: 'ट्रे में सेब एक-दूसरे से टकराते नहीं और दाग-धब्बे नहीं पड़ते।',
    defaultWarning: 'सेब के साथ पत्तेदार सब्जियों को न रखें वर्ना सब्जियां जल्दी पीली पड़ जाएंगी।',
    dosText: 'मोल्डेड ट्रे में एक-एक सेब अलग रखें ताकि आपस में रगड़ न खाएं।',
    dontsText: 'बोरी में ठूंसकर न भरें और तेज गर्मी में न रखें।',
    spokenAudioText: 'सेब को मोल्डेड ट्रे में हवादार पेटी में रखें। कोल्ड स्टोर में 0 से 4 डिग्री पर 3 महीने तक सेब कड़क और रसीला बना रहता है।',
    savingsPer100kg: 7000,
  },
  {
    id: 'grapes',
    hindi: 'अंगूर',
    english: 'Grapes',
    emoji: '🍇',
    cropImage: '/images/crops/grapes.jpg',
    pkgImage: '/images/packaging/perforated_pouch.jpg',
    pkgNameHindi: 'हवादार प्लास्टिक पनेट ट्रे + SO₂ पैड',
    pkgNameEn: 'Ventilated Punnet Box with SO₂ Pad',
    category: 'फल (Fruit)',
    defaultPkg: 'सल्फर डाइआक्साइड पैड युक्त छिद्रित पाउच (SO₂ Sheet + Pouch)',
    defaultTemp: '-0.5°C से 1°C (90-95% नमी)',
    defaultDays: '30 से 45 दिन',
    defaultWhy: 'अंगूर में बहुत जल्दी फफूंद (ग्रे मोल्ड) लगती है। SO₂ शीट फफूंद को रोकती है और डंठल हरा रखती है।',
    defaultWarning: 'अंगूर को पैक करने से पहले न धोएं, बेचने या खाने से पहले ही धोएं।',
    dosText: 'हवादार पनेट बॉक्स में SO₂ पैड के साथ 0 डिग्री ठंडक में रखें।',
    dontsText: 'पैक करने से पहले अंगूर को पानी से न धोएं और धूप में न रखें।',
    spokenAudioText: 'अंगूर को पैक करने से पहले कभी न धोएं। हवादार प्लास्टिक ट्रे में 0 डिग्री पर रखें। 1 महीने से ज्यादा अंगूर मीठा और ताज़ा रहेगा।',
    savingsPer100kg: 8000,
  },
  {
    id: 'green_chilli',
    hindi: 'हरी मिर्च',
    english: 'Green Chilli',
    emoji: '🌶️',
    cropImage: '/images/crops/tomato.jpg',
    pkgImage: '/images/packaging/perforated_pouch.jpg',
    pkgNameHindi: 'एंटी-फॉग सूक्ष्म-छिद्रित पाउच',
    pkgNameEn: 'Anti-Fog Micro-Perforated Pouch',
    category: 'सब्जी (Vegetable)',
    defaultPkg: 'एंटी-फॉग छिद्रित प्लास्टिक थैली (Micro-Perforated PP)',
    defaultTemp: '8°C से 10°C (ठंडी जगह)',
    defaultDays: '20 से 25 दिन',
    defaultWhy: 'हरी मिर्च के डंठल से पानी तेजी से उड़ता है। एंटी-फॉग थैली में पसीना नहीं जमता जिससे डंठल काला नहीं पड़ता।',
    defaultWarning: 'बिना छेद वाली पन्नी में न बांधें वर्ना मिर्च गलकर सड़ जाएगी।',
    dosText: 'डंठल सहित रखें और छिद्रित एंटी-फॉग पाउच में 8-10 डिग्री पर रखें।',
    dontsText: 'गीली मिर्च न पैक करें और डंठल न तोड़ें।',
    spokenAudioText: 'हरी मिर्च को डंठल सहित रखें। एंटी-फॉग छिद्रित थैली में पैक करें। 8 से 10 डिग्री तापमान पर मिर्च 25 दिन तक हरी और तीखी रहेगी।',
    savingsPer100kg: 3800,
  },
  {
    id: 'okra',
    hindi: 'भिंडी',
    english: 'Okra (Bhindi)',
    emoji: '🥬',
    cropImage: '/images/crops/spinach.jpg',
    pkgImage: '/images/packaging/plastic_crates.jpg',
    pkgNameHindi: 'हवादार प्लास्टिक क्रेट या जालीदार बैग',
    pkgNameEn: 'Ventilated Crates / Breathable Bag',
    category: 'सब्जी (Vegetable)',
    defaultPkg: 'हवादार क्रेट या लेज़र-छिद्रित थैली (Laser-Perforated LDPE)',
    defaultTemp: '9°C से 11°C (बहुत ठंडे फ्रिज में न रखें)',
    defaultDays: '12 से 14 दिन',
    defaultWhy: 'भिंडी 7°C से कम ठंड में रखने पर काली पड़ जाती है (चिलिंग इंजरी)। हवादार क्रेट में भिंडी मुलायम रहती है।',
    defaultWarning: 'भिंडी को कभी 7 डिग्री से नीचे वाले फ्रिज में न रखें वर्ना वह काली पड़ जाएगी।',
    dosText: 'हवादार क्रेट में रखें और छायादार जगह पर 9-11 डिग्री पर रखें।',
    dontsText: 'बर्फ या बहुत ठंडे डीप-फ्रीज में न रखें और गीली भिंडी न बांधें।',
    spokenAudioText: 'भिंडी को बहुत ज्यादा ठंड में न रखें वर्ना यह काली पड़ जाएगी। हवादार क्रेट में 9 से 11 डिग्री पर रखें। भिंडी 2 हफ्ते तक हरी और मुलायम रहेगी।',
    savingsPer100kg: 3200,
  },
  {
    id: 'guava',
    hindi: 'अमरूद',
    english: 'Guava (Amrood)',
    emoji: '🍈',
    cropImage: '/images/crops/apple.jpg',
    pkgImage: '/images/packaging/plastic_crates.jpg',
    pkgNameHindi: 'फोम नेट + हवादार पेटी',
    pkgNameEn: 'Foam Net + Vented Corrugated Box',
    category: 'फल (Fruit)',
    defaultPkg: 'फोम जाली (Foam Net) + छिद्रित एंटी-फॉग थैली',
    defaultTemp: '8°C से 10°C',
    defaultDays: '15 से 18 दिन',
    defaultWhy: 'अमरूद पर रगड़ लगने से दाग पड़ते हैं और पसीना जमने से फफूंद लगती है। फोम नेट रगड़ से बचाता है।',
    defaultWarning: 'अमरूद को एक-दूसरे पर दबाकर न रखें वर्ना छिलका दबकर काला पड़ जाएगा।',
    dosText: 'हर अमरूद पर फोम जाली चढ़ाएं और हवादार पेटी में रखें।',
    dontsText: 'बिना जाली के एक के ऊपर एक न लादें और तेज धूप में न रखें।',
    spokenAudioText: 'अमरूद को फोम जाली पहनाकर हवादार बॉक्स में रखें। 8 से 10 डिग्री तापमान पर अमरूद 18 दिन तक मीठा और बेदाग रहेगा।',
    savingsPer100kg: 4500,
  },
  {
    id: 'makhana',
    hindi: 'फूल मखाना',
    english: 'Phool Makhana',
    emoji: '⚪',
    cropImage: '/images/crops/rice.jpg',
    pkgImage: '/images/packaging/perforated_pouch.jpg',
    pkgNameHindi: 'नाइट्रोजन-सील्ड मेटलाइज्ड सिल्वर पाउच',
    pkgNameEn: 'Nitrogen-Flushed Metallized Silver Pouch',
    category: 'अनाज व मेवा (Nuts/Grains)',
    defaultPkg: 'नाइट्रोजन भरी चमकीली सिल्वर पाउच (Met-BOPP/PE)',
    defaultTemp: 'कमरे का तापमान (सूखी जगह)',
    defaultDays: '9 से 12 महीने',
    defaultWhy: 'मखाना हवा की नमी तुरंत खींच लेता है जिससे चबाने पर रबड़ जैसा हो जाता है। सिल्वर पाउच नमी को 100% रोकती है।',
    defaultWarning: 'खुले मुंह की थैली में न छोड़ें वर्ना 2 दिन में सीलन से कुरकुरापन खत्म हो जाएगा।',
    dosText: 'नाइट्रोजन-सीलबंद थैली में रखें और सूखी जगह पर रखें।',
    dontsText: 'नमी वाली जगह पर न रखें और खुली हवा में न छोड़ें।',
    spokenAudioText: 'मखाना हवा लगते ही सील जाता है। इसे हमेशा नाइट्रोजन भरी चमकीली थैली में पैक करें। साल भर मखाना कुरकुरा बना रहेगा।',
    savingsPer100kg: 12000,
  },
];

export const FarmerSimpleMode: React.FC<FarmerSimpleModeProps> = ({
  currentLanguage = 'hi',
  onLanguageChange,
  onSpeakText,
  isSpeaking = false,
  onStopSpeaking,
  onOpenDataStore,
  onOpenScanCamera,
  onOpenCalculator,
}) => {
  // Mode selection: 'visual' (100% Visual & Voice for uneducated / rural users) vs 'table' (standard)
  const [activeMode, setActiveMode] = useState<'visual' | 'table'>('visual');
  const [internalLang, setInternalLang] = useState<SupportedLanguage>(currentLanguage || 'hi');
  const [isCameraScannerOpen, setIsCameraScannerOpen] = useState<boolean>(false);
  const [selectedCrop, setSelectedCrop] = useState<CropItem>(VISUAL_CROPS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [batchBags, setBatchBags] = useState<number>(10); // 10 sacks (approx 500kg)
  const [autoVoiceEnabled, setAutoVoiceEnabled] = useState<boolean>(true);
  const [customAdvice, setCustomAdvice] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  useEffect(() => {
    if (currentLanguage) {
      setInternalLang(currentLanguage);
    }
  }, [currentLanguage]);

  const activeLang = onLanguageChange ? (currentLanguage || 'hi') : internalLang;
  const isEn = activeLang === 'en';
  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.hi;

  // Auto welcome voice guidance on mount
  useEffect(() => {
    if (activeMode === 'visual' && onSpeakText && autoVoiceEnabled) {
      const welcome =
        activeLang === 'hi'
          ? 'नमस्ते किसान भाई! नीचे दी गई अपनी फसल के फोटो पर हाथ लगाएं और सही थैली की आवाज़ सुनें।'
          : activeLang === 'mr'
          ? 'नमस्कार शेतकरी बंधूंनो! खालील पिकाच्या फोटोवर स्पर्श करा आणि योग्य पॅकेजिंगचा आवाज ऐका.'
          : activeLang === 'ta'
          ? 'வணக்கம் விவசாயி நண்பரே! கீழே உங்கள் பயிர் புகைப்படத்தைத் தொட்டு பேக்கேஜிங் வழிகாட்டலைக் கேளுங்கள்.'
          : 'Welcome! Tap your crop photo below to hear instant packaging and storage voice guidance.';
      onSpeakText(welcome);
    }
  }, [activeLang]);

  const handleLanguageSelect = (langCode: SupportedLanguage) => {
    setInternalLang(langCode);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  const handleSelectCrop = (crop: CropItem) => {
    setSelectedCrop(crop);
    setCustomAdvice(null);

    // Speak aloud in rural Hindi/English immediately if autoVoice is on or requested
    if (onSpeakText && autoVoiceEnabled) {
      const spoken =
        activeLang === 'en'
          ? `${crop.english}: Store in shaded cool space at ${crop.defaultTemp}. Recommended packaging is ${crop.pkgNameEn || crop.defaultPkg}. Stays fresh for ${crop.defaultDays}.`
          : crop.spokenAudioText;
      onSpeakText(spoken);
    }

    // Background Gemini scientific advice
    setIsAiThinking(true);
    generateFoodPackagingAdviceAsync(
      `${crop.english} packaging recommendation for Indian farmer`,
      activeLang
    )
      .then((aiResult) => {
        if (aiResult?.replyText) setCustomAdvice(aiResult.replyText);
      })
      .catch((e) => console.warn('Gemini advice fallback:', e))
      .finally(() => setIsAiThinking(false));
  };

  const handleManualSpeak = (text?: string) => {
    if (!onSpeakText) return;
    if (isSpeaking && onStopSpeaking) {
      onStopSpeaking();
      return;
    }
    const toSpeak =
      text ||
      (activeLang === 'en'
        ? `${selectedCrop.english}: Store at ${selectedCrop.defaultTemp}. Recommended packaging is ${selectedCrop.pkgNameEn || selectedCrop.defaultPkg}. Stays fresh for ${selectedCrop.defaultDays}. ${selectedCrop.dontsText}`
        : selectedCrop.spokenAudioText);
    onSpeakText(toSpeak);
  };

  const handleSaveToDataStore = async () => {
    const totalQtyKg = batchBags * 50; // 50kg per bag
    const estimatedSavings = Math.round((selectedCrop.savingsPer100kg * totalQtyKg) / 100);

    await saveFarmerRecord({
      farmer_name: 'Kisan Bhai',
      crop_name: selectedCrop.english,
      hindi_name: selectedCrop.hindi,
      quantity_kg: totalQtyKg,
      current_loss_pct: 22.0,
      recommended_package: isEn ? (selectedCrop.pkgNameEn || selectedCrop.defaultPkg) : selectedCrop.defaultPkg,
      storage_temp: selectedCrop.defaultTemp,
      projected_savings_inr: estimatedSavings,
      notes: selectedCrop.dosText,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);

    if (onSpeakText) {
      onSpeakText(
        isEn
          ? `Your ${selectedCrop.english} batch calculation has been saved into the Data Store.`
          : `आपका ${selectedCrop.hindi} का रिकॉर्ड डेटा स्टोर में सुरक्षित कर लिया गया है।`
      );
    }
  };

  const filteredCrops = VISUAL_CROPS.filter(
    (c) =>
      c.hindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalQtyKg = batchBags * 50;
  const estimatedSavings = Math.round((selectedCrop.savingsPer100kg * totalQtyKg) / 100);

  return (
    <section className="py-6 sm:py-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* Top Header & Mode Switcher */}
      <div className="mb-6 p-4 sm:p-5 rounded-3xl glass-card-gold border border-amber-500/40 shadow-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-[2px] shadow-lg shadow-amber-500/40 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl sm:text-3xl">
              🌾
            </div>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-1">
              <span>{isEn ? '🌟 Rural Farmer & Visual Voice Mode (100% Visual & Voice)' : '🌟 ग्रामीण किसान व सरल सचित्र मोड (100% Visual & Voice)'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white font-['Outfit']">
              {isEn ? 'Tap Crop Image — Instant Packaging & Audio Guidance' : 'चित्र छुएं — तुरंत सही थैली व आवाज़ सुनें'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {isEn ? 'No reading required! Just tap your crop photo and listen to clear spoken advice.' : 'पढ़ने-लिखने की कोई जरूरत नहीं! बस अपनी फसल का फोटो दबाएं और मोबाइल से आवाज़ सुनें।'}
            </p>
          </div>
        </div>

        {/* Mode Toggle & Auto Voice Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          {/* Auto-Voice Switch */}
          <button
            onClick={() => setAutoVoiceEnabled(!autoVoiceEnabled)}
            className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 border transition-all ${
              autoVoiceEnabled
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
            }`}
            title="Auto voice"
          >
            <Volume2 className="w-4 h-4" />
            <span>
              {autoVoiceEnabled
                ? (isEn ? '🔊 Voice: ON' : '🔊 आवाज़: चालू')
                : (isEn ? '🔇 Voice: OFF' : '🔇 आवाज़: बंद')}
            </span>
          </button>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveMode('visual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeMode === 'visual'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isEn ? 'Visual Mode' : 'चित्र मोड'}</span>
            </button>
            <button
              onClick={() => setActiveMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeMode === 'table'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isEn ? 'Calculator' : 'कैलकुलेटर'}</span>
            </button>
          </div>

          {/* Camera Scanner Button */}
          <button
            onClick={() => {
              if (onOpenScanCamera) onOpenScanCamera();
              else setIsCameraScannerOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/30 hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4" />
            <span>{isEn ? '📸 Scan Crop' : '📸 फोटो स्कैन'}</span>
          </button>
        </div>
      </div>

      {/* Language Quick Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
          <Globe className="w-4 h-4 text-amber-400" />
          <span>{isEn ? 'Select Language:' : 'अपनी भाषा (Language):'}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                activeLang === lang.code
                  ? 'bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 100% VISUAL & VOICE MODE FOR UNEDUCATED / RURAL FARMERS */}
      {/* ============================================================== */}
      {activeMode === 'visual' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* STEP 1: Big Visual Crop Selection Cards with REAL PHOTOS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center">
                  १
                </span>
                <h3 className="text-base sm:text-xl font-black text-white font-['Outfit']">
                  {isEn ? '1. Tap Your Crop Photo' : 'अपनी फसल का असली फोटो छुएं (Tap Your Crop)'}
                </h3>
              </div>

              {/* Quick Search */}
              <div className="relative w-40 sm:w-56">
                <input
                  type="text"
                  placeholder={isEn ? 'Search crop...' : 'फसल खोजें...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Grid of Real Crop Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
              {filteredCrops.map((crop) => {
                const isSelected = selectedCrop.id === crop.id;
                return (
                  <button
                    key={crop.id}
                    onClick={() => handleSelectCrop(crop)}
                    className={`group relative rounded-2xl overflow-hidden text-center transition-all cursor-pointer flex flex-col ${
                      isSelected
                        ? 'ring-4 ring-amber-400 shadow-2xl shadow-amber-500/40 scale-[1.05]'
                        : 'border border-white/15 bg-slate-900/80 hover:border-amber-400/50 hover:scale-[1.02]'
                    }`}
                  >
                    {/* Real Crop Photo */}
                    <div className="relative w-full aspect-square overflow-hidden bg-slate-950">
                      <img
                        src={crop.cropImage}
                        alt={isEn ? crop.english : crop.hindi}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-lg">
                          <Check className="w-4 h-4" />
                        </div>
                      )}

                      {/* Audio Icon Pill */}
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Hindi & English Label */}
                    <div className="p-2 bg-slate-950/90 flex flex-col items-center">
                      <span className="text-sm font-black text-white">{isEn ? crop.english : crop.hindi}</span>
                      <span className="text-[11px] text-amber-300 font-medium">{isEn ? crop.hindi : crop.english}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Selected Crop Guidance Hub (Massive Real Packaging Photos + Audio) */}
          <div className="p-4 sm:p-8 rounded-3xl glass-card border-2 border-amber-500/50 shadow-2xl bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 space-y-6">
            {/* Header with Title and Big Audio Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
                <img
                  src={selectedCrop.cropImage}
                  alt={selectedCrop.hindi}
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-lg shadow-amber-500/20 shrink-0"
                />
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                      {isEn ? '2. Packaging & Freshness Guide' : '२. सही पैकेजिंग व ताज़गी गाइड'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {isEn ? '✓ Scientific Validation' : '✓ वैज्ञानिक पुष्टि (ICAR/CFTRI)'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-white font-['Outfit']">
                    {isEn ? `${selectedCrop.english} (${selectedCrop.hindi})` : `${selectedCrop.hindi} (${selectedCrop.english})`}
                  </h3>
                </div>
              </div>

              {/* Big Pulsing Audio Play Button */}
              <button
                onClick={() => handleManualSpeak()}
                className={`w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-4 rounded-2xl font-black text-xs sm:text-base flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
                  isSpeaking
                    ? 'bg-rose-500 text-white shadow-rose-500/40 animate-pulse'
                    : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 shadow-amber-500/40 hover:opacity-95'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>{isEn ? 'Stop Voice' : 'बोलना बंद करें'}</span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-0.5">
                      <span className="w-1 h-3.5 bg-slate-950 rounded-full animate-bounce" />
                      <span className="w-1 h-5 bg-slate-950 rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1 h-2.5 bg-slate-950 rounded-full animate-bounce [animation-delay:0.3s]" />
                    </div>
                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>{isEn ? '🔊 Listen Voice Guide' : '🔊 बोलकर सुनो (Listen Voice Guide)'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Visual Triple Grid: [Recommended Packaging Photo] | [DOs क्या करें] | [DON'Ts क्या न करें] */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* Card 1: Recommended Real Packaging Photo */}
              <div className="rounded-2xl p-4 bg-emerald-950/40 border-2 border-emerald-500/50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isEn ? '1. Recommended Package' : '१. सबसे सही थैली / क्रेट (Best Package)'}</span>
                  </div>

                  {/* Real Packaging Photo */}
                  <div className="relative w-full aspect-video sm:aspect-square rounded-xl overflow-hidden border border-emerald-500/40 mb-3 shadow-inner bg-black">
                    <img
                      src={selectedCrop.pkgImage}
                      alt={selectedCrop.pkgNameHindi}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 text-xs font-black shadow">
                      {isEn ? '✓ Recommended' : '✓ यही इस्तेमाल करें'}
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                    {isEn ? (selectedCrop.pkgNameEn || selectedCrop.pkgNameHindi) : selectedCrop.pkgNameHindi}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {selectedCrop.defaultWhy}
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-500/30 flex items-center justify-between text-xs font-bold text-emerald-300">
                  <span>{isEn ? `Fresh: ${selectedCrop.defaultDays}` : `ताज़गी: ${selectedCrop.defaultDays}`}</span>
                  <span>{isEn ? `Temp: ${selectedCrop.defaultTemp}` : `तापमान: ${selectedCrop.defaultTemp}`}</span>
                </div>
              </div>

              {/* Card 2: DO (✅ क्या करें) with Icons */}
              <div className="rounded-2xl p-4 bg-cyan-950/40 border-2 border-cyan-500/50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wider mb-2">
                    <ThumbsUp className="w-4 h-4 text-cyan-400" />
                    <span>{isEn ? '2. Best Storage (DOs)' : '२. क्या करें (Right Storage)'}</span>
                  </div>

                  {/* Visual Storage Badge */}
                  <div className="p-3 rounded-xl bg-cyan-900/30 border border-cyan-500/30 space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm font-black text-cyan-200">
                      <Wind className="w-5 h-5 text-cyan-400" />
                      <span>{isEn ? 'Keep in ventilated shade' : 'हवादार छाया में रखें'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-black text-cyan-200">
                      <Thermometer className="w-5 h-5 text-cyan-400" />
                      <span>{isEn ? `Ideal Temp: ${selectedCrop.defaultTemp}` : `सही तापमान: ${selectedCrop.defaultTemp}`}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-black text-cyan-200">
                      <Clock className="w-5 h-5 text-cyan-400" />
                      <span>{isEn ? `Stays Fresh: ${selectedCrop.defaultDays}` : `ताज़ा रहेगा: ${selectedCrop.defaultDays}`}</span>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-white leading-relaxed">
                    {selectedCrop.dosText}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-cyan-500/20 text-[11px] text-cyan-300">
                  {isEn
                    ? '💡 Tip: Placing sacks on wooden pallets prevents damp ground damage.'
                    : '💡 टिप: फर्श से ऊपर लकड़ी के फट्टे (Pallet) पर रखने से सीलन से बचाव होता है।'}
                </div>
              </div>

              {/* Card 3: DON'T (❌ क्या न करें) with Real Spoilage Warning Photo */}
              <div className="rounded-2xl p-4 bg-rose-950/40 border-2 border-rose-500/50 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider mb-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>{isEn ? '3. What NOT To Do' : '३. क्या न करें (खराबी का खतरा)'}</span>
                  </div>

                  {/* Real Warning Photo */}
                  <div className="relative w-full aspect-video sm:aspect-square rounded-xl overflow-hidden border border-rose-500/40 mb-3 shadow-inner bg-black">
                    <img
                      src="/images/guidance/spoilage_warning.jpg"
                      alt="धूप में सड़न की चेतावनी"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-black shadow flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> {isEn ? 'Never do this' : 'ऐसा कभी न करें'}
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-black text-rose-200 leading-tight">
                    {selectedCrop.defaultWarning}
                  </h4>
                  <p className="text-xs text-rose-300 mt-1 leading-relaxed">
                    {selectedCrop.dontsText}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-rose-500/20 text-[11px] text-rose-300">
                  {isEn
                    ? '⚠️ Direct sunlight & trapped heat can cause complete produce loss within 24 hours.'
                    : '⚠️ तेज धूप व बंद पन्नी में पसीना आने से 24 घंटे में पूरी फसल सड़ सकती है।'}
                </div>
              </div>
            </div>

            {/* STEP 3: Simple Visual Savings Calculator with Sacks */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center justify-center md:justify-start gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" /> {isEn ? 'Direct Farmer Savings' : 'किसान भाइयों का सीधा मुनाफा (Direct Savings)'}
                </span>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  {isEn
                    ? `How many bags of ${selectedCrop.english} are you packaging?`
                    : `आप कितनी बोरी (${selectedCrop.hindi}) पैक करना चाहते हैं?`}
                </h4>
                <p className="text-xs text-slate-300">
                  {isEn
                    ? 'Proper packaging saves 20% to 25% spoilage, delivering maximum mandi profit.'
                    : 'सही थैली से 20% से 25% सड़न बचती है और मंडी में पूरा दाम मिलता है।'}
                </p>
              </div>

              {/* Sack Selector Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[2, 5, 10, 20, 50].map((sacks) => (
                  <button
                    key={sacks}
                    onClick={() => setBatchBags(sacks)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                      batchBags === sacks
                        ? 'bg-amber-400 text-slate-950 scale-105 shadow-md shadow-amber-500/40'
                        : 'bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    <span>🌾</span>
                    <span>{isEn ? `${sacks} Bags (${sacks * 50} kg)` : `${sacks} बोरी (${sacks * 50} kg)`}</span>
                  </button>
                ))}
              </div>

              {/* Projected Profit Display */}
              <div className="text-center md:text-right bg-amber-500/10 p-3 rounded-2xl border border-amber-500/30 shrink-0 w-full sm:w-auto">
                <span className="text-[10px] text-amber-300 uppercase tracking-widest block font-bold">
                  {isEn ? 'Estimated Savings' : 'अनुमानित बचत (Estimated Savings)'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit']">
                  ₹{estimatedSavings.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Bar: Save to Data Store / View Store */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={handleSaveToDataStore}
                  className="w-full sm:w-auto px-4 sm:px-5 py-3 rounded-xl font-black text-xs sm:text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                >
                  <Database className="w-4 h-4" />
                  <span>{isEn ? '💾 Save Batch to Data Store' : '💾 यह हिसाब डेटा स्टोर में सहेजें (Save Record)'}</span>
                </button>

                {onOpenDataStore && (
                  <button
                    onClick={onOpenDataStore}
                    className="px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5"
                  >
                    <span>{isEn ? 'View Data Store' : 'डेटा स्टोर देखें'}</span>
                  </button>
                )}

                {onOpenCalculator && (
                  <button
                    onClick={onOpenCalculator}
                    className="px-4 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:opacity-95 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <Coins className="w-4 h-4" />
                    <span>{isEn ? '💰 Profit Calculator' : '💰 मुनाफा कैलकुलेटर'}</span>
                  </button>
                )}
              </div>

              {savedToast && (
                <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3.5 py-1.5 rounded-full border border-emerald-500/40 animate-pulse">
                  {isEn ? '✓ Record saved in Data Store successfully!' : '✓ रिकॉर्ड डेटा स्टोर में सहेज लिया गया है!'}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DETAILED CALCULATOR MODE (STANDARD TEXT VIEW) */}
      {/* ============================================================== */}
      {activeMode === 'table' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          {/* Left Column: Visual Crop Selector Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span>{isEn ? '1. Select Produce' : '१. अपनी फसल चुनें (Select Produce)'}</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {filteredCrops.length} {isEn ? 'Crops' : 'मुख्य फसलें'}
                </span>
              </h3>

              {/* Quick Search */}
              <div className="relative w-44">
                <input
                  type="text"
                  placeholder={isEn ? 'Search crop...' : 'फसल खोजें...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-7 pr-2 py-1 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {filteredCrops.map((crop) => {
                const isSelected = selectedCrop.id === crop.id;
                return (
                  <button
                    key={crop.id}
                    onClick={() => handleSelectCrop(crop)}
                    className={`relative p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-b from-amber-500/30 to-amber-950/60 border-2 border-amber-400 shadow-xl shadow-amber-500/25 scale-[1.03]'
                        : 'bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <img
                      src={crop.cropImage}
                      alt={isEn ? crop.english : crop.hindi}
                      className="w-12 h-12 rounded-xl object-cover mb-1.5 shadow"
                    />
                    <span className="text-xs sm:text-sm font-black text-white">{isEn ? crop.english : crop.hindi}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{isEn ? crop.hindi : crop.english}</span>

                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Advice Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-3xl glass-card border border-amber-500/50 shadow-2xl bg-slate-950/90 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedCrop.cropImage}
                    alt={selectedCrop.hindi}
                    className="w-12 h-12 rounded-xl object-cover border border-amber-400"
                  />
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                      {isEn ? 'Packaging Advice' : 'पैकेजिंग सलाह (Packaging Advice)'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                      {isEn ? `${selectedCrop.english} (${selectedCrop.hindi})` : `${selectedCrop.hindi} (${selectedCrop.english})`}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => handleManualSpeak()}
                  className="p-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-transform active:scale-95 shadow"
                  title="बोलकर सुनें"
                >
                  {isSpeaking ? (
                    <VolumeX className="w-5 h-5 text-amber-400 animate-pulse" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-amber-400" />
                  )}
                </button>
              </div>

              {/* Visual Advice Cards */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400">
                    <Package className="w-4 h-4" />
                    <span>{isEn ? 'Recommended Package:' : 'सही थैली / बैग (Recommended Package):'}</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-white pl-6">
                    {isEn ? (selectedCrop.pkgNameEn || selectedCrop.defaultPkg) : selectedCrop.defaultPkg}
                  </p>
                  <p className="text-xs text-slate-300 pl-6 leading-relaxed pt-1">
                    {selectedCrop.defaultWhy}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-400">
                    <Thermometer className="w-4 h-4" />
                    <span>{isEn ? 'Storage Temperature:' : 'सही तापमान (Storage Temperature):'}</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-cyan-200 pl-6">
                    {selectedCrop.defaultTemp}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400">
                    <Clock className="w-4 h-4" />
                    <span>{isEn ? 'Shelf Life:' : 'ताज़गी के दिन (Shelf Life):'}</span>
                  </div>
                  <p className="text-sm sm:text-base font-black text-amber-200 pl-6">
                    {selectedCrop.defaultDays}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-rose-400">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{isEn ? 'Caution / Tip:' : 'जरूरी सावधानी (Warning / Tip):'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-200 pl-6 leading-relaxed">
                    {selectedCrop.defaultWarning}
                  </p>
                </div>
              </div>

              {/* Gemini Enrichment */}
              {isAiThinking && (
                <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/40 flex items-center gap-2.5 text-xs text-purple-300">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                  <span>{isEn ? 'Gemini AI calculating scientific metrics...' : 'Gemini 3.5 AI वैज्ञानिक आंकड़े तैयार कर रहा है...'}</span>
                </div>
              )}

              {customAdvice && !isAiThinking && (
                <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/40 space-y-1">
                  <span className="text-[10px] font-mono text-purple-300 font-bold uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-400" /> {isEn ? 'GEMINI 3.5 AI Scientific Analysis:' : 'GEMINI 3.5 AI वैज्ञानिक विवरण:'}
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {customAdvice}
                  </p>
                </div>
              )}

              {/* Save Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={handleSaveToDataStore}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all flex items-center gap-1.5 shadow"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>{isEn ? '💾 Save Record' : '💾 फसल रिकॉर्ड सहेजें'}</span>
                </button>

                {savedToast && (
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 animate-pulse">
                    {isEn ? '✓ Saved!' : '✓ सहेजा गया!'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Crop / Food Scanner Modal with YOLO */}
      <LiveCropScannerModal
        isOpen={isCameraScannerOpen}
        onClose={() => setIsCameraScannerOpen(false)}
        onCropDetected={(cropName, hindiName) => {
          const found = VISUAL_CROPS.find(
            (c) =>
              c.english.toLowerCase().includes(cropName.toLowerCase()) ||
              c.hindi.includes(hindiName) ||
              cropName.toLowerCase().includes(c.id)
          );
          if (found) handleSelectCrop(found);
        }}
        onOpenDataStore={onOpenDataStore}
        currentLanguage={activeLang}
      />
    </section>
  );
};
