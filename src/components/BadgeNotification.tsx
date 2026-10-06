import React, { useEffect, useState } from 'react';
import { BadgeNotificationData } from '../types';
import { sound } from '../utils/audio';
import { Sparkles, X, Award, Droplets, Wind, CheckCircle2 } from 'lucide-react';

interface BadgeNotificationProps {
  badge: BadgeNotificationData | null;
  onDismiss: () => void;
}

export const BadgeNotification: React.FC<BadgeNotificationProps> = ({ badge, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setIsVisible(true);
      sound.playLevelFanfare();

      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [badge, onDismiss]);

  if (!badge) return null;

  const isWater = badge.type === 'water';

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-sm sm:max-w-md w-[92%] transition-all duration-300">
      <div
        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border-3 p-3 sm:p-3.5 shadow-2xl backdrop-blur-md transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 -translate-y-4'
        } ${
          isWater
            ? 'bg-gradient-to-r from-sky-950/95 via-sky-900/95 to-blue-950/95 border-sky-400 text-white shadow-[0_0_28px_rgba(14,165,233,0.45)]'
            : 'bg-gradient-to-r from-teal-950/95 via-emerald-900/95 to-sky-950/95 border-emerald-400 text-white shadow-[0_0_28px_rgba(52,211,153,0.45)]'
        }`}
      >
        {/* Shimmer light bar */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            backgroundSize: '200% 100%',
            animation: 'riverFlow 2.5s infinite linear',
          }}
        />

        <div className="flex items-center gap-3 relative z-10">
          {/* Badge Icon Emblem */}
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border-2 shadow-lg relative ${
              isWater
                ? 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 border-amber-300 text-white'
                : 'bg-gradient-to-br from-emerald-400 via-teal-500 to-sky-600 border-amber-300 text-white'
            }`}
          >
            {isWater ? (
              <Droplets className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-bounce-soft filter drop-shadow" />
            ) : (
              <Wind className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-bounce-soft filter drop-shadow" />
            )}

            {/* Corner Star Sparkle */}
            <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          {/* Badge Text Content */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[9px] font-black uppercase px-2 py-0.2 rounded-full bg-amber-400 text-slate-950 tracking-wider">
                LENCANA TERBUKA 🏆
              </span>
              <span className="text-[9px] font-bold text-sky-200">
                Tahap {badge.stageCompleted} Selesai
              </span>
            </div>

            <h4 className="font-pixel text-xs sm:text-sm text-amber-300 tracking-tight leading-tight flex items-center gap-1">
              <span>{badge.title}</span>
              <span className="text-xs">{isWater ? '💧' : '🌬️'}</span>
            </h4>

            <p className="text-[11px] sm:text-xs text-slate-200 font-semibold leading-snug mt-0.5 truncate sm:whitespace-normal">
              {badge.description}
            </p>
          </div>

          {/* Close / Dismiss Button */}
          <button
            type="button"
            onClick={() => {
              setIsVisible(false);
              setTimeout(onDismiss, 200);
            }}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
            title="Tutup Notifikasi"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
