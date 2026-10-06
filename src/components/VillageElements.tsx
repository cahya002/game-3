import React from 'react';

// Traditional Wooden House (Rumah Desa)
export const KampungHouse: React.FC<{
  title: string;
  type?: 'large' | 'medium' | 'cottage';
  roofColor?: string;
}> = ({ title, type = 'medium', roofColor = '#9a3412' }) => {
  const isLarge = type === 'large';

  return (
    <div className="flex flex-col items-center select-none filter drop-shadow-lg">
      <div className={`relative ${isLarge ? 'w-28 md:w-36 h-20 md:h-24' : 'w-22 md:w-28 h-16 md:h-20'}`}>
        {/* Roof */}
        <div
          className="w-full h-[55%] rounded-t-lg relative border-b-4 border-amber-950 shadow-md"
          style={{ backgroundColor: roofColor }}
        >
          {/* Roof Ridge & Tiles detail */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-amber-950/80 rounded-t-sm" />
          <div className="absolute inset-x-2 top-2 bottom-1 border-t border-amber-400/30 opacity-60" />
          {/* Chimney */}
          <div className="absolute -top-3 right-3 w-3 h-4 bg-amber-900 border border-amber-950 rounded-t-xs" />
        </div>

        {/* House Walls (Wooden Planks) */}
        <div className="w-[88%] mx-auto h-[45%] bg-[#b45309] border-x-2 border-b-2 border-amber-950 relative flex justify-between px-2 pt-1">
          {/* Windows */}
          <div className="w-3.5 h-4 bg-amber-950 border border-amber-300/40 rounded-xs flex items-center justify-center">
            <div className="w-2.5 h-3 bg-amber-200/80 rounded-xs" />
          </div>

          {/* Door */}
          <div className="w-4 h-6 bg-amber-950 border border-amber-800 rounded-t-sm self-end" />

          {/* Second Window for large house */}
          {isLarge && (
            <div className="w-3.5 h-4 bg-amber-950 border border-amber-300/40 rounded-xs flex items-center justify-center">
              <div className="w-2.5 h-3 bg-amber-200/80 rounded-xs" />
            </div>
          )}
        </div>

        {/* Stilt legs */}
        <div className="w-[80%] mx-auto flex justify-between -mt-0.5">
          <div className="w-1.5 h-2 bg-amber-950" />
          <div className="w-1.5 h-2 bg-amber-950" />
          <div className="w-1.5 h-2 bg-amber-950" />
        </div>
      </div>

      {/* House Name Tag */}
      <span className="text-[8px] font-pixel text-amber-200 bg-slate-950/85 px-1.5 py-0.5 rounded border border-amber-700/80 mt-0.5 shadow">
        {title}
      </span>
    </div>
  );
};

// Village Health Clinic (Klinik Kesehatan Desa)
export const ClinicBuilding: React.FC<{ title?: string }> = ({ title = 'Klinik Kesehatan Desa' }) => {
  return (
    <div className="flex flex-col items-center select-none filter drop-shadow-xl">
      <div className="w-26 md:w-34 h-22 md:h-26 relative">
        {/* Roof with teal/cyan trim */}
        <div className="w-full h-[45%] bg-teal-800 rounded-t-lg border-b-4 border-teal-950 relative flex items-center justify-center">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-950 rounded-t-sm" />
          {/* Red Cross Signboard */}
          <div className="w-6 h-6 bg-white rounded-full border border-slate-300 flex items-center justify-center shadow-md">
            <span className="text-red-600 font-black text-sm leading-none">+</span>
          </div>
        </div>

        {/* Clean Clinic White Walls */}
        <div className="w-[90%] mx-auto h-[55%] bg-slate-100 border-2 border-slate-400 relative flex justify-between px-2 pt-1 shadow-inner">
          {/* Clinic Window */}
          <div className="w-4 h-4 bg-cyan-900 border border-cyan-400 rounded-xs flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-200/90" />
          </div>

          {/* Double Door */}
          <div className="w-6 h-7 bg-slate-700 border border-slate-900 rounded-t-sm self-end flex justify-around items-center">
            <div className="w-2 h-4 bg-cyan-100/90" />
            <div className="w-2 h-4 bg-cyan-100/90" />
          </div>

          {/* Stethoscope Sign */}
          <div className="w-4 h-4 bg-cyan-900 border border-cyan-400 rounded-xs flex items-center justify-center">
            <div className="w-3 h-3 bg-cyan-200/90" />
          </div>
        </div>
      </div>

      <span className="text-[8px] font-pixel text-teal-300 bg-teal-950/90 px-1.5 py-0.5 rounded border border-teal-600 mt-0.5 shadow">
        {title}
      </span>
    </div>
  );
};

// Wooden River Pier / Dermaga Nelayan
export const RiverPier: React.FC = () => {
  return (
    <div className="w-16 md:w-20 h-14 bg-[#78350f] border-x-2 border-b-2 border-amber-950 flex flex-col justify-between py-1 relative shadow-md">
      {/* Planks texture */}
      <div className="w-full h-1 border-b border-amber-950/60" />
      <div className="w-full h-1 border-b border-amber-950/60" />
      <div className="w-full h-1 border-b border-amber-950/60" />
      {/* Mooring Post */}
      <div className="absolute top-1 left-1 w-2 h-3 bg-amber-950 rounded-xs shadow" />
      <div className="absolute top-1 right-1 w-2 h-3 bg-amber-950 rounded-xs shadow" />
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-pixel text-amber-200 whitespace-nowrap bg-black/60 px-1 rounded">
        Dermaga Nelayan
      </span>
    </div>
  );
};

// Wooden Bridge across the River (Jembatan Desa)
export const RiverBridge: React.FC = () => {
  return (
    <div className="w-12 md:w-14 h-full bg-[#854d0e] border-x-4 border-amber-950 flex flex-col justify-around py-1 shadow-2xl relative z-10">
      {/* Railings */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-950" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-amber-950" />
      {/* Planks */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-full h-1 border-b border-amber-950/50" />
      ))}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] font-pixel text-amber-100 bg-amber-950/90 px-1 py-0.5 rounded border border-amber-700 whitespace-nowrap">
        Jembatan Desa
      </span>
    </div>
  );
};

