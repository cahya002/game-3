import React, { useMemo } from 'react';

export interface WaypointTarget {
  x: number;
  y: number;
  label: string;
  sub?: string;
  actionIcon?: string;
}

interface GlowingArrowProps {
  target?: WaypointTarget | null;
  playerPos?: { x: number; y: number };
  label?: string;
}

export const GlowingArrow: React.FC<GlowingArrowProps> = ({ target, playerPos, label }) => {
  // If used as a direct static beacon over a building or NPC:
  if (label && !target) {
    return (
      <div className="flex flex-col items-center animate-glowing-arrow select-none pointer-events-none z-30">
        <div className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-pixel text-[8px] font-bold shadow-[0_0_12px_rgba(251,191,36,0.8)] border border-white whitespace-nowrap">
          {label}
        </div>
        <div className="mt-0.5">
          <svg viewBox="0 0 16 16" className="w-4 h-4 filter drop-shadow-[0_0_6px_#facc15]" fill="none">
            <polygon
              points="8,14 2,5 6,5 6,1 10,1 10,5 14,5"
              fill="#facc15"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (!target || !playerPos) return null;

  // Calculate direction angle and distance
  const { angle, distance, isNear } = useMemo(() => {
    const dx = target.x - playerPos.x;
    const dy = target.y - playerPos.y;
    const dist = Math.hypot(dx, dy);
    const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    return {
      angle: deg,
      distance: Math.max(1, Math.round(dist * 1.2)),
      isNear: dist < 10,
    };
  }, [target, playerPos]);

  return (
    <>
      {!isNear && (
        <div
          style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center transition-opacity duration-300"
        >
          <div className="flex flex-col items-center -mt-18 select-none">
            <div
              style={{ transform: `rotate(${angle}deg)` }}
              className="w-6 h-6 flex items-center justify-center filter drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]"
            >
              <svg viewBox="0 0 20 20" className="w-5 h-5 animate-pulse" fill="none">
                <polygon
                  points="10,2 17,16 10,13 3,16"
                  fill="#facc15"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="bg-slate-950/90 border border-amber-400/80 text-amber-300 text-[8px] font-pixel px-1.5 py-0.5 rounded-full shadow flex items-center gap-1 -mt-0.5">
              <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
              <span>{distance}m</span>
            </div>
          </div>
        </div>
      )}

      <div
        style={{ left: `${target.x}%`, top: `${target.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none flex flex-col items-center"
      >
        <div className="w-12 h-12 rounded-full border border-amber-400/60 bg-amber-400/15 animate-beacon-ring" />
        <div className="w-8 h-8 rounded-full border border-amber-300/80 bg-amber-400/25 -mt-10 animate-pulse" />

        {!isNear && (
          <div className="absolute -top-16 flex flex-col items-center animate-glowing-arrow select-none">
            <div className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-pixel text-[8px] font-bold shadow-[0_0_12px_rgba(251,191,36,0.8)] border border-white whitespace-nowrap">
              {target.label}
            </div>

            <div className="mt-0.5">
              <svg viewBox="0 0 16 16" className="w-4 h-4 filter drop-shadow-[0_0_6px_#facc15]" fill="none">
                <polygon
                  points="8,14 2,5 6,5 6,1 10,1 10,5 14,5"
                  fill="#facc15"
                  stroke="#ffffff"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
