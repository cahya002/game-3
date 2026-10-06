import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Hand, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface VirtualJoypadProps {
  onMove: (dir: 'up' | 'down' | 'left' | 'right') => void;
  onAction: () => void;
  actionLabel?: string;
  isActionAvailable?: boolean;
}

export const VirtualJoypad: React.FC<VirtualJoypadProps> = ({
  onMove,
  onAction,
  actionLabel = 'Aksi',
  isActionAvailable = true,
}) => {
  const handleDir = (dir: 'up' | 'down' | 'left' | 'right') => {
    onMove(dir);
  };

  const handleAction = () => {
    sound.playTone(540, 'triangle', 0.05, 0.15);
    onAction();
  };

  return (
    <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 z-30 pointer-events-none flex items-end justify-between select-none">
      {/* Compact & Sleek 4-Way D-Pad on bottom-left (Diperkecil agar tidak menutupi gameplay) */}
      <div className="pointer-events-auto bg-white/80 border border-sky-300 rounded-2xl p-1.5 backdrop-blur-xs shadow-lg flex flex-col items-center gap-1 touch-none">
        {/* Up */}
        <button
          type="button"
          onPointerDown={() => handleDir('up')}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-cartoon-white text-sky-700 flex items-center justify-center border border-sky-300 shadow-xs cursor-pointer active:scale-90 transition-transform"
          aria-label="Atas"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>

        {/* Left, Center Hub, Right */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onPointerDown={() => handleDir('left')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-cartoon-white text-sky-700 flex items-center justify-center border border-sky-300 shadow-xs cursor-pointer active:scale-90 transition-transform"
            aria-label="Kiri"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* Compact Center Hub */}
          <div className="w-5 h-5 rounded-full bg-sky-100 border border-sky-300 flex items-center justify-center shadow-inner">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
          </div>

          <button
            type="button"
            onPointerDown={() => handleDir('right')}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-cartoon-white text-sky-700 flex items-center justify-center border border-sky-300 shadow-xs cursor-pointer active:scale-90 transition-transform"
            aria-label="Kanan"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Down */}
        <button
          type="button"
          onPointerDown={() => handleDir('down')}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full btn-cartoon-white text-sky-700 flex items-center justify-center border border-sky-300 shadow-xs cursor-pointer active:scale-90 transition-transform"
          aria-label="Bawah"
        >
          <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Action / Interact Button on bottom-right (Compact & Responsive) */}
      <div className="pointer-events-auto flex flex-col items-center gap-0.5">
        <button
          type="button"
          onClick={handleAction}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center border-2 transition-transform active:scale-90 cursor-pointer select-none relative ${
            isActionAvailable
              ? 'btn-cartoon-amber border-amber-300 text-slate-950 font-black shadow-md animate-bounce-soft'
              : 'bg-slate-200/80 border-slate-300 text-slate-400 shadow-xs'
          }`}
          aria-label={actionLabel}
        >
          <Hand className={`w-5 h-5 sm:w-6 sm:h-6 ${isActionAvailable ? 'text-slate-950 stroke-[2.5]' : 'text-slate-400'}`} />
          <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-tight leading-none mt-0.5">
            {actionLabel}
          </span>
          {isActionAvailable && (
            <Sparkles className="w-2.5 h-2.5 text-amber-900 absolute top-1 right-1 animate-spin" style={{ animationDuration: '4s' }} />
          )}
        </button>
        <span className="text-[9px] font-bold text-slate-700 bg-white/80 border border-slate-300 px-1.5 py-0.2 rounded-full shadow-2xs hidden md:inline">
          [SPASI]
        </span>
      </div>
    </div>
  );
};
