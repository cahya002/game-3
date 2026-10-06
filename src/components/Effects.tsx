import React from 'react';

export const RainEffect: React.FC = () => {
  // Generate random rain streaks
  const drops = Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    left: `${(i * 2.3 + Math.random() * 2) % 100}%`,
    animationDelay: `${(Math.random() * 1.2).toFixed(2)}s`,
    animationDuration: `${(0.5 + Math.random() * 0.4).toFixed(2)}s`,
    height: `${18 + Math.random() * 16}px`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <div className="absolute inset-0 bg-blue-950/20" />
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute w-[2px] bg-cyan-200/80 rounded animate-rain"
          style={{
            left: drop.left,
            top: '-40px',
            height: drop.height,
            animationDelay: drop.animationDelay,
            animationDuration: drop.animationDuration,
          }}
        />
      ))}
    </div>
  );
};

export const SmokeEffect: React.FC = () => {
  const smokePuffs = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 6 + Math.random() * 5) % 95}%`,
    top: `${40 + Math.random() * 40}%`,
    size: `${40 + Math.random() * 50}px`,
    delay: `${(i * 0.25).toFixed(2)}s`,
    duration: `${2 + Math.random() * 1.5}s`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Smoky dark-orange haze overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-stone-900/35 to-stone-900/20" />
      {smokePuffs.map((puff) => (
        <div
          key={puff.id}
          className="absolute rounded-full bg-stone-700/40 blur-md animate-smoke"
          style={{
            left: puff.left,
            top: puff.top,
            width: puff.size,
            height: puff.size,
            animationDelay: puff.delay,
            animationDuration: puff.duration,
          }}
        />
      ))}
    </div>
  );
};

export const EvaporationEffect: React.FC = () => {
  // Rising arrows and vapor particles from the river
  const vapors = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${20 + (i * 5)}%`,
    top: `${48 + (i % 3) * 6}%`,
    delay: `${(i * 0.2).toFixed(2)}s`,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-15">
      {vapors.map((v) => (
        <div
          key={v.id}
          className="absolute flex flex-col items-center animate-evaporate"
          style={{ left: v.left, top: v.top, animationDelay: v.delay }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] opacity-80" />
          <span className="text-[10px] text-cyan-200 font-pixel mt-0.5">▲</span>
        </div>
      ))}
    </div>
  );
};
