import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  ArrowRight,
  Box,
  Compass,
  CheckCircle,
  Activity,
  Layers,
  Thermometer,
  Shield,
  Film,
  Cpu,
  ChevronDown,
  RotateCcw,
  Sparkle,
} from 'lucide-react';

import { AI_MODELS, AiModelId } from '../types/aiModel';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../i18n/translations';

interface HeroSectionProps {
  onStartRecommendation: () => void;
  onExplore3DLab: () => void;
  onOpenFarmerMode?: () => void;
  onOpenScanCamera?: () => void;
  onOpenCalculator?: () => void;
  onOpen3dOpening?: () => void;
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  activeModelId?: AiModelId;
  onModelChange?: (model: AiModelId) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartRecommendation,
  onExplore3DLab,
  onOpenFarmerMode,
  onOpenScanCamera,
  onOpenCalculator,
  onOpen3dOpening,
  currentLanguage = 'hi',
  onLanguageChange,
  activeModelId = 'yolov8n',
  onModelChange,
}) => {
  const [showModelPicker, setShowModelPicker] = useState<boolean>(false);
  const mount3dRef = useRef<HTMLDivElement | null>(null);

  // Live Three.js interactive 3D Holographic Package in the Hero
  useEffect(() => {
    const container = mount3dRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const goldPoint = new THREE.PointLight(0xf59e0b, 5, 20);
    goldPoint.position.set(4, 4, 4);
    scene.add(goldPoint);

    const cyanPoint = new THREE.PointLight(0x06b6d4, 6, 20);
    cyanPoint.position.set(-4, -2, 4);
    scene.add(cyanPoint);

    // Root 3D Package Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Semi-translucent Bio-Polymer Smart Pouch Mesh
    const pouchGeo = new THREE.BoxGeometry(2.3, 3.1, 0.9, 16, 16, 8);
    const pouchMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      transmission: 0.78,
      opacity: 0.85,
      transparent: true,
      roughness: 0.12,
      metalness: 0.15,
      ior: 1.45,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const pouchMesh = new THREE.Mesh(pouchGeo, pouchMat);
    group.add(pouchMesh);

    // Wireframe edge highlight
    const wireGeo = new THREE.WireframeGeometry(pouchGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25 });
    const wireLine = new THREE.LineSegments(wireGeo, wireMat);
    group.add(wireLine);

    // Top pouch hermetic seal band
    const sealGeo = new THREE.BoxGeometry(2.4, 0.28, 0.95);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xd97706,
      emissiveIntensity: 0.4,
    });
    const sealMesh = new THREE.Mesh(sealGeo, sealMat);
    sealMesh.position.y = 1.45;
    group.add(sealMesh);

    // 2. Inner Organic Fresh Tomato / Agro Produce inside package
    const fruitGroup = new THREE.Group();
    fruitGroup.scale.set(0.9, 0.9, 0.9);
    group.add(fruitGroup);

    // Fruit body
    const fruitGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const fruitMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.25,
      metalness: 0.1,
      emissive: 0x7f1d1d,
      emissiveIntensity: 0.25,
    });
    const fruitMesh = new THREE.Mesh(fruitGeo, fruitMat);
    fruitMesh.scale.set(1.0, 0.88, 1.0);
    fruitGroup.add(fruitMesh);

    // Green Calyx leaves on top
    const calyxMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.4,
      emissive: 0x14532d,
      emissiveIntensity: 0.3,
    });
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const leafGeo = new THREE.ConeGeometry(0.12, 0.36, 4);
      const leaf = new THREE.Mesh(leafGeo, calyxMat);
      leaf.position.set(Math.cos(angle) * 0.25, 0.68, Math.sin(angle) * 0.25);
      leaf.rotation.z = Math.cos(angle) * -0.6;
      leaf.rotation.x = Math.sin(angle) * 0.6;
      fruitGroup.add(leaf);
    }
    // Small stem
    const stemGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.3, 8);
    const stem = new THREE.Mesh(stemGeo, calyxMat);
    stem.position.y = 0.78;
    fruitGroup.add(stem);

    // 3. Gyroscopic Shield Rings (OTR & WVTR)
    const otrRingGeo = new THREE.TorusGeometry(2.1, 0.025, 16, 64);
    const otrRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
    });
    const otrRing = new THREE.Mesh(otrRingGeo, otrRingMat);
    group.add(otrRing);

    const wvtrRingGeo = new THREE.TorusGeometry(2.35, 0.025, 16, 64);
    const wvtrRingMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.8,
    });
    const wvtrRing = new THREE.Mesh(wvtrRingGeo, wvtrRingMat);
    wvtrRing.rotation.x = Math.PI / 3;
    group.add(wvtrRing);

    // 4. Sweeping Laser Scanning Plane
    const laserGeo = new THREE.RingGeometry(1.4, 1.45, 32);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.rotation.x = Math.PI / 2;
    group.add(laserMesh);

    // 5. Orbiting Protective Particles (N₂ / CO₂ Gas Molecules)
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.08,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Interactive Drag to Rotate
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velX = 0.006;
    let velY = 0.003;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;
      velX = deltaX * 0.002;
      velY = deltaY * 0.002;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
      group.rotation.y += deltaX * 0.012;
      group.rotation.x += deltaY * 0.012;
      velX = deltaX * 0.002;
      velY = deltaY * 0.002;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle orbital rotation
      if (!isDragging) {
        group.rotation.y += 0.01;
        group.rotation.x += THREE.MathUtils.degToRad(Math.sin(elapsedTime * 0.7) * 0.2);
      }

      // Gyroscopic rings counter-rotation
      otrRing.rotation.x += 0.018;
      otrRing.rotation.y += 0.022;
      wvtrRing.rotation.y -= 0.015;
      wvtrRing.rotation.z += 0.012;

      // Laser scanning sweep up and down
      laserMesh.position.y = Math.sin(elapsedTime * 2.2) * 1.35;

      // Organic produce pulse (breath of fresh commodity)
      const fruitScale = 0.9 + Math.sin(elapsedTime * 2.5) * 0.04;
      fruitGroup.scale.set(fruitScale, fruitScale, fruitScale);

      // Particle orbit drift
      particles.rotation.y -= 0.004;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || 320;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.hi;
  const activeModel = AI_MODELS.find((m) => m.id === activeModelId) || AI_MODELS[0];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-16 sm:pt-20 pb-10 sm:pb-12 overflow-hidden">
      {/* Background Deep Agricultural Visual Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#060913] via-[#0a1022] to-[#040817]" />

      {/* Subtle Golden Mandala Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-amber-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-500/15 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Content (6 Columns) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            {/* Top Category Tag with Mixed Branding & Interactive AI Model Picker */}
            <div className="flex flex-wrap items-center gap-2 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>पैकवाइज़ PACKWISE AI</span>
                <span className="text-amber-500/60">•</span>
                <span className="text-cyan-300">अन्न रक्षा SIH-236</span>
              </div>

              {/* Interactive AI Model Switcher Button */}
              <div className="relative">
                <button
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 backdrop-blur-md transition-all cursor-pointer shadow-sm shadow-cyan-500/20"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>{t.activeAiModelLabel} {activeModel.badge}</span>
                  <ChevronDown className="w-3 h-3 text-cyan-400" />
                </button>

                {/* Dropdown Menu for AI Models */}
                {showModelPicker && (
                  <div className="absolute left-0 mt-2 w-72 sm:w-80 rounded-2xl glass-card border border-cyan-500/30 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{t.activeAiModelLabel}</span>
                      <span className="text-cyan-400 font-bold">5 Available</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {AI_MODELS.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => {
                            if (onModelChange) onModelChange(model.id);
                            setShowModelPicker(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                            activeModelId === model.id
                              ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-200'
                              : 'hover:bg-white/5 text-slate-300 border border-transparent'
                          }`}
                        >
                          <span className="text-lg shrink-0 mt-0.5">{model.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white truncate">{model.name}</span>
                              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-black/40 text-amber-300">
                                {model.speed}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 truncate mt-0.5">
                              {currentLanguage === 'hi' ? model.descriptionHi : model.description}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Headline (Fully Translated for all 8 Languages) */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] font-['Outfit']">
                {t.heroHeadlineMain} <br />
                <span className="text-2xl sm:text-4xl lg:text-5xl text-slate-300 font-extrabold block">
                  {t.heroHeadlineSub}
                </span>
                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-400 bg-clip-text text-transparent block mt-1">
                  {t.heroHeadlineHighlight}
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-sans max-w-xl">
              {t.heroDescription}
            </p>

            {/* Quick Language Switcher Ribbon - All 8 Indian Languages with smooth scroll on mobile */}
            {onLanguageChange && (
              <div className="pt-1">
                <span className="text-xs font-mono text-slate-400 block mb-1.5">🌐 भाषा (Select Language):</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => onLanguageChange(lang.code)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentLanguage === lang.code
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black shadow-md shadow-amber-400/30 scale-105'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs (Responsive on Mobile: Full-width touch cards on small screens, flex on desktop) */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              {onOpen3dOpening && (
                <button
                  onClick={onOpen3dOpening}
                  className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/25 hover:opacity-95 transition-all flex items-center gap-2 transform hover:scale-[1.02] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950 animate-spin-slow shrink-0" />
                  <span>{t.heroBtn3dOpening}</span>
                </button>
              )}

              {onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="w-full sm:w-auto justify-center px-5 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-xl shadow-amber-500/25 hover:opacity-95 transition-all flex items-center gap-2 transform hover:scale-[1.02] cursor-pointer"
                >
                  <span className="text-base shrink-0">💰</span>
                  <span>{t.heroBtnCalculator}</span>
                </button>
              )}

              {onOpenFarmerMode && (
                <button
                  onClick={onOpenFarmerMode}
                  className="w-full sm:w-auto justify-center px-4 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-amber-300 border border-amber-500/30 backdrop-blur-md transition-all flex items-center gap-2 transform hover:scale-[1.02] cursor-pointer"
                >
                  <span className="text-base shrink-0">🌾</span>
                  <span>{t.heroBtnFarmer}</span>
                </button>
              )}

              {onOpenScanCamera && (
                <button
                  onClick={onOpenScanCamera}
                  className="w-full sm:w-auto justify-center px-4 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 shadow-xl shadow-emerald-500/25 hover:opacity-95 transition-all flex items-center gap-2 transform hover:scale-[1.02] cursor-pointer"
                >
                  <span className="shrink-0">📸</span>
                  <span>{t.heroBtnScanner}</span>
                </button>
              )}

              <button
                onClick={onStartRecommendation}
                className="w-full sm:w-auto justify-center px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/15 text-white border border-white/15 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t.heroBtnWizard}</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
              </button>
            </div>
          </div>

          {/* Center / Right Visual Showcase (6 Columns) with LIVE INTERACTIVE THREE.JS 3D VIEWPORT */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center mt-4 lg:mt-0">
            {/* Three.js Live Interactive 3D Packaging Viewport - 100% Mobile Safe (max-w-[310px] on 360px mobile) */}
            <div className="relative w-full max-w-[300px] sm:max-w-[380px] aspect-square flex items-center justify-center select-none group mx-auto">
              {/* Outer Decorative Glowing Rings */}
              <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-spin pointer-events-none" />

              {/* Real Interactive 3D WebGL Canvas */}
              <div
                ref={mount3dRef}
                className="w-full h-full rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing relative z-10 flex items-center justify-center"
                title={t.heroPouchDragHint}
              />

              {/* Floating Top HUD Tag */}
              <div className="absolute -top-2 -right-2 z-20 bg-black/85 px-3 py-1.5 rounded-xl border border-cyan-500/40 backdrop-blur-md text-left shadow-lg pointer-events-none">
                <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  3D LIVE BIO-POUCH
                </div>
                <div className="text-xs font-bold text-white">{t.heroPouchDragHint}</div>
              </div>

              {/* Floating Bottom HUD Pill */}
              <div className="absolute -bottom-2 -left-2 z-20 bg-black/85 px-3 py-1.5 rounded-xl border border-amber-500/40 backdrop-blur-md text-[10px] font-mono text-amber-300 shadow-lg pointer-events-none">
                {t.heroPouchGasPill}
              </div>
            </div>

            {/* Right Telemetry Glass Card */}
            <div className="mt-5 w-full max-w-md p-4 sm:p-5 rounded-2xl glass-card border border-white/15 shadow-2xl backdrop-blur-xl text-left">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="font-mono text-cyan-300 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> {t.heroTelemetryTitle}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
                  {t.heroTelemetryActive}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                <div>
                  <span className="text-slate-400">{t.heroDecisionEngine}</span>
                  <p className="font-bold text-white text-xs sm:text-sm">TOPSIS Vector MCDM</p>
                </div>
                <div>
                  <span className="text-slate-400">{t.heroActiveModel}</span>
                  <p className="font-mono font-bold text-cyan-300 text-xs sm:text-sm">{activeModel.badge}</p>
                </div>
                <div>
                  <span className="text-slate-400">{t.heroBarrierTuning}</span>
                  <p className="font-mono font-bold text-amber-300 text-xs sm:text-sm">OTR / WVTR Tuned</p>
                </div>
                <div>
                  <span className="text-slate-400">{t.heroCompliance}</span>
                  <p className="font-medium text-slate-200 text-xs sm:text-sm">FSSAI 2026 & IS 9845</p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">{t.daysShelfLife}:</span>
                  <p className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">{t.heroFreshnessGain}</p>
                </div>
                <button
                  onClick={onStartRecommendation}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {t.heroConfigureBtn} <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metrics HUD Bar - Responsive 1 col on mobile, 2 on tablet, 4 on desktop */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl glass-card border border-white/10 shadow-xl bg-black/40">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">{t.heroOtrTitle}</span>
            <div className="text-base sm:text-lg font-bold text-cyan-300 font-mono mt-0.5">
              OTR &lt; 60 <span className="text-[10px] text-slate-400 font-sans">cc/m²·d</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.heroOtrDesc}</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">{t.heroWvtrTitle}</span>
            <div className="text-base sm:text-lg font-bold text-amber-300 font-mono mt-0.5">
              WVTR &lt; 4.5 <span className="text-[10px] text-slate-400 font-sans">g/m²·d</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.heroWvtrDesc}</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">{t.heroMapTitle}</span>
            <div className="text-base sm:text-lg font-bold text-emerald-300 font-mono mt-0.5">
              5% O₂ / 10% CO₂
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.heroMapDesc}</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-left">
            <span className="text-[10px] font-mono uppercase text-slate-400">{t.heroShelfTitle}</span>
            <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">
              18 {t.daysUnit} <span className="text-[10px] text-emerald-400 font-mono">(+300%)</span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.heroShelfDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

