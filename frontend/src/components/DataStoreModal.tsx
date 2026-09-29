import React, { useState, useEffect } from 'react';
import {
  Database,
  X,
  Trash2,
  Download,
  Volume2,
  VolumeX,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  Calendar,
  Layers,
  Thermometer,
  Clock,
  Plus,
  ShieldCheck,
  Package,
  Wine,
  Biohazard
} from 'lucide-react';
import {
  SavedScanRecord,
  SavedFarmerRecord,
  fetchScanHistory,
  deleteScanRecord,
  clearAllScans,
  fetchFarmerRecords,
  saveFarmerRecord,
  getExportCsvUrl
} from '../services/api';
import {
  ALCOHOLIC_BEVERAGES_STANDARDS,
  METAL_CONTAMINANTS_STANDARDS,
  FOOD_FORTIFICATION_STANDARDS,
  KEY_INS_ADDITIVES,
} from '../data/fssaiRegulationsData';

interface DataStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCrop: (cropName: string, hindiName: string, category: string) => void;
  onSpeakText?: (text: string) => void;
}

export const DataStoreModal: React.FC<DataStoreModalProps> = ({
  isOpen,
  onClose,
  onApplyCrop,
  onSpeakText,
}) => {
  const [activeTab, setActiveTab] = useState<'scans' | 'farmer' | 'regulations'>('scans');
  const [scans, setScans] = useState<SavedScanRecord[]>([]);
  const [farmerRecords, setFarmerRecords] = useState<SavedFarmerRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  // New batch modal state
  const [showAddBatch, setShowAddBatch] = useState<boolean>(false);
  const [newCropName, setNewCropName] = useState<string>('Tomato');
  const [newHindiName, setNewHindiName] = useState<string>('टमाटर');
  const [newQuantity, setNewQuantity] = useState<number>(250);
  const [newPkg, setNewPkg] = useState<string>('एंटी-फॉग व सूक्ष्म-छिद्रित पाउच');
  const [newTemp, setNewTemp] = useState<string>('10°C - 13°C');
  const [newSavings, setNewSavings] = useState<number>(4500);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [scansData, farmerData] = await Promise.all([
        fetchScanHistory(),
        fetchFarmerRecords(),
      ]);
      setScans(scansData);
      setFarmerRecords(farmerData);
    } catch (err) {
      console.warn('Error loading stored records:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteScan = async (id: string) => {
    await deleteScanRecord(id);
    setScans((prev) => prev.filter((s) => s.id !== id));
  };

  const handleClearAll = async () => {
    if (window.confirm('क्या आप सचमुच सारा स्कैन इतिहास साफ़ करना चाहते हैं? (Clear all history?)')) {
      await clearAllScans();
      setScans([]);
    }
  };

  const handlePlayAudio = (record: SavedScanRecord) => {
    if (!('speechSynthesis' in window)) return;

    if (activeAudioId === record.id) {
      window.speechSynthesis.cancel();
      setActiveAudioId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const text =
      record.hindi_speech ||
      `${record.hindi_name} (${record.crop_name}) के लिए अनुशंसित पैकेजिंग है: ${record.recommended_material}। भंडारण तापमान ${record.storage_temp}। अनुमानित शेल्फ लाइफ ${record.shelf_life} है।`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((v) => v.lang.includes('hi') || v.name.includes('Hindi'));
    if (hindiVoice) utterance.voice = hindiVoice;

    utterance.onstart = () => setActiveAudioId(record.id);
    utterance.onend = () => setActiveAudioId(null);
    utterance.onerror = () => setActiveAudioId(null);

    window.speechSynthesis.speak(utterance);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `packsmart_scans_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord = await saveFarmerRecord({
      farmer_name: 'Kisan Bhai',
      crop_name: newCropName,
      hindi_name: newHindiName,
      quantity_kg: newQuantity,
      current_loss_pct: 18.0,
      recommended_package: newPkg,
      storage_temp: newTemp,
      projected_savings_inr: newSavings,
      notes: 'मैन्युअल रूप से किसान डायरी में सहेजा गया',
    });
    setFarmerRecords((prev) => [newRecord, ...prev]);
    setShowAddBatch(false);
  };

  if (!isOpen) return null;

  // Filter scans
  const filteredScans = scans.filter((s) => {
    const matchesCat =
      selectedCategory === 'all' || s.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      !searchQuery ||
      s.crop_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.hindi_name.includes(searchQuery) ||
      s.recommended_material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = ['all', 'Vegetables', 'Fruits', 'Dairy', 'Grains', 'Spices'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl glass-card border border-cyan-500/40 p-5 sm:p-7 shadow-2xl bg-slate-950/95 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-amber-500 p-[1.5px]">
              <div className="w-full h-full bg-[#070B14] rounded-[9px] flex items-center justify-center">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white font-['Outfit'] flex items-center gap-2">
                डेटा स्टोर व स्कैन इतिहास (PackSmart Data Store)
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  SQLITE + LOCAL CACHE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                कैमरे से स्कैन की गई फसलें, अनुशंसित पैकेजिंग और किसान रिकॉर्ड्स सुरक्षित संग्रहित हैं
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              title="रिफ्रेश करें"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Telemetry Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 border-b border-white/5 shrink-0 text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-slate-400 block font-mono">कुल स्कैन (Total Scans)</span>
            <span className="text-lg font-bold text-white font-['Outfit']">{scans.length}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-slate-400 block font-mono">किसान बैच (Farm Batches)</span>
            <span className="text-lg font-bold text-emerald-400 font-['Outfit']">{farmerRecords.length}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-slate-400 block font-mono">औसत सटीकता (Avg Match)</span>
            <span className="text-lg font-bold text-amber-400 font-['Outfit']">
              {scans.length > 0
                ? `${Math.round(scans.reduce((a, b) => a + b.confidence, 0) / scans.length)}%`
                : '95%'}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[11px] text-slate-400 block font-mono">डेटाबेस स्थिति (DB Status)</span>
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1 mt-1 font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              ONLINE SYNCED
            </span>
          </div>
        </div>

        {/* Tabs & Search / Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 py-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setActiveTab('scans')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'scans'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📸 कैमरा स्कैन ({scans.length})
            </button>
            <button
              onClick={() => setActiveTab('farmer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'farmer'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌾 किसान रिकॉर्ड्स ({farmerRecords.length})
            </button>
            <button
              onClick={() => setActiveTab('regulations')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'regulations'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📜 FSSAI राजपत्र मानक डेटा
            </button>
          </div>

          {activeTab === 'scans' && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="फसल खोजें (Search)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                      selectedCategory === c
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-white/5 text-slate-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {c === 'all' ? 'सभी' : c}
                  </button>
                ))}
              </div>

              {/* Export CSV / JSON & Clear */}
              <div className="flex items-center gap-1.5">
                <a
                  href={getExportCsvUrl()}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all flex items-center gap-1 text-xs font-bold"
                  title="CSV डाउनलोड करें"
                >
                  <Download className="w-3 h-3" />
                  <span>CSV</span>
                </a>

                <button
                  onClick={handleExportJson}
                  className="px-2.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all flex items-center gap-1 text-xs font-bold"
                  title="JSON बैकअप डाउनलोड करें"
                >
                  <Download className="w-3 h-3" />
                  <span>JSON</span>
                </button>

                {scans.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="p-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 transition-all"
                    title="इतिहास साफ़ करें"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'farmer' && (
            <button
              onClick={() => setShowAddBatch(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>नया बैच जोड़ें (Add Batch)</span>
            </button>
          )}
        </div>

        {/* Content Body: Scans List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
          {activeTab === 'scans' && (
            <>
              {filteredScans.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Database className="w-10 h-10 mx-auto text-slate-600 animate-pulse" />
                  <p className="text-sm font-semibold">कोई सुरक्षित स्कैन उपलब्ध नहीं है</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    कैमरा स्कैनर से फसल की फोटो खींचें या डेमो फसल चुनकर स्कैन करें — परिणाम यहां स्वतः सुरक्षित होंगे।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-2.5 relative group"
                    >
                      {/* Top Row: Crop Name & Accuracy Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-extrabold text-white font-['Outfit']">
                              {scan.hindi_name}{' '}
                              <span className="text-xs font-normal text-slate-400">({scan.crop_name})</span>
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20 inline-block mt-0.5">
                            {scan.category} • {scan.detector}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {scan.confidence}% Match
                          </span>
                          <button
                            onClick={() => handleDeleteScan(scan.id)}
                            className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="हटाएं"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Advice Details Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs bg-black/40 p-2.5 rounded-xl border border-white/5">
                        <div>
                          <span className="text-slate-400 block text-[10px]">📦 पैकेजिंग सामग्री:</span>
                          <p className="font-semibold text-emerald-300 line-clamp-1">{scan.recommended_material}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">❄️ तापमान:</span>
                          <p className="font-semibold text-amber-300">{scan.storage_temp}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">⏳ शेल्फ लाइफ:</span>
                          <p className="font-semibold text-cyan-300">{scan.shelf_life}</p>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">💨 MAP गैस:</span>
                          <p className="font-mono text-slate-300 text-[10px] truncate">{scan.map_gas || 'N/A'}</p>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-xs">
                        <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {scan.created_at ? new Date(scan.created_at).toLocaleDateString('hi-IN') : 'Just now'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePlayAudio(scan)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1 text-[11px] font-semibold transition-all"
                            title="सलाह हिंदी में सुनें"
                          >
                            {activeAudioId === scan.id ? (
                              <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" />
                            )}
                            <span>{activeAudioId === scan.id ? 'रुकें' : 'सुनें'}</span>
                          </button>

                          <button
                            onClick={() => {
                              onApplyCrop(scan.crop_name, scan.hindi_name, scan.category);
                              onClose();
                            }}
                            className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 text-[11px] font-semibold transition-all"
                          >
                            <span>पूरी जांच</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'farmer' && (
            <>
              {farmerRecords.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <Package className="w-10 h-10 mx-auto text-emerald-600 animate-pulse" />
                  <p className="text-sm font-semibold">कोई किसान फसल रिकॉर्ड नहीं मिला</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    ऊपर &quot;नया बैच जोड़ें&quot; बटन दबाकर अपनी कटाई, पैकेजिंग और अपेक्षित बचत का रिकॉर्ड सुरक्षित रखें।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {farmerRecords.map((frm) => (
                    <div
                      key={frm.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-base font-extrabold text-white font-['Outfit']">
                            {frm.hindi_name} ({frm.crop_name})
                          </h4>
                          <span className="text-xs text-slate-400 font-mono">
                            मात्रा: <strong className="text-cyan-300">{frm.quantity_kg} किग्रा</strong>
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          बचत: ₹{frm.projected_savings_inr}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs space-y-1">
                        <span className="text-slate-400 block text-[10px]">📦 चुनी गई पैकेजिंग:</span>
                        <p className="font-semibold text-emerald-300">{frm.recommended_package}</p>
                        <span className="text-slate-400 block text-[10px] mt-1.5">❄️ भंडारण स्थिति:</span>
                        <p className="font-semibold text-amber-300">{frm.storage_temp}</p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-white/5 pt-2">
                        <span>{frm.farmer_name}</span>
                        <span>{frm.created_at ? new Date(frm.created_at).toLocaleDateString('hi-IN') : 'सहेजा गया'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'regulations' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-amber-300">
                    आधिकारिक FSSAI राजपत्र डेटाबेस (Gazette Standards)
                  </h4>
                  <p className="text-[11px] text-slate-300">
                    अल्कोहलिक पेय 2018, भारी धातु व संदूषक 2011, और सुदृढ़ीकृत खाद्य (+F) 2018
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-400 text-slate-950">
                  GOVT OF INDIA
                </span>
              </div>

              {/* Sub-sections */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Wine className="w-3.5 h-3.5" /> अल्कोहलिक पेय सीमा (Alcoholic Beverages Standards 2018)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {ALCOHOLIC_BEVERAGES_STANDARDS.slice(0, 4).map((b, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{b.beverageName}</span>
                        <span className="text-cyan-300 font-mono">{b.ethanolPctVolume}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex justify-between">
                        <span>मेथनॉल अधिकतम: {b.methylAlcoholMax}</span>
                        <span>लेड (Pb): &lt;{b.leadMgLMax} mg/L</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5 pt-2">
                  <Biohazard className="w-3.5 h-3.5" /> भारी धातु व संदूषक सीमा (Contaminants & Heavy Metals)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {METAL_CONTAMINANTS_STANDARDS.slice(0, 6).map((m, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-amber-300 block">{m.metal}</span>
                        <span className="text-[11px] text-slate-400">{m.articleOfFood}</span>
                      </div>
                      <span className="font-mono font-bold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {m.ppmMax} ppm
                      </span>
                    </div>
                  ))}
                </div>

                <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 pt-2">
                  🌾 +F सुदृढ़ीकरण मुख्य खाद्य (Fortification Standards)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {FOOD_FORTIFICATION_STANDARDS.slice(0, 4).map((f, i) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{f.commodityHi}</span>
                        <span className="text-emerald-400 text-[10px] font-mono">+F STANDARD</span>
                      </div>
                      <p className="text-[11px] text-slate-300"><strong>पोषक तत्व:</strong> {f.fortificant}</p>
                      <p className="text-[11px] text-cyan-200 font-mono">{f.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        {showAddBatch && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-3xl p-6 z-20 flex flex-col justify-center items-center">
            <div className="w-full max-w-md bg-slate-900 border border-emerald-500/40 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  किसान फसल बैच सुरक्षित करें (Save Batch)
                </h4>
                <button
                  onClick={() => setShowAddBatch(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">फसल का नाम (Hindi/English):</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newHindiName}
                      onChange={(e) => setNewHindiName(e.target.value)}
                      placeholder="टमाटर"
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                      required
                    />
                    <input
                      type="text"
                      value={newCropName}
                      onChange={(e) => setNewCropName(e.target.value)}
                      placeholder="Tomato"
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-300 block mb-1">मात्रा (किग्रा / Kg):</label>
                    <input
                      type="number"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1">अनुमानित बचत (₹ INR):</label>
                    <input
                      type="number"
                      value={newSavings}
                      onChange={(e) => setNewSavings(Number(e.target.value))}
                      className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">पैकेजिंग थैली / बैग:</label>
                  <input
                    type="text"
                    value={newPkg}
                    onChange={(e) => setNewPkg(e.target.value)}
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">भंडारण तापमान (°C):</label>
                  <input
                    type="text"
                    value={newTemp}
                    onChange={(e) => setNewTemp(e.target.value)}
                    className="w-full p-2 rounded-xl bg-white/5 border border-white/10 text-white"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddBatch(false)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-300 hover:text-white"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                  >
                    सहेजें (Save)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
