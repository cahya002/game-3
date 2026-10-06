import React, { useState } from 'react';
import { sound } from '../utils/audio';
import {
  Flame,
  Snowflake,
  Shield,
  Droplets,
  Wind,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  FlaskConical,
  ZoomIn,
} from 'lucide-react';

interface WaterCycleSimulationModalProps {
  onComplete: () => void;
  onClose?: () => void;
}

export const WaterCycleSimulationModal: React.FC<WaterCycleSimulationModalProps> = ({
  onComplete,
}) => {
  // Simulation Steps:
  // Step 1: Masukkan Ramuan Esensi Daun Mint / Herbal (Animasi Zoom In & Tetes Masuk)
  // Step 2: Panaskan Air Teko (Evaporasi)
  // Step 3: Pasang Penutup Kaca
  // Step 4: Letakkan Batu Es (Kondensasi & Presipitasi)
  // Step 5: Hirup Uap Hangat Ramuan (Jembatan ke Sistem Pernapasan)

  const [hasPotion, setHasPotion] = useState(false);
  const [heatOn, setHeatOn] = useState(false);
  const [hasLid, setHasLid] = useState(false);
  const [hasIce, setHasIce] = useState(false);
  const [hasInhaledSteam, setHasInhaledSteam] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showInhaleAnimation, setShowInhaleAnimation] = useState(false);

  // Zoom and Drop Animation States
  const [isZooming, setIsZooming] = useState(false);
  const [dropAnimationStage, setDropAnimationStage] = useState<'idle' | 'bottle_enter' | 'dropping' | 'splashing'>('idle');

  // Trigger Zoom-In and Add Potion Animation
  const handleAddPotion = () => {
    if (isZooming) return;

    sound.playWhoosh();
    setIsZooming(true);
    setDropAnimationStage('bottle_enter');

    // Bottle enters and tilts
    setTimeout(() => {
      setDropAnimationStage('dropping');
      sound.playTone(660, 'sine', 0.08, 0.15);
    }, 600);

    // Droplet hits water with splash
    setTimeout(() => {
      setDropAnimationStage('splashing');
      sound.playTone(880, 'sine', 0.1, 0.2);
      sound.playPickup();
      setHasPotion(true);
      if (activeStep === 1) setActiveStep(2);
    }, 1400);

    // Camera zooms back out
    setTimeout(() => {
      setDropAnimationStage('idle');
      setIsZooming(false);
    }, 2500);
  };

  const handleToggleHeat = () => {
    sound.playTone(520, 'sine', 0.08, 0.2);
    setHeatOn(true);
    if (activeStep <= 2) setActiveStep(3);
  };

  const handleToggleLid = () => {
    sound.playTone(580, 'sine', 0.08, 0.2);
    setHasLid(true);
    if (activeStep <= 3) setActiveStep(4);
  };

  const handleAddIce = () => {
    sound.playTone(660, 'sine', 0.1, 0.25);
    setHasIce(true);
    if (activeStep <= 4) setActiveStep(5);
  };

  const handleInhaleSteam = () => {
    sound.playTone(440, 'triangle', 0.2, 0.4);
    setShowInhaleAnimation(true);
    setHasInhaledSteam(true);
    if (activeStep <= 5) setActiveStep(6);
  };

  const isExperimentDone = hasPotion && heatOn && hasLid && hasIce && hasInhaledSteam;

  return (
    <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white/98 border-4 border-sky-400 rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-sky-100 pb-3 mb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-sky-100 border-2 border-sky-300 text-sky-600 flex items-center justify-center text-xl shadow-inner flex-shrink-0">
              🔬
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-sky-500 text-white uppercase tracking-wider">
                  Mini-Lab Sains Desa
                </span>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                  IPAS Fase C
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Simulasi Siklus Air & Uap Pernapasan
              </h2>
            </div>
          </div>
          <span className="text-xs font-black text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-full hidden sm:inline">
            Teko Transparan & Batu Es
          </span>
        </div>

        {/* Interactive Lab Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 overflow-y-auto pr-1">
          {/* Visual Simulation Stage (Left: 7 cols) with Zoom Capability */}
          <div
            className={`md:col-span-7 bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50 rounded-2xl border-2 border-sky-200 p-4 flex flex-col items-center justify-center relative min-h-[270px] sm:min-h-[300px] overflow-hidden shadow-inner transition-all duration-700 ${
              isZooming ? 'ring-4 ring-amber-400 bg-amber-50/90 shadow-2xl' : ''
            }`}
          >
            {/* Background Lab Environment Tag */}
            <div className="absolute top-2 left-3 text-[11px] font-bold text-sky-800 bg-white/90 px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-20">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{isZooming ? '🔍 Mode Zoom-In Kamera Lab' : 'Percobaan Siklus Air di Rumah'}</span>
            </div>

            {/* ZOOM-IN CINEMATIC BANNER */}
            {isZooming && (
              <div className="absolute top-10 inset-x-4 z-40 bg-slate-900/90 border-2 border-amber-400 text-amber-300 text-xs font-black py-1.5 px-3 rounded-full text-center shadow-xl animate-bounce-soft flex items-center justify-center gap-1.5">
                <ZoomIn className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span>
                  {dropAnimationStage === 'splashing'
                    ? '✨ Ramuan Masuk & Menyatu dengan Air! Splash! ✨'
                    : '🔬 Memasukkan Ramuan Esensi Alami ke dalam Teko...'}
                </span>
              </div>
            )}

            {/* TEKO TRANSPARAN APPARATUS (With Smooth Zoom Scale) */}
            <div
              className={`relative w-48 h-56 flex flex-col items-center justify-end mt-4 transition-transform duration-700 ease-out origin-center ${
                isZooming ? 'scale-135 sm:scale-150 -translate-y-4' : 'scale-100'
              }`}
            >
              {/* ANIMASI BOTOL RAMUAN & TETESAN MASUK */}
              {isZooming && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none">
                  {/* Glass Potion Dropper / Flask */}
                  <div
                    className={`transition-all duration-500 transform ${
                      dropAnimationStage === 'dropping' || dropAnimationStage === 'splashing'
                        ? 'translate-y-4 rotate-35 scale-110'
                        : '-translate-y-2 rotate-0 scale-95'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-sky-300 border-2 border-white shadow-2xl flex items-center justify-center text-xl filter drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
                      🧪
                    </div>
                  </div>

                  {/* Falling Potion Droplets */}
                  {(dropAnimationStage === 'dropping' || dropAnimationStage === 'splashing') && (
                    <div className="flex flex-col items-center mt-1 animate-in fade-in duration-150">
                      <div className="w-2.5 h-4 bg-emerald-400 border border-white rounded-full animate-bounce shadow-md" style={{ animationDuration: '0.4s' }} />
                      <div className="w-2 h-3 bg-teal-300 border border-white rounded-full animate-bounce -mt-1 shadow-md" style={{ animationDuration: '0.5s', animationDelay: '0.15s' }} />
                      <span className="text-[10px] text-emerald-600 font-black animate-ping mt-1">✨</span>
                    </div>
                  )}
                </div>
              )}

              {/* 1. Batu Es di Atas Penutup (Step 4) */}
              {hasIce && (
                <div className="absolute top-1 z-30 flex items-center justify-center gap-1 animate-in zoom-in duration-300">
                  <div className="bg-sky-200 border-2 border-sky-400 rounded-md p-1 shadow-md flex items-center gap-0.5">
                    <Snowflake className="w-3.5 h-3.5 text-sky-600 animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="text-[9px] font-black text-sky-900">Batu Es Dingin</span>
                    <span className="text-xs">🧊🧊</span>
                  </div>
                </div>
              )}

              {/* 2. Penutup Kaca / Pembatas Transparan (Step 3) */}
              {hasLid && (
                <div className="absolute top-8 w-36 h-4 bg-sky-300/60 border-2 border-sky-500 rounded-t-lg z-20 flex items-center justify-center shadow-sm">
                  {/* Handle */}
                  <div className="w-4 h-2 bg-slate-700 rounded-t -mt-3 border border-slate-900" />
                </div>
              )}

              {/* 3. TEKO KACA TRANSPARAN BODY */}
              <div className="relative w-40 h-40 bg-sky-200/30 border-4 border-sky-400 rounded-b-3xl rounded-t-lg backdrop-blur-xs flex flex-col justify-end overflow-hidden shadow-xl">
                {/* Spout Teko (Cerobong Uap) */}
                <div className="absolute top-4 -right-4 w-7 h-5 bg-sky-300/40 border-2 border-sky-400 -rotate-45 rounded-r-lg border-l-0 pointer-events-none" />

                {/* Gagang Teko */}
                <div className="absolute top-6 -left-5 w-6 h-18 border-4 border-slate-700 rounded-l-2xl pointer-events-none" />

                {/* Splash Wave Rings when Ramuan Enters */}
                {dropAnimationStage === 'splashing' && (
                  <div className="absolute bottom-12 inset-x-0 flex items-center justify-center pointer-events-none z-30">
                    <div className="w-16 h-4 border-2 border-emerald-400 rounded-full animate-ping opacity-90" />
                    <span className="text-base absolute -top-4 animate-bounce">💧</span>
                  </div>
                )}

                {/* Kondensasi / Butiran Embun di bawah penutup kaca */}
                {hasIce && (
                  <div className="absolute top-2 inset-x-2 flex justify-around opacity-90 z-20">
                    <span className="text-[10px] animate-pulse">💧</span>
                    <span className="text-[8px] animate-pulse" style={{ animationDelay: '0.3s' }}>💧</span>
                    <span className="text-[11px] animate-pulse" style={{ animationDelay: '0.6s' }}>💧</span>
                    <span className="text-[9px] animate-pulse" style={{ animationDelay: '0.2s' }}>💧</span>
                  </div>
                )}

                {/* Presipitasi / Tetesan Air Hujan yang Jatuh */}
                {hasIce && (
                  <div className="absolute inset-0 flex flex-col justify-around items-center pointer-events-none z-15">
                    <div className="w-1.5 h-3 bg-sky-500 rounded-full animate-bounce" style={{ animationDuration: '0.7s' }} />
                    <div className="w-1.5 h-3 bg-sky-400 rounded-full animate-bounce" style={{ animationDuration: '0.9s', animationDelay: '0.3s' }} />
                  </div>
                )}

                {/* Uap Panas Naik (Evaporasi) */}
                {heatOn && (
                  <div className="absolute inset-x-0 bottom-14 top-2 flex justify-center items-center gap-2 pointer-events-none">
                    <span className="text-xl animate-bounce-soft opacity-70">♨️</span>
                    <span className="text-2xl animate-bounce-soft opacity-80" style={{ animationDelay: '0.4s' }}>♨️</span>
                    <span className="text-xl animate-bounce-soft opacity-70" style={{ animationDelay: '0.8s' }}>♨️</span>
                  </div>
                )}

                {/* Air di dalam Teko (Color shifts when Ramuan entered) */}
                <div
                  className={`w-full transition-all duration-700 ${
                    hasPotion
                      ? heatOn
                        ? 'h-16 bg-gradient-to-t from-teal-600 via-emerald-400 to-sky-400'
                        : 'h-14 bg-gradient-to-t from-teal-500 to-emerald-300'
                      : heatOn
                      ? 'h-16 bg-gradient-to-t from-sky-500 to-sky-400'
                      : 'h-14 bg-sky-300'
                  } border-t-2 border-sky-300 relative flex items-center justify-center`}
                >
                  {heatOn && (
                    <div className="flex gap-2 opacity-80 animate-pulse text-[10px]">
                      <span>🫧</span>
                      <span>🫧</span>
                      <span>🫧</span>
                    </div>
                  )}

                  {hasPotion && (
                    <div className="absolute top-1 flex gap-1 text-[8px] animate-bounce-soft">
                      <span>🌿</span>
                      <span>✨</span>
                    </div>
                  )}

                  <span className="absolute bottom-1 text-[9px] font-black text-white/95">
                    {hasPotion
                      ? heatOn
                        ? 'Air Ramuan (Mendidih) 🌿'
                        : 'Air + Ramuan Mint 🌿'
                      : heatOn
                      ? 'Air Panas (Mendidih)'
                      : 'Air Biasa'}
                  </span>
                </div>
              </div>

              {/* Kompor Pemanas Api (Heater) */}
              <div className="w-44 h-7 bg-slate-800 rounded-b-xl border-2 border-slate-900 flex items-center justify-center relative shadow-lg">
                {heatOn ? (
                  <div className="flex items-center gap-1 animate-fire">
                    <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  </div>
                ) : (
                  <span className="text-[10px] font-bold text-slate-400">Pemanas Mati</span>
                )}
              </div>
            </div>

            {/* Inhale Steam Pop-up Visualizer */}
            {showInhaleAnimation && (
              <div className="absolute inset-0 bg-sky-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-40 text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-sky-500/30 border-3 border-sky-300 flex items-center justify-center text-3xl mb-2 animate-bounce-soft">
                  🫁
                </div>
                <h4 className="text-white font-black text-base sm:text-lg mb-1">
                  Menghirup Uap Hangat Ramuan Segar!
                </h4>
                <div className="bg-sky-900/80 border border-sky-400 text-sky-100 text-xs sm:text-sm p-3 rounded-xl max-w-sm leading-relaxed mb-3 font-medium">
                  <span className="text-amber-300 font-bold block mb-1">
                    Jalur Udara & Uap Ramuan Masuk:
                  </span>
                  Rongga Hidung (menghangatkan & melembapkan aroma mint) ➔ Tenggorokan (Trakea) ➔ Paru-Paru (Bronkus & Alveolus).
                </div>
                <button
                  type="button"
                  onClick={() => setShowInhaleAnimation(false)}
                  className="btn-cartoon-emerald text-white px-5 py-2 rounded-full font-black text-xs cursor-pointer shadow-md"
                >
                  Paham! Lanjut Analisis
                </button>
              </div>
            )}
          </div>

          {/* Controls & Step Explanations (Right: 5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-2 sm:space-y-3">
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wide block">
                Langkah Percobaan Sains:
              </span>

              {/* Step 1 Button: Masukkan Ramuan (Animasi Zoom & Masuk) */}
              <button
                type="button"
                onClick={handleAddPotion}
                disabled={isZooming}
                className={`w-full p-2.5 rounded-xl border-2 flex items-center justify-between text-left transition-all ${
                  hasPotion
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                    : 'bg-gradient-to-r from-amber-50 to-emerald-50 hover:bg-emerald-100 border-emerald-400 text-slate-900 shadow-md cursor-pointer animate-pulse'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FlaskConical className={`w-4 h-4 ${hasPotion ? 'text-emerald-600' : 'text-emerald-500'}`} />
                  <div>
                    <div className="text-xs font-black">
                      1. Masukkan Ramuan Esensi
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {hasPotion ? 'Ramuan Daun Mint telah masuk!' : 'Klik untuk animasi zoom & tetes ramuan!'}
                    </div>
                  </div>
                </div>
                {hasPotion ? (
                  <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Ulang Zoom</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">
                    Teteskan
                  </span>
                )}
              </button>

              {/* Step 2 Button: Panaskan Air Teko */}
              <button
                type="button"
                onClick={handleToggleHeat}
                disabled={heatOn || !hasPotion}
                className={`w-full p-2.5 rounded-xl border-2 flex items-center justify-between text-left transition-all ${
                  heatOn
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : !hasPotion
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white hover:bg-amber-50 border-amber-300 text-slate-900 shadow-sm cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className={`w-4 h-4 ${heatOn ? 'text-emerald-600' : 'text-amber-500'}`} />
                  <div>
                    <div className="text-xs font-black">2. Panaskan Air Teko</div>
                    <div className="text-[10px] text-slate-500">Memicu proses Evaporasi (Uap)</div>
                  </div>
                </div>
                {heatOn ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Mulai</span>}
              </button>

              {/* Step 3 Button: Pasang Penutup Kaca */}
              <button
                type="button"
                onClick={handleToggleLid}
                disabled={!heatOn || hasLid}
                className={`w-full p-2.5 rounded-xl border-2 flex items-center justify-between text-left transition-all ${
                  hasLid
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : !heatOn
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white hover:bg-sky-50 border-sky-300 text-slate-900 shadow-sm cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Shield className={`w-4 h-4 ${hasLid ? 'text-emerald-600' : 'text-sky-500'}`} />
                  <div>
                    <div className="text-xs font-black">3. Pasang Penutup Kaca</div>
                    <div className="text-[10px] text-slate-500">Menahan uap agar terkumpul</div>
                  </div>
                </div>
                {hasLid ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">Pasang</span>}
              </button>

              {/* Step 4 Button: Letakkan Batu Es */}
              <button
                type="button"
                onClick={handleAddIce}
                disabled={!hasLid || hasIce}
                className={`w-full p-2.5 rounded-xl border-2 flex items-center justify-between text-left transition-all ${
                  hasIce
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : !hasLid
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-white hover:bg-sky-50 border-sky-400 text-slate-900 shadow-sm cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Snowflake className={`w-4 h-4 ${hasIce ? 'text-emerald-600' : 'text-sky-600'}`} />
                  <div>
                    <div className="text-xs font-black">4. Letakkan Batu Es</div>
                    <div className="text-[10px] text-slate-500">Memicu Kondensasi & Hujan (Presipitasi)</div>
                  </div>
                </div>
                {hasIce ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">Letakkan</span>}
              </button>

              {/* Step 5: Hirup Uap Hangat */}
              <button
                type="button"
                onClick={handleInhaleSteam}
                disabled={!hasIce}
                className={`w-full p-2.5 rounded-xl border-2 flex items-center justify-between text-left transition-all ${
                  hasInhaledSteam
                    ? 'bg-teal-50 border-teal-400 text-teal-950 ring-2 ring-teal-200'
                    : !hasIce
                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-950 font-bold shadow-md cursor-pointer animate-pulse'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Wind className={`w-4 h-4 ${hasInhaledSteam ? 'text-teal-600' : 'text-amber-700'}`} />
                  <div>
                    <div className="text-xs font-black">5. Hirup Uap Air Hangat</div>
                    <div className="text-[10px] text-slate-600">Jembatan belajar sistem pernapasan</div>
                  </div>
                </div>
                {hasInhaledSteam ? <CheckCircle2 className="w-4 h-4 text-teal-600" /> : <span className="text-[10px] font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded">Hirup</span>}
              </button>
            </div>

            {/* Scientific Explanation Summary Box */}
            <div className="bg-sky-50 border border-sky-200 p-2.5 rounded-xl text-slate-800 text-[11px] leading-relaxed">
              <span className="font-bold text-sky-900 block mb-0.5">Kesimpulan Sains IPAS:</span>
              Ramuan herbal larut, dipanaskan hingga menguap (<strong>Evaporasi</strong>). Saat bertemu dinginnya batu es di penutup, uap mengembun jadi butiran air (<strong>Kondensasi</strong>), lalu menetes jatuh kembali (<strong>Presipitasi</strong>)!
            </div>

            {/* Complete Experiment Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={onComplete}
                disabled={!isExperimentDone}
                className={`w-full py-2.5 px-4 rounded-full font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  isExperimentDone
                    ? 'btn-cartoon-emerald text-white shadow-lg cursor-pointer active:scale-95'
                    : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
                }`}
              >
                <span>{isExperimentDone ? 'Selesai Eksperimen & Lanjut Tahap 3!' : 'Selesaikan Semua Langkah (1-5)'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
