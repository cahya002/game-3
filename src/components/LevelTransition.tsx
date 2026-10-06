import React, { useEffect, useState, useRef } from 'react';
import { sound } from '../utils/audio';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Wind, Flame, Droplets, CheckCircle2 } from 'lucide-react';

interface LevelTransitionProps {
  chapterNumber: number;
  chapterTitle: string;
  chapterSubtitle: string;
  completedText?: string;
  missionPoints: { icon: string; text: string }[];
  onComplete: () => void;
  autoDurationMs?: number;
}

export const LevelTransition: React.FC<LevelTransitionProps> = ({
  chapterNumber = 2,
  chapterTitle = 'BABAK 2: SISTEM PERNAPASAN',
  chapterSubtitle = 'Lindungi Paru-Paru & Padamkan Kebakaran Semak',
  completedText = 'Babak 1 Tuntas: Rahasia Siklus Air! 🎉',
  missionPoints = [
    { icon: '😷', text: 'Pasang masker medis untuk saring asap beracun' },
    { icon: '🪣', text: 'Ciduk air di sumur berbumbung desa' },
    { icon: '🔥', text: 'Padamkan 3 titik kebakaran semak sebelum merembet' },
  ],
  onComplete,
  autoDurationMs = 2800,
}) => {
  const [phase, setPhase] = useState<'entering' | 'holding' | 'exiting'>('entering');
  const [progress, setProgress] = useState(0);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    // Play initial breeze and fanfare chime
    sound.playWhoosh();
    setTimeout(() => {
      sound.playLevelFanfare();
      setPhase('holding');
    }, 450);

    // Progress bar animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / autoDurationMs) * 100);
      setProgress(pct);

      if (elapsed >= autoDurationMs && !isFinishedRef.current) {
        clearInterval(interval);
        handleExit();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [autoDurationMs]);

  const handleExit = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setPhase('exiting');
    sound.playWhoosh();

    setTimeout(() => {
      onComplete();
    }, 550);
  };

  return (
    <div className="absolute inset-0 z-50 overflow-hidden flex items-center justify-center select-none pointer-events-auto">
      {/* Sky backdrop that fades in when clouds meet */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-teal-200 transition-opacity duration-300 ${
          phase === 'exiting' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Floating decorative mini clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-12 opacity-80 animate-cloud-bob" style={{ animationDelay: '0s' }}>
          <CloudSvg width={140} height={70} color="#ffffff" />
        </div>
        <div className="absolute top-16 right-16 opacity-75 animate-cloud-bob" style={{ animationDelay: '1s' }}>
          <CloudSvg width={180} height={90} color="#f0f9ff" />
        </div>
        <div className="absolute bottom-12 left-20 opacity-80 animate-cloud-bob" style={{ animationDelay: '1.5s' }}>
          <CloudSvg width={160} height={80} color="#ffffff" />
        </div>
        <div className="absolute bottom-14 right-24 opacity-70 animate-cloud-bob" style={{ animationDelay: '0.5s' }}>
          <CloudSvg width={130} height={65} color="#e0f2fe" />
        </div>
      </div>

      {/* Left Cloud Curtain Layer */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-[58%] pointer-events-none transition-transform z-10 ${
          phase === 'entering'
            ? 'animate-cloud-in-left'
            : phase === 'exiting'
            ? 'animate-cloud-out-left'
            : 'translate-x-0'
        }`}
      >
        <svg
          viewBox="0 0 600 900"
          className="w-full h-full object-fill filter drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 380 0 Q 480 150 390 280 Q 520 420 400 580 Q 490 740 370 900 L 0 900 Z"
            fill="#ffffff"
            opacity="0.98"
          />
          <path
            d="M 0 0 L 320 0 Q 420 180 340 330 Q 450 490 350 650 Q 430 790 320 900 L 0 900 Z"
            fill="#e0f2fe"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Right Cloud Curtain Layer */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-[58%] pointer-events-none transition-transform z-10 ${
          phase === 'entering'
            ? 'animate-cloud-in-right'
            : phase === 'exiting'
            ? 'animate-cloud-out-right'
            : 'translate-x-0'
        }`}
      >
        <svg
          viewBox="0 0 600 900"
          className="w-full h-full object-fill filter drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          <path
            d="M 600 0 L 220 0 Q 120 150 210 280 Q 80 420 200 580 Q 110 740 230 900 L 600 900 Z"
            fill="#ffffff"
            opacity="0.98"
          />
          <path
            d="M 600 0 L 280 0 Q 180 180 260 330 Q 150 490 250 650 Q 170 790 280 900 L 600 900 Z"
            fill="#e0f2fe"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Center Transition Presentation Card */}
      {phase !== 'entering' && (
        <div
          className={`relative z-20 max-w-lg w-full mx-4 bg-white/98 border-4 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 ${
            phase === 'exiting'
              ? 'opacity-0 scale-95 translate-y-4'
              : 'animate-card-spring opacity-100'
          }`}
        >
          {/* Top Completed Chapter Badge */}
          <div className="flex items-center justify-between mb-3 border-b-2 border-slate-100 pb-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-800 text-xs font-black shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{completedText}</span>
            </div>
            <div className="flex text-amber-400 text-sm font-bold tracking-tight">
              {'★'.repeat(3)}
            </div>
          </div>

          {/* New Chapter Title & Theme Icon */}
          <div className="text-center my-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 border-3 border-rose-400 mb-2 shadow-md">
              <span className="text-3xl animate-bounce">🫁</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {chapterTitle}
            </h2>
            <p className="text-xs sm:text-sm text-sky-700 font-extrabold mt-0.5">
              {chapterSubtitle}
            </p>
          </div>

          {/* Mission Objectives Checklist Card */}
          <div className="bg-sky-50/80 border-2 border-sky-200 rounded-2xl p-3 sm:p-3.5 my-3.5 space-y-2 text-xs sm:text-sm">
            <span className="text-[11px] font-black text-sky-800 uppercase tracking-wider block">
              🎯 TARGET MISI BARU:
            </span>
            {missionPoints.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 bg-white/90 p-2 rounded-xl border border-sky-100 font-bold text-slate-800 shadow-xs"
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="leading-snug">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom Row: Auto Progress Bar + Chunky Skip Button */}
          <div className="mt-4 pt-2 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Auto timer bar */}
            <div className="w-full sm:w-1/2 flex flex-col gap-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                <span>Membuka babak...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden p-0.5 border border-slate-300">
                <div
                  className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full rounded-full transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Skip / Continue button */}
            <button
              type="button"
              onClick={handleExit}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full btn-cartoon-amber text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md"
            >
              <span>Mulai Babak {chapterNumber}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper SVG for cartoon fluffy cloud
const CloudSvg: React.FC<{ width: number; height: number; color?: string }> = ({
  width,
  height,
  color = '#ffffff',
}) => (
  <svg width={width} height={height} viewBox="0 0 100 50" fill={color}>
    <path d="M 20 40 Q 5 40 5 25 Q 5 10 20 15 Q 30 0 50 10 Q 70 0 80 15 Q 95 10 95 25 Q 95 40 80 40 Z" />
  </svg>
);