// Wooden Signpost
export const WoodenSignpost: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="bg-[#b45309] border border-amber-950 text-amber-100 text-[8px] font-pixel px-1.5 py-0.5 rounded shadow">
        {text}
      </div>
      <div className="w-1.5 h-3 bg-amber-950" />
    </div>
  );
};

// Wooden Fencing Section
export const WoodenFence: React.FC<{ length?: number }> = ({ length = 4 }) => {
  return (
    <div className="flex items-center gap-0.5 select-none pointer-events-none">
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-1 h-3.5 bg-amber-900 border border-amber-950 rounded-t-xs" />
          <div className="w-3 h-0.5 bg-amber-950 -mt-2" />
        </div>
      ))}
    </div>
  );
};

// Oil Palm Tree (Pohon Kelapa Sawit Tropis)
export const PalmTree: React.FC<{ size?: number; hasFruit?: boolean }> = ({
  size = 64,
  hasFruit = true,
}) => {
  return (
    <div
      style={{ width: size, height: size * 1.25 }}
      className="relative flex flex-col items-center select-none pointer-events-none filter drop-shadow-md"
    >
      {/* Palm Fronds (Daun Pelepah Sawit) */}
      <svg
        viewBox="0 0 100 80"
        className="w-full h-[65%] overflow-visible animate-bounce-soft"
        style={{ animationDuration: '4s' }}
      >
        {/* Palm frond leaves spreading outward */}
        <path
          d="M 50 70 Q 20 40 5 15 Q 25 35 50 65"
          fill="#15803d"
          stroke="#14532d"
          strokeWidth="1.5"
        />
        <path
          d="M 50 70 Q 30 25 25 5 Q 40 25 50 65"
          fill="#16a34a"
          stroke="#14532d"
          strokeWidth="1.5"
        />
        <path
          d="M 50 70 Q 50 15 50 0 Q 55 20 50 65"
          fill="#22c55e"
          stroke="#15803d"
          strokeWidth="1.5"
        />
        <path
          d="M 50 70 Q 70 25 75 5 Q 60 25 50 65"
          fill="#16a34a"
          stroke="#14532d"
          strokeWidth="1.5"
        />
        <path
          d="M 50 70 Q 80 40 95 15 Q 75 35 50 65"
          fill="#15803d"
          stroke="#14532d"
          strokeWidth="1.5"
        />

        {/* Lower drooping fronds */}
        <path
          d="M 50 70 Q 15 60 0 45 Q 25 60 50 70"
          fill="#14532d"
          opacity="0.9"
        />
        <path
          d="M 50 70 Q 85 60 100 45 Q 75 60 50 70"
          fill="#14532d"
          opacity="0.9"
        />

        {/* Ripe Oil Palm Fruit Bunches (Tandan Buah Sawit Merah Jingga) */}
        {hasFruit && (
          <g>
            <circle cx="43" cy="67" r="4.5" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
            <circle cx="41" cy="65" r="1.5" fill="#facc15" />
            <circle cx="57" cy="67" r="4.5" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
            <circle cx="59" cy="65" r="1.5" fill="#facc15" />
            <circle cx="50" cy="71" r="5" fill="#c2410c" stroke="#7c2d12" strokeWidth="1" />
          </g>
        )}
      </svg>

      {/* Palm Trunk with Diamond Bark Scars */}
      <div className="w-5 md:w-6 h-[40%] bg-[#78350f] border-x-2 border-amber-950 relative -mt-3 shadow-inner rounded-b-xs">
        {/* Diamond pattern marks */}
        <div className="w-full h-full flex flex-col justify-around py-0.5 opacity-70">
          <div className="w-3 mx-auto h-1 border-b border-amber-950/80" />
          <div className="w-3.5 mx-auto h-1 border-b border-amber-950/80" />
          <div className="w-4 mx-auto h-1 border-b border-amber-950/80" />
        </div>
      </div>
    </div>
  );
};

