import { useState, useEffect, useCallback, useRef } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../i18n/translations';

interface VoiceAssistantProps {
  currentLanguage: SupportedLanguage;
  onCommandRecognized?: (command: string) => void;
}

export function useVoiceAssistant({ currentLanguage, onCommandRecognized }: VoiceAssistantProps) {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    // Match recognition language to current app language
    const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);
    recognition.lang = currentLangMeta?.speechLocale || 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);

      if (event.results[current].isFinal) {
        handleVoiceCommand(text.toLowerCase());
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Voice recognition notice:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentLanguage]);

  // Advanced Voice Command Intent Classifier with Greeting & Multi-domain support
  const handleVoiceCommand = (text: string) => {
    if (!onCommandRecognized) return;
    const lower = text.toLowerCase();

    // 1. Greetings & Welcoming words ("Hello", "May I help you", "नमस्ते", etc.)
    if (
      lower.includes('hello') ||
      lower.includes('hi') ||
      lower.includes('hey') ||
      lower.includes('namaste') ||
      lower.includes('namaskar') ||
      lower.includes('pranam') ||
      lower.includes('नमस्ते') ||
      lower.includes('नमस्कार') ||
      lower.includes('प्रणाम') ||
      lower.includes('राम राम') ||
      lower.includes('kem cho') ||
      lower.includes('vanakkam') ||
      lower.includes('sat sri akal') ||
      lower.includes('may i help you') ||
      lower.includes('how can you help') ||
      lower.includes('help me') ||
      lower.includes('help') ||
      lower.includes('मदद') ||
      lower.includes('सहायता') ||
      lower.includes('kya haal') ||
      lower.includes('who are you') ||
      lower.includes('tum kaun ho')
    ) {
      onCommandRecognized('greeting');
    } else if (
      lower.includes('camera') ||
      lower.includes('कैमरा') ||
      lower.includes('स्कैन') ||
      lower.includes('फोटो') ||
      lower.includes('scanner')
    ) {
      onCommandRecognized('camera');
    } else if (
      lower.includes('data') ||
      lower.includes('store') ||
      lower.includes('डेटा') ||
      lower.includes('स्टोर') ||
      lower.includes('इतिहास') ||
      lower.includes('हिस्ट्री') ||
      lower.includes('history') ||
      lower.includes('record') ||
      lower.includes('रिकॉर्ड')
    ) {
      onCommandRecognized('datastore');
    } else if (
      lower.includes('food dept') ||
      lower.includes('food department') ||
      lower.includes('खाद्य विभाग') ||
      lower.includes('खाद्य सुरक्षा') ||
      lower.includes('fssai') ||
      lower.includes('inspector') ||
      lower.includes('प्रतिबंधित') ||
      lower.includes('banned') ||
      lower.includes('certificate') ||
      lower.includes('प्रमाण पत्र')
    ) {
      onCommandRecognized('foodDept');
    } else if (
      lower.includes('farmer') ||
      lower.includes('किसान') ||
      lower.includes('शेतकरी') ||
      lower.includes('आसान') ||
      lower.includes('aasaan') ||
      lower.includes('simple') ||
      lower.includes('चित्र') ||
      lower.includes('अनपढ़') ||
      lower.includes('visual')
    ) {
      onCommandRecognized('farmerMode');
    } else if (
      lower.includes('copilot') ||
      lower.includes('assistant') ||
      lower.includes('वाणी') ||
      lower.includes('सवाल') ||
      lower.includes('chat') ||
      lower.includes('बात करो')
    ) {
      onCommandRecognized('voiceCopilot');
    } else if (
      lower.includes('calc') ||
      lower.includes('कैलकुलेटर') ||
      lower.includes('कैलकुलेशन') ||
      lower.includes('मुनाफा') ||
      lower.includes('हिसाब') ||
      lower.includes('बचत') ||
      lower.includes('नफा') ||
      lower.includes('roi') ||
      lower.includes('కాలిక్యులేటర్') ||
      lower.includes('கால்குலேட்டர்')
    ) {
      onCommandRecognized('calculator');
    } else if (
      lower.includes('hindi') ||
      lower.includes('हिंदी')
    ) {
      onCommandRecognized('lang:hi');
    } else if (
      lower.includes('english') ||
      lower.includes('अंग्रेजी')
    ) {
      onCommandRecognized('lang:en');
    } else if (
      lower.includes('marathi') ||
      lower.includes('मराठी')
    ) {
      onCommandRecognized('lang:mr');
    } else if (
      lower.includes('pro') ||
      lower.includes('प्रो') ||
      lower.includes('scientific') ||
      lower.includes('वैज्ञानिक')
    ) {
      onCommandRecognized('pro');
    } else if (
      lower.includes('3d') ||
      lower.includes('lab') ||
      lower.includes('लैब') ||
      lower.includes('3डी') ||
      lower.includes('ஆய்வகம்')
    ) {
      onCommandRecognized('lab3d');
    } else if (
      lower.includes('cold') ||
      lower.includes('chain') ||
      lower.includes('कोल्ड') ||
      lower.includes('ट्रक')
    ) {
      onCommandRecognized('coldchain');
    } else if (
      lower.includes('shelf') ||
      lower.includes('life') ||
      lower.includes('शेल्फ') ||
      lower.includes('ताज़गी')
    ) {
      onCommandRecognized('shelflife');
    } else if (lower.includes('map') || lower.includes('गैस')) {
      onCommandRecognized('map');
    } else if (lower.includes('home') || lower.includes('होम') || lower.includes('घर')) {
      onCommandRecognized('home');
    }
  };

  // Pre-load voices if speech synthesis is ready
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const onVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      };
    }
  }, []);

  // Start Listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      setTranscript('');
      recognitionRef.current.start();
    } catch (e) {
      console.warn('Recognition already started or error:', e);
    }
  }, []);

  // Stop Listening
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  }, []);

  // Text-To-Speech: Speak given text
  const speakText = useCallback(
    (text: string) => {
      if (!('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel(); // Cancel any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);
      utterance.lang = currentLangMeta?.speechLocale || 'en-IN';
      utterance.rate = 0.95; // slightly slower for high clarity
      utterance.pitch = 1.0;

      // Match available voices
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(
        (v) =>
          v.lang.toLowerCase() === (currentLangMeta?.speechLocale || 'en-in').toLowerCase() ||
          v.lang.toLowerCase().startsWith(currentLanguage.toLowerCase())
      );
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [currentLanguage]
  );

  // Stop Speaking
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Speak Warm Greeting Aloud ("Hello, May I help you...")
  const speakGreeting = useCallback(() => {
    const greeting = getGreetingVoiceText(currentLanguage);
    speakText(greeting);
    return greeting;
  }, [currentLanguage, speakText]);

  return {
    isSpeaking,
    isListening,
    transcript,
    speechSupported,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    speakGreeting,
  };
}

/**
 * Natural, warm multi-lingual greeting phrases for all 8 supported Indian languages
 */
export function getGreetingVoiceText(lang: SupportedLanguage): string {
  switch (lang) {
    case 'hi':
      return 'नमस्ते! पैकवाइज़ एआई (PackWise AI) में आपका स्वागत है। मैं आपकी पैकेजिंग और खाद्य सुरक्षा में कैसे सहायता कर सकता हूँ?';
    case 'mr':
      return 'नमस्कार! पॅकवाईज एआय मध्ये आपले स्वागत आहे. मी आपल्या पिकांच्या पॅकेजिंग, शेल्फ-लाइफ आणि नफ्यामध्ये कशी मदत करू शकतो?';
    case 'ta':
      return 'வணக்கம்! பேக்வைஸ் AI-க்கு அன்புடன் வரவேற்கிறோம். உணவு பேக்கேஜிங் மற்றும் ஷெልஃப்-லைஃப் பற்றி நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?';
    case 'te':
      return 'నమస్కారం! ప్యాక్‌వైజ్ AI కి స్వాగతం. ఆహార ప్యాకేజింగ్ మరియు లాభాల లెక్కింపులో నేను మీకు ఎలా సహాయపడగలను?';
    case 'gu':
      return 'નમસ્તે! પેકવાઇઝ AI માં આપનું સ્વાગત છે. હું તમારી પાકની પેકેજીંગ અને નફામાં કેવી રીતે મદદ કરી શકું?';
    case 'bn':
      return 'নমস্কার! প্যাকওয়াইজ এআই-তে আপনাকে স্বাগতম। খাদ্য প্যাকেজিং এবং ফসলের সুরক্ষায় আমি কীভাবে সাহায্য করতে পারি?';
    case 'pa':
      return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਪੈਕਵਾਈਜ਼ ਏਆਈ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਮੈਂ ਤੁਹਾਡੀ ਫਸਲ ਦੀ ਪੈਕਿੰਗ ਅਤੇ ਮੁਨਾਫ਼ੇ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?';
    case 'en':
    default:
      return 'Hello and welcome to PackWise AI! How may I help you with your food packaging and shelf-life today?';
  }
}

