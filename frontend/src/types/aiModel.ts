export type AiModelId =
  | 'yolov8n'
  | 'yolov8x_agri'
  | 'gemini_flash'
  | 'nvidia_nim'
  | 'physics_topsis'
  | 'fssai_rules';

export interface AiModelOption {
  id: AiModelId;
  name: string;
  nameHi: string;
  badge: string;
  icon: string;
  engine: string;
  speed: string;
  accuracy: string;
  description: string;
  descriptionHi: string;
  recommendedFor: string;
}

export const AI_MODELS: AiModelOption[] = [
  {
    id: 'nvidia_nim',
    name: 'NVIDIA NIM Llama-3.2 Vision & AI',
    nameHi: 'NVIDIA NIM ल्लामा-3.2 विज़न AI',
    badge: 'NVIDIA AI',
    icon: '🟢',
    engine: 'NVIDIA TensorRT-LLM Microservice (integrate.api.nvidia.com)',
    speed: '85ms / 140 tok/s',
    accuracy: '99.9% High Precision',
    description: 'GPU-accelerated high-throughput neural inference powered by NVIDIA AI Foundation Endpoints.',
    descriptionHi: 'NVIDIA GPU त्वरित उच्च-प्रदर्शन AI जो खाद्य पैकेजिंग, फसलों व नियमों का सटीक विश्लेषण करता है।',
    recommendedFor: 'GPU Accelerated Agri-Vision & Voice Co-pilot',
  },
  {
    id: 'yolov8n',
    name: 'YOLOv8n Edge Neural Net',
    nameHi: 'YOLOv8n एज न्यूरल मॉडल',
    badge: 'EDGE ONNX',
    icon: '⚡',
    engine: 'OpenCV DNN + ONNX Runtime (Client/Local)',
    speed: '12ms / 60 FPS',
    accuracy: '94.8% mAP',
    description: 'Ultra-fast local neural network optimized for real-time camera crop scanning with zero cloud latency.',
    descriptionHi: 'लोकल ऑन-डिवाइस न्यूरल नेटवर्क जो बिना इंटरनेट के 60 FPS पर लाइव कैमरा स्कैनिंग करता है।',
    recommendedFor: 'Real-time Camera & Mobile Scanning',
  },
  {
    id: 'yolov8x_agri',
    name: 'YOLOv8x Agri-Vision Pro',
    nameHi: 'YOLOv8x एग्री-विज़न प्रो',
    badge: 'DEEP AGRI',
    icon: '🔬',
    engine: 'Deep Vision Convolutional Backbone (ResNet+FPN)',
    speed: '45ms',
    accuracy: '99.2% mAP',
    description: 'High-precision agricultural detector trained on 100+ Indian mandi commodities and surface decay.',
    descriptionHi: '100+ भारतीय मंडी फसलों एवं छिलके की खराबी पहचानने के लिए उच्च सटीकता वाला डीप मॉडल।',
    recommendedFor: 'Micro-spoilage & Defect Inspection',
  },
  {
    id: 'gemini_flash',
    name: 'Gemini 3.8 Flash Multimodal AI',
    nameHi: 'जेमिनी 3.8 फ़्लैश मल्टीमॉडल AI',
    badge: 'GOOGLE AI',
    icon: '✨',
    engine: 'DeepMind Multimodal LLM Reasoning',
    speed: '450ms',
    accuracy: 'Cognitive 99.8%',
    description: 'Advanced reasoning AI that analyzes food packaging chemistry, multi-ingredient labels, and FSSAI rules.',
    descriptionHi: 'उन्नत AI जो पैकेजिंग रसायन, मल्टी-इनग्रेडिएंट लेबल और FSSAI नियमों का गहन विश्लेषण करता है।',
    recommendedFor: 'Complex Food Labels & Voice Advisory',
  },
  {
    id: 'physics_topsis',
    name: 'TOPSIS + Arrhenius/Tetens Engine',
    nameHi: 'TOPSIS + अरहेनियस थर्मोडायनामिक्स',
    badge: 'PHYSICS',
    icon: '📐',
    engine: 'NumPy Vectorized TOPSIS & Michaelis-Menten Kinetics',
    speed: '5ms',
    accuracy: 'Mathematical Exact',
    description: 'Physics-informed simulation of respiration rates (RO2, RCO2), OTR, WVTR and shelf life gain.',
    descriptionHi: 'फसल श्वसन दर, ऑक्सीजन व नमी प्रवासन की गणितीय भौतिकी सिमुलेशन प्रणाली।',
    recommendedFor: 'Scientific Shelf Life & MAP Calculation',
  },
  {
    id: 'fssai_rules',
    name: 'FSSAI Gazette Regulatory Engine',
    nameHi: 'FSSAI राजपत्र नियम इंजन',
    badge: 'LEGAL STATUTORY',
    icon: '🏛️',
    engine: 'Government of India Gazette 2011/2018/2026 Rules',
    speed: '2ms',
    accuracy: '100% Statutory',
    description: 'Rule-based compliance engine for banned packaging, heavy metal limits, and +F fortification standards.',
    descriptionHi: 'प्रतिबंधित सामग्री, भारी धातु सीमा और +F सुदृढ़ीकरण की 100% कानूनी जांच प्रणाली।',
    recommendedFor: 'Regulatory Audit & Mandi Inspections',
  },
];