// Kebun Anis Gate Archway (Gerbang Masuk Kebun Kelapa Sawit Lestari)
export const KebunAnisGate: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none filter drop-shadow-xl z-10 pointer-events-none">
      {/* Archway Board */}
      <div className="bg-[#14532d] border-2 border-amber-400 px-3 py-1 rounded-lg shadow-lg flex items-center gap-1.5 animate-pulse">
        <span className="text-xs">🌴</span>
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-pixel text-amber-300 font-bold tracking-wider">
            KEBUN SAWIT MENTAN AMRAN
          </span>
          <span className="text-[6px] font-pixel text-emerald-200">
            Sawit Lestari Bebas Bakar (Zero-Burning)
          </span>
        </div>
        <span className="text-xs">🌴</span>
      </div>

      {/* Two Sturdy Wooden Pillars */}
      <div className="w-32 md:w-36 flex justify-between -mt-0.5">
        <div className="w-2.5 h-10 bg-[#78350f] border-x border-b border-amber-950 rounded-b-xs" />
        <div className="w-2.5 h-10 bg-[#78350f] border-x border-b border-amber-950 rounded-b-xs" />
      </div>
    </div>
  );
};

// Palm Seedling Nursery (Bibit Sawit Polibag)
export const PalmSeedlings: React.FC = () => {
  return (
    <div className="flex items-center gap-1 bg-amber-950/60 p-1 rounded border border-amber-900 shadow">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="text-[10px] -mb-1 animate-bounce-soft" style={{ animationDelay: `${i * 0.3}s` }}>
            🌱
          </div>
          <div className="w-2 h-2.5 bg-black border border-stone-800 rounded-b-xs" />
        </div>
      ))}
    </div>
  );
};

// Palm Harvest Cart (Gerobak Tandan Sawit)
export const PalmHarvestCart: React.FC = () => {
  return (
    <div className="flex items-center gap-1 bg-amber-900 border border-amber-950 px-1.5 py-1 rounded shadow-md select-none">
      <span className="text-xs">🛒</span>
      <div className="flex gap-0.5">
        <span className="text-[10px]">🥥</span>
        <span className="text-[10px]">🥥</span>
      </div>
    </div>
  );
};

