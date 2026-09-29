import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wheat,
  Sliders,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Layers,
  Activity,
  CheckCircle2,
  Atom,
  RotateCcw,
  Zap,
  Globe,
  Cpu,
  Eye,
  Box,
  Flame,
  Scale
} from 'lucide-react';
import { UserRole } from './Navbar';
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from '../i18n/translations';
import { AI_MODELS, AiModelId, AiModelOption } from '../types/aiModel';

interface Opening3DExperienceProps {
  isOpen: boolean;
  onClose: (selectedRole?: UserRole, selectedModel?: AiModelId) => void;
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  activeModelId?: AiModelId;
  onModelChange?: (model: AiModelId) => void;
}

export const Opening3DExperience: React.FC<Opening3DExperienceProps> = ({
  isOpen,
  onClose,
  currentLanguage = 'hi',
  onLanguageChange,
  activeModelId = 'yolov8n',
  onModelChange,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [selectedModel, setSelectedModel] = useState<AiModelId>(activeModelId);
  const [scanProgress, setScanProgress] = useState<number>(15);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const isExplodedRef = useRef<boolean>(false);

  // Sound generator using Web Audio API (zero external assets needed)
  const playSciFiSound = (type: 'boot' | 'laser' | 'click' | 'chime' | 'explode') => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'boot') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.7);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
        osc.start(now);
        osc.stop(now + 0.9);
      } else if (type === 'laser') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(920, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.25);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(940, now + 0.1);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'explode') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.4);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'chime') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'sine';
          o.frequency.setValueAtTime(freq, now + i * 0.08);
          g.gain.setValueAtTime(0.05, now + i * 0.08);
          g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.7);
          o.start(now + i * 0.08);
          o.stop(now + i * 0.08 + 0.7);
        });
      }
    } catch {
      // Audio fallback
    }
  };

  // Sync explode state with ref for animation loop
  useEffect(() => {
    isExplodedRef.current = isExploded;
  }, [isExploded]);

  // Step progression sequence with dynamic scanning
  useEffect(() => {
    if (!isOpen) return;

    playSciFiSound('boot');

    const t1 = setTimeout(() => {
      setActiveStep(1);
      setScanProgress(45);
      playSciFiSound('laser');
    }, 1100);

    const t2 = setTimeout(() => {
      setActiveStep(2);
      setScanProgress(80);
      playSciFiSound('laser');
    }, 2200);

    const t3 = setTimeout(() => {
      setActiveStep(3);
      setScanProgress(100);
      playSciFiSound('chime');
    }, 3300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen]);

  // Three.js 3D WebGL Canvas Animation
  useEffect(() => {
    if (!isOpen || !mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.022);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 20); // starts far and zooms in cinematographically!

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 3.0); // Cyan
    dirLight1.position.set(6, 10, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 2.5); // Golden amber
    dirLight2.position.set(-7, -6, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x10b981, 3.5, 25); // Emerald core
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // 3. Central 3D Smart Packaging Pod
    const podGroup = new THREE.Group();
    scene.add(podGroup);

    // Outer Translucent Hexagonal Barrier Shell
    const shellGeo = new THREE.CylinderGeometry(2.2, 2.2, 4.6, 6, 1, true);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x0ea5e9,
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.88,
      transparent: true,
      opacity: 0.65,
      ior: 1.45,
      side: THREE.DoubleSide,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    podGroup.add(shellMesh);

    // Outer Cyber Wireframe
    const wireframeGeo = new THREE.WireframeGeometry(shellGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    podGroup.add(wireframe);

    // Middle Tie-Layer Barrier (EVOH Nanofilm Cylinder)
    const tieLayerGeo = new THREE.CylinderGeometry(1.7, 1.7, 4.0, 16, 1, true);
    const tieLayerMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.4,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const tieLayerMesh = new THREE.Mesh(tieLayerGeo, tieLayerMat);
    podGroup.add(tieLayerMesh);

    // Inner Pulsing Food Freshness Core (Organic Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    podGroup.add(coreMesh);

    // 4. 3D Double-Helix Nano-Polymer Strand (DNA / Polymer chain)
    const helixGroup = new THREE.Group();
    podGroup.add(helixGroup);
    const helixPoints = 40;
    const helixRadius = 3.1;
    const helixHeight = 5.5;

    for (let i = 0; i < helixPoints; i++) {
      const t = (i / helixPoints) * Math.PI * 4;
      const y = (i / helixPoints - 0.5) * helixHeight;
      const x1 = Math.cos(t) * helixRadius;
      const z1 = Math.sin(t) * helixRadius;
      const x2 = Math.cos(t + Math.PI) * helixRadius;
      const z2 = Math.sin(t + Math.PI) * helixRadius;

      // Bead 1 (Cyan)
      const b1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      b1.position.set(x1, y, z1);
      helixGroup.add(b1);

      // Bead 2 (Amber)
      const b2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b })
      );
      b2.position.set(x2, y, z2);
      helixGroup.add(b2);

      // Connecting rungs every 4 steps
      if (i % 3 === 0) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(x1, y, z1),
          new THREE.Vector3(x2, y, z2),
        ]);
        const line = new THREE.Line(
          lineGeo,
          new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 })
        );
        helixGroup.add(line);
      }
    }

    // 5. Gyroscopic Barrier Rings (OTR / WVTR / CO2TR)
    const ringsGroup = new THREE.Group();
    podGroup.add(ringsGroup);

    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.04, 16, 64), ringMat1);
    ringsGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.035, 16, 64), ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ringsGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.65 });
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4.0, 0.03, 16, 64), ringMat3);
    ring3.rotation.y = Math.PI / 4;
    ringsGroup.add(ring3);

    // 6. Sweeping Laser Scanning Plane
    const laserPlaneGeo = new THREE.RingGeometry(0.1, 2.7, 32);
    const laserPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const laserPlane = new THREE.Mesh(laserPlaneGeo, laserPlaneMat);
    laserPlane.rotation.x = Math.PI / 2;
    podGroup.add(laserPlane);

    // 7. 3D Floating Agricultural Icons (Tomato, Wheat Crystal, Bottle Canister, Leaf)
    const satellitesGroup = new THREE.Group();
    podGroup.add(satellitesGroup);

    const satellites: THREE.Group[] = [];

    // Satellite A: 3D Organic Tomato (Red sphere with green stem)
    const tomatoGroup = new THREE.Group();
    const tomBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3, emissive: 0x991b1b, emissiveIntensity: 0.3 })
    );
    const tomStem = new THREE.Mesh(
      new THREE.ConeGeometry(0.08, 0.2, 5),
      new THREE.MeshStandardMaterial({ color: 0x22c55e })
    );
    tomStem.position.y = 0.32;
    tomatoGroup.add(tomBody, tomStem);
    satellitesGroup.add(tomatoGroup);
    satellites.push(tomatoGroup);

    // Satellite B: 3D Grain/Wheat Stalk (Golden octahedron cluster)
    const wheatGroup = new THREE.Group();
    for (let w = -2; w <= 2; w++) {
      const seed = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.12, 0),
        new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xb45309, emissiveIntensity: 0.4 })
      );
      seed.position.set(0, w * 0.15, (w % 2 === 0 ? 0.08 : -0.08));
      seed.scale.set(0.8, 1.4, 0.8);
      wheatGroup.add(seed);
    }
    satellitesGroup.add(wheatGroup);
    satellites.push(wheatGroup);

    // Satellite C: 3D Dairy Milk Canister / Glass Bottle
    const bottleGroup = new THREE.Group();
    const botBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.5, 12),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.5, transparent: true, opacity: 0.85 })
    );
    const botNeck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.15, 0.2, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    botNeck.position.y = 0.32;
    bottleGroup.add(botBody, botNeck);
    satellitesGroup.add(bottleGroup);
    satellites.push(bottleGroup);

    // Satellite D: 3D Fortified +F Nano-Ion Molecule
    const ionGroup = new THREE.Group();
    const ionCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.22, 1),
      new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: true })
    );
    const ionOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x34d399 })
    );
    ionGroup.add(ionCore, ionOrb);
    satellitesGroup.add(ionGroup);
    satellites.push(ionGroup);

    // 8. Ground Cyber Radar Grid with Concentric Waves
    const groundGrid = new THREE.GridHelper(24, 24, 0x0ea5e9, 0x1e293b);
    groundGrid.position.y = -3.8;
    groundGrid.material.transparent = true;
    groundGrid.material.opacity = 0.25;
    scene.add(groundGrid);

    // 9. Particle Starfield / Bio-Aura (1,600 particles)
    const particleCount = 1600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x38bdf8), // Sky cyan
      new THREE.Color(0xf59e0b), // Amber
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xa855f7), // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 10. Interactive Mouse / Pointer Tilt Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.45;
      targetY = y * 0.45;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetX = x * 0.45;
        targetY = y * 0.45;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // 11. Render Loop with Cinematic Camera Zoom & Physics
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera cinematic intro glide: 20 -> 11
      if (camera.position.z > 11.0) {
        camera.position.z += (11.0 - camera.position.z) * 0.04;
      }

      // Smooth camera parallax based on mouse
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      camera.position.x = mouseX * 2.8;
      camera.position.y = 1.0 + mouseY * 2.2;
      camera.lookAt(0, 0, 0);

      // Rotate central pod
      podGroup.rotation.y = elapsedTime * 0.4;
      podGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.1;

      // Handle 3D Exploded View Animation
      const explodeOffset = isExplodedRef.current ? 1.6 : 0;
      shellMesh.position.y += ((isExplodedRef.current ? 1.8 : 0) - shellMesh.position.y) * 0.08;
      wireframe.position.y = shellMesh.position.y;
      tieLayerMesh.position.y += ((isExplodedRef.current ? -1.8 : 0) - tieLayerMesh.position.y) * 0.08;
      ringsGroup.scale.setScalar(
        1.0 + (isExplodedRef.current ? 0.35 : 0) + Math.sin(elapsedTime * 2) * 0.02
      );

      // Gyro rings rotation
      ring1.rotation.z = elapsedTime * 0.65;
      ring2.rotation.y = -elapsedTime * 0.75;
      ring3.rotation.x = elapsedTime * 0.55;

      // Helix rotation
      helixGroup.rotation.y = -elapsedTime * 0.8;

      // Sweeping laser scanner
      laserPlane.position.y = Math.sin(elapsedTime * 2.2) * 2.1;
      laserPlaneMat.opacity = 0.3 + 0.25 * Math.sin(elapsedTime * 4.4);

      // Pulsing inner core
      const coreScale = 1.0 + Math.sin(elapsedTime * 3) * 0.08;
      coreMesh.scale.set(coreScale, coreScale, coreScale);
      coreMat.emissiveIntensity = 0.4 + Math.sin(elapsedTime * 3.5) * 0.3;

      // Position satellites along orbit
      satellites.forEach((sat, i) => {
        const angle = elapsedTime * 0.75 + (i * Math.PI) / 2;
        const orbitRadius = 3.4 + explodeOffset * 0.4;
        sat.position.x = Math.cos(angle) * orbitRadius;
        sat.position.z = Math.sin(angle) * orbitRadius;
        sat.position.y = Math.sin(angle * 2.5) * 0.8;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      // Rotate ground grid & particles
      groundGrid.rotation.y = elapsedTime * 0.03;
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.hi;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#050811] text-white flex flex-col justify-between select-none min-h-screen py-3 sm:py-5">
      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-auto" />

      {/* Cyber Grid Overlays & Ambient Radiance */}
      <div className="fixed inset-0 bg-gradient-to-t from-[#050811] via-transparent to-[#050811]/85 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent pointer-events-none" />

      {/* TOP HUD BAR - Responsive on mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between pointer-events-auto flex-wrap gap-2.5 sm:gap-3">
        {/* Mixed Hindi-English Branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-cyan-400 p-[1.5px] shadow-lg shadow-cyan-500/30 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 animate-spin-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-lg font-black tracking-wider text-white font-['Outfit']">
                पैकवाइज़ <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">PackWise AI</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                अन्न रक्षा
              </span>
            </div>
            <p className="text-[9px] sm:text-[11px] font-mono text-slate-300 line-clamp-1">
              {t.openingSubheading}
            </p>
          </div>
        </div>

        {/* Action Controls & Selectors */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap">
          {/* 3D Explode Layer Toggle */}
          <button
            onClick={() => {
              setIsExploded(!isExploded);
              playSciFiSound('explode');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              isExploded
                ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
            title="3D लेयर्स को अलग करके देखें (Explode Layers)"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xs:inline">{isExploded ? t.openingCollapseBtn : t.openingExplodeBtn}</span>
          </button>

          {/* AI Model Selector in 3D HUD */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-cyan-500/30">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 ml-1.5 shrink-0" />
            <select
              value={selectedModel}
              onChange={(e) => {
                const model = e.target.value as AiModelId;
                setSelectedModel(model);
                if (onModelChange) onModelChange(model);
                playSciFiSound('click');
              }}
              className="bg-transparent text-[11px] sm:text-xs font-bold text-cyan-200 focus:outline-none pr-2 py-0.5 cursor-pointer max-w-[110px] sm:max-w-none truncate"
            >
              {AI_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-slate-950 text-white">
                  {m.icon} {m.name} ({m.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Language Selector in 3D HUD */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 border border-amber-500/30">
            <Globe className="w-3.5 h-3.5 text-amber-400 ml-1.5 shrink-0" />
            <select
              value={currentLanguage}
              onChange={(e) => {
                const lang = e.target.value as SupportedLanguage;
                if (onLanguageChange) onLanguageChange(lang);
                playSciFiSound('click');
              }}
              className="bg-transparent text-[11px] sm:text-xs font-bold text-amber-200 focus:outline-none pr-1 sm:pr-2 py-0.5 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-950 text-white">
                  {l.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* Audio Mute/Unmute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-md text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'ध्वनि चालू करें (Unmute Audio)' : 'ध्वनि बंद करें (Mute Audio)'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Skip button */}
          <button
            onClick={() => {
              playSciFiSound('click');
              onClose(selectedRole, selectedModel);
            }}
            className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-slate-200 transition-all hover:border-cyan-400 cursor-pointer"
          >
            {t.openingSkipBtn}
          </button>
        </div>
      </div>

      {/* CENTER HUD STAGE & TELEMETRY */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 w-full text-center pointer-events-none my-auto py-4">
        {/* Step Indicator Badges with Live Visualizer Waves */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-900/85 border border-cyan-500/40 backdrop-blur-xl text-cyan-300 mb-3 shadow-xl shadow-cyan-950/50">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>3D NANO-BARRIER KINETICS</span>
          <span className="text-slate-600 hidden xs:inline">•</span>
          {/* Animated sound bars */}
          <div className="flex items-center gap-0.5 h-4">
            <span className="w-1 bg-cyan-400 rounded-full animate-sound-bar-1" />
            <span className="w-1 bg-amber-400 rounded-full animate-sound-bar-2" />
            <span className="w-1 bg-emerald-400 rounded-full animate-sound-bar-3" />
            <span className="w-1 bg-cyan-400 rounded-full animate-sound-bar-4" />
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-amber-400 font-mono">{scanProgress}% VERIFIED</span>
        </div>

        {/* Dynamic Animated Status Messages (Translated) */}
        <div className="min-h-16 flex flex-col items-center justify-center">
          {activeStep === 0 && (
            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-['Outfit'] tracking-tight">
                {t.openingStep0Title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-cyan-400">
                {t.openingStep0Desc}
              </p>
            </div>
          )}
          {activeStep === 1 && (
            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-amber-300 font-['Outfit'] tracking-tight">
                {t.openingStep1Title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-emerald-400">
                {t.openingStep1Desc}
              </p>
            </div>
          )}
          {activeStep === 2 && (
            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-cyan-300 font-['Outfit'] tracking-tight">
                {t.openingStep2Title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-amber-400">
                &gt; Active AI Engine: {AI_MODELS.find((m) => m.id === selectedModel)?.name}...
              </p>
            </div>
          )}
          {activeStep >= 3 && (
            <div className="space-y-1">
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-amber-400 via-amber-200 to-cyan-300 bg-clip-text text-transparent font-['Outfit'] tracking-tight">
                {t.openingStep3Title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                {t.openingStep3Desc}
              </p>
            </div>
          )}
        </div>

        {/* 3D MODE SELECTOR CARDS (Interactive with 3D Hover & Shimmer - Mobile Stack) */}
        <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto pointer-events-auto">
          {/* Option 1: Farmer / Aasaan Mode */}
          <button
            onClick={() => {
              setSelectedRole('farmer');
              playSciFiSound('click');
            }}
            className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-left border transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-xl flex flex-col justify-between cursor-pointer ${
              selectedRole === 'farmer'
                ? 'bg-gradient-to-b from-amber-500/25 to-amber-950/50 border-amber-400 shadow-xl shadow-amber-500/30 ring-2 ring-amber-400/40'
                : 'bg-slate-900/60 hover:bg-slate-900/80 border-slate-700/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-inner">
                🌾
              </div>
              {selectedRole === 'farmer' && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black">
                  ACTIVE
                </span>
              )}
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white font-['Outfit']">
                {t.openingRoleFarmerTitle}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-amber-300 font-semibold">Aasaan Farmer & Mandi Trader Mode</p>
              <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {t.openingRoleFarmerDesc}
              </p>
            </div>
          </button>

          {/* Option 2: FSSAI Food Department Portal */}
          <button
            onClick={() => {
              setSelectedRole('food_dept');
              playSciFiSound('click');
            }}
            className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-left border transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-xl flex flex-col justify-between cursor-pointer ${
              selectedRole === 'food_dept'
                ? 'bg-gradient-to-b from-emerald-500/25 to-emerald-950/50 border-emerald-400 shadow-xl shadow-emerald-500/30 ring-2 ring-emerald-400/40'
                : 'bg-slate-900/60 hover:bg-slate-900/80 border-slate-700/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl shadow-inner">
                🏛️
              </div>
              {selectedRole === 'food_dept' && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black">
                  ACTIVE
                </span>
              )}
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white font-['Outfit']">
                {t.openingRoleFoodDeptTitle}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-emerald-300 font-semibold">FSSAI Regulatory & Gazette Portal</p>
              <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {t.openingRoleFoodDeptDesc}
              </p>
            </div>
          </button>

          {/* Option 3: Pro Technologist & 3D Lab */}
          <button
            onClick={() => {
              setSelectedRole('pro');
              playSciFiSound('click');
            }}
            className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl text-left border transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-xl flex flex-col justify-between cursor-pointer ${
              selectedRole === 'pro'
                ? 'bg-gradient-to-b from-cyan-500/25 to-cyan-950/50 border-cyan-400 shadow-xl shadow-cyan-500/30 ring-2 ring-cyan-400/40'
                : 'bg-slate-900/60 hover:bg-slate-900/80 border-slate-700/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl shadow-inner">
                ⚡
              </div>
              {selectedRole === 'pro' && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-black">
                  ACTIVE
                </span>
              )}
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white font-['Outfit']">
                {t.openingRoleProTitle}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-cyan-300 font-semibold">Pro Technologist & 3D Packaging Lab</p>
              <p className="text-[10px] sm:text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {t.openingRoleProDesc}
              </p>
            </div>
          </button>
        </div>

        {/* Selected AI Model Info Strip */}
        <div className="mt-3.5 p-2 sm:p-2.5 rounded-xl bg-black/60 border border-white/10 max-w-xl mx-auto flex items-center justify-between text-xs pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-base">{AI_MODELS.find((m) => m.id === selectedModel)?.icon}</span>
            <div className="text-left">
              <span className="font-bold text-white block text-xs">
                {AI_MODELS.find((m) => m.id === selectedModel)?.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-400">
                {AI_MODELS.find((m) => m.id === selectedModel)?.engine}
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 font-bold block">
              {AI_MODELS.find((m) => m.id === selectedModel)?.speed}
            </span>
            <span className="text-[9px] sm:text-[10px] text-cyan-300 font-mono">
              {AI_MODELS.find((m) => m.id === selectedModel)?.accuracy}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 pb-4 sm:pb-6 w-full flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pointer-events-auto">
        {/* System telemetry stats (hidden on small phone screens to save space) */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>100+ Indian Crops</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>FSSAI 2026 Gazette</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Zero Spoilage</span>
          </div>
        </div>

        {/* Enter Button */}
        <button
          onClick={() => {
            playSciFiSound('chime');
            onClose(selectedRole, selectedModel);
          }}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 text-slate-950 shadow-2xl shadow-cyan-500/30 hover:opacity-95 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer group"
        >
          <span>{t.openingEnterAppBtn}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-slate-950" />
        </button>
      </div>
    </div>
  );
};