// Animated Flowing River Component (Sungai Horizontal Berjalan dari Kiri ke Kanan)
export const AnimatedRiver: React.FC<{ isPolluted: boolean; className?: string }> = ({
  isPolluted,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none transition-colors duration-1000 ${
        isPolluted
          ? 'bg-gradient-to-b from-[#5c2b09] via-[#78350f] to-[#451a03]'
          : 'bg-gradient-to-b from-[#0284c7] via-[#0ea5e9] to-[#0369a1]'
      } border-y-4 border-[#78350f] shadow-inner ${className}`}
    >
      {/* 1. Dynamic Flowing Water Texture (Arus Sungai Mengalir Horizontal) */}
      <div
        className="absolute inset-0 w-[200%] h-full flex opacity-45 pointer-events-none animate-river-flow"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0, transparent 40px, rgba(255,255,255,0.35) 40px, rgba(255,255,255,0.35) 44px)',
        }}
      />

      {/* 2. Fast Wave Foam & Currents (Lapisan Arus Cepat Busa Putih) */}
      <div
        className="absolute inset-0 w-[200%] h-full flex opacity-60 pointer-events-none animate-river-flow-fast"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent 0, transparent 65px, rgba(255,255,255,0.55) 65px, rgba(255,255,255,0.55) 72px)',
        }}
      />

      {/* 3. Deep Water Riverbed Shadows & Streaks */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

      {/* 4. Realistic Surface Ripples (Riak-riak Permukaan Air Mengalir) */}
      <div className="absolute top-[20%] left-0 right-0 h-1.5 opacity-70 flex justify-around">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-0.5 bg-white/40 rounded-full animate-water-ripple"
            style={{ animationDelay: `${(i % 5) * 0.4}s` }}
          />
        ))}
      </div>
      <div className="absolute top-[50%] left-0 right-0 h-1.5 opacity-80 flex justify-around">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-1 bg-white/50 rounded-full animate-water-ripple"
            style={{ animationDelay: `${(i % 4) * 0.5 + 0.2}s` }}
          />
        ))}
      </div>
      <div className="absolute top-[75%] left-0 right-0 h-1.5 opacity-60 flex justify-around">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-0.5 bg-cyan-200/50 rounded-full animate-water-ripple"
            style={{ animationDelay: `${(i % 6) * 0.35 + 0.1}s` }}
          />
        ))}
      </div>

      {/* 5. Floating Water Lilies and Leaves */}
      <div className="absolute top-[22%] left-[12%] text-sm animate-bounce-soft pointer-events-none drop-shadow">
        🪷
      </div>
      <div
        className="absolute top-[58%] left-[34%] text-xs animate-bounce-soft pointer-events-none drop-shadow"
        style={{ animationDelay: '1.2s' }}
      >
        🍃
      </div>
      <div
        className="absolute top-[28%] left-[62%] text-sm animate-bounce-soft pointer-events-none drop-shadow"
        style={{ animationDelay: '0.8s' }}
      >
        🪷
      </div>
      <div
        className="absolute top-[64%] left-[82%] text-xs animate-bounce-soft pointer-events-none drop-shadow"
        style={{ animationDelay: '1.6s' }}
      >
        🍃
      </div>

      {/* 6. Sparkling Sunlight Glints across the horizontal river */}
      {!isPolluted && (
        <>
          <div className="absolute top-[28%] left-[8%] text-[10px] animate-water-glint pointer-events-none">✨</div>
          <div className="absolute top-[65%] left-[24%] text-[11px] animate-water-glint pointer-events-none" style={{ animationDelay: '0.7s' }}>✨</div>
          <div className="absolute top-[32%] left-[48%] text-[10px] animate-water-glint pointer-events-none" style={{ animationDelay: '1.3s' }}>✨</div>
          <div className="absolute top-[68%] left-[72%] text-[11px] animate-water-glint pointer-events-none" style={{ animationDelay: '0.4s' }}>✨</div>
          <div className="absolute top-[35%] left-[90%] text-[9px] animate-water-glint pointer-events-none" style={{ animationDelay: '1.1s' }}>✨</div>
        </>
      )}

      {/* 7. Riverbed Boundary Stones along top and bottom banks */}
      <div className="absolute -top-1.5 left-0 right-0 flex justify-between px-2 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2 bg-stone-600 rounded-full border border-stone-800 shadow-xs"
            style={{ transform: `scale(${0.7 + (i % 3) * 0.25})` }}
          />
        ))}
      </div>
      <div className="absolute -bottom-1.5 left-0 right-0 flex justify-between px-2 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="w-2.5 h-2 bg-stone-700 rounded-full border border-stone-900 shadow-xs"
            style={{ transform: `scale(${0.7 + ((i + 1) % 3) * 0.25})` }}
          />
        ))}
      </div>
    </div>
  );
};


