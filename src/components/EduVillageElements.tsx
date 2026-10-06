import React from 'react';
import { Droplets, Sparkles, Wind } from 'lucide-react';

// Mesin Pompa Air Desa Makmur (Tepi Sungai)
export const WaterPumpStation: React.FC<{ isRunning: boolean; isClogged: boolean }> = ({
  isRunning,
  isClogged,
}) => {
  return (
    <div className="flex flex-col items-center select-none filter drop-shadow-md">
      {/* Smoke / Steam if clogged */}
      {isClogged && (
        <div className="flex gap-1 -mb-1 animate-pulse opacity-80">
          <span className="text-[10px]">💨</span>
          <span className="text-xs">⚠️</span>
        </div>
      )}

      {/* Pump Machine Body */}
      <div className="relative w-14 sm:w-16 h-12 bg-slate-800 border-2 border-slate-950 rounded-lg p-1 flex flex-col justify-between shadow-lg">
        {/* Gauge / Dial */}
        <div className="flex items-center justify-between">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center">
            <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`} />
          </div>
          <span className="text-[6px] font-pixel text-sky-300">POMPA DESA</span>
        </div>

        {/* Engine Cylinder & Pulley Wheel */}
        <div className="flex items-center justify-around">
          <div className="w-4 h-5 bg-slate-900 border border-slate-700 rounded-xs flex flex-col justify-around py-0.5">
            <div className="w-2.5 mx-auto h-0.5 bg-slate-600" />
            <div className="w-2.5 mx-auto h-0.5 bg-slate-600" />
          </div>

          <div
            className={`w-6 h-6 rounded-full border-2 border-amber-400 bg-amber-600/50 flex items-center justify-center ${
              isRunning ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '0.8s' }}
          >
            <div className="w-4 h-0.5 bg-amber-200" />
            <div className="w-0.5 h-4 bg-amber-200 absolute" />
          </div>
        </div>

        {/* Intake Pipe heading to River */}
        <div className="absolute -bottom-4 left-3 w-2 h-5 bg-sky-900 border-x border-slate-950 flex flex-col justify-end">
          {isClogged && (
            <div className="text-[8px] -mb-1 text-red-400 font-bold animate-bounce">
              🗑️
            </div>
          )}
        </div>

        {/* Outtake Pipe heading to Farm Crops */}
        <div className="absolute top-2 -left-4 w-5 h-2 bg-sky-800 border-y border-slate-950 flex items-center">
          {isRunning && (
            <div className="w-full h-1 bg-cyan-300 animate-pulse" />
          )}
        </div>
      </div>

      {/* Name Tag */}
      <span className={`text-[7px] font-pixel px-1.5 py-0.5 rounded border mt-0.5 shadow ${
        isRunning
          ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
          : 'bg-red-950 text-red-300 border-red-700'
      }`}>
        {isRunning ? 'POMPA: AKTIF 💧' : 'POMPA: TERSUMBAT ⚠️'}
      </span>
    </div>
  );
};

// Kebun Warga Desa (Tanaman Layu vs Tanaman Segar Mekar)
export const VillageFarmField: React.FC<{ isHealthy: boolean }> = ({ isHealthy }) => {
  return (
    <div className={`p-2 rounded-2xl border-2 transition-colors duration-700 select-none ${
      isHealthy
        ? 'bg-gradient-to-br from-emerald-900/60 to-emerald-950/80 border-emerald-500/80 shadow-md'
        : 'bg-gradient-to-br from-amber-950/70 to-stone-900/80 border-amber-700/80'
    }`}>
      {/* Title */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[7px] font-pixel text-amber-200 uppercase">
          {isHealthy ? 'Kebun Segar & Subur 🌱' : 'Kebun Warga (Layu) 🥀'}
        </span>
        {isHealthy && <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '5s' }} />}
      </div>

      {/* Crop Rows */}
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex flex-col items-center justify-center transition-all ${
              isHealthy
                ? 'bg-emerald-800/60 border-emerald-400 shadow-2xs'
                : 'bg-stone-800/60 border-amber-800/60'
            }`}
          >
            {isHealthy ? (
              <span className="text-base sm:text-lg animate-bounce-soft" style={{ animationDelay: `${(i % 3) * 0.3}s` }}>
                {i % 3 === 0 ? '🥬' : i % 3 === 1 ? '🌽' : '🌻'}
              </span>
            ) : (
              <span className="text-sm opacity-60 grayscale filter">
                🥀
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Irrigation ditch with water if healthy */}
      <div className={`w-full h-1.5 rounded-full mt-1.5 overflow-hidden border ${
        isHealthy
          ? 'bg-sky-500 border-sky-300 animate-pulse'
          : 'bg-stone-800 border-stone-700'
      }`} />
    </div>
  );
};

// Lapangan Sepak Bola Desa (East Zone)
export const VillageFootballField: React.FC = () => {
  return (
    <div className="w-40 sm:w-48 h-32 sm:h-36 bg-emerald-700/85 border-2 border-white/60 rounded-2xl p-2 relative shadow-lg overflow-hidden select-none flex flex-col justify-between">
      {/* Center circle line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70 pointer-events-none" />

      {/* Goal Post (Gawang Putih) */}
      <div className="w-14 h-6 border-x-2 border-t-2 border-white/90 bg-white/10 rounded-t-xs mx-auto relative shadow-xs">
        <div className="w-full h-full opacity-30 flex justify-around">
          <div className="w-px h-full bg-white" />
          <div className="w-px h-full bg-white" />
          <div className="w-px h-full bg-white" />
        </div>
      </div>

      {/* Soccer Ball */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm animate-bounce-soft pointer-events-none">
        ⚽
      </div>

      {/* Bench on the sideline */}
      <div className="flex items-center justify-between text-[7px] font-pixel text-white/90 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500">
        <span>Lapangan Bola Desa</span>
        <span>🏃💨</span>
      </div>
    </div>
  );
};

// Balai Desa Makmur (Pusat Komunitas)
export const VillageHallBuilding: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none filter drop-shadow-xl">
      <div className="w-28 sm:w-34 h-22 sm:h-26 relative">
        {/* Atap Joglo / Limasan Biru Ceria */}
        <div className="w-full h-[50%] bg-sky-700 rounded-t-xl border-b-4 border-sky-950 relative flex items-center justify-center shadow-md">
          {/* Ridge & Garuda / Flag badge */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-sky-900 rounded-t-sm" />
          <div className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center shadow-xs">
            <span className="text-xs">🇮🇩</span>
          </div>
        </div>

        {/* Dinding Kayu Balai Desa */}
        <div className="w-[92%] mx-auto h-[50%] bg-[#b45309] border-x-2 border-b-2 border-amber-950 relative flex justify-between px-2 pt-1">
          {/* Windows */}
          <div className="w-3.5 h-4 bg-amber-950 border border-amber-300/40 rounded-xs flex items-center justify-center">
            <div className="w-2.5 h-3 bg-sky-200/90 rounded-xs" />
          </div>

          {/* Double Door */}
          <div className="w-6 h-7 bg-amber-950 border border-amber-900 rounded-t-sm self-end flex justify-around items-center">
            <div className="w-2 h-4 bg-amber-800 rounded-xs" />
            <div className="w-2 h-4 bg-amber-800 rounded-xs" />
          </div>

          {/* Windows */}
          <div className="w-3.5 h-4 bg-amber-950 border border-amber-300/40 rounded-xs flex items-center justify-center">
            <div className="w-2.5 h-3 bg-sky-200/90 rounded-xs" />
          </div>
        </div>
      </div>

      <span className="text-[8px] font-pixel text-sky-200 bg-slate-950/90 px-2 py-0.5 rounded border border-sky-500 mt-0.5 shadow">
        Balai Desa Makmur
      </span>
    </div>
  );
};

// Rumah Sains (Mini-Lab Siklus Air)
export const ScienceHouseBuilding: React.FC<{ isGlow?: boolean }> = ({ isGlow = false }) => {
  return (
    <div className="flex flex-col items-center select-none filter drop-shadow-xl relative">
      {/* Chimney Steam */}
      <div className="absolute -top-3 right-6 flex gap-1 animate-evaporate opacity-70">
        <span className="text-xs">♨️</span>
      </div>

      <div className={`w-26 sm:w-32 h-20 sm:h-24 relative ${isGlow ? 'ring-4 ring-amber-400 rounded-2xl animate-pulse' : ''}`}>
        {/* Atap Segitiga Ungu/Biru Sains */}
        <div className="w-full h-[52%] bg-blue-700 rounded-t-xl border-b-4 border-blue-950 relative flex items-center justify-center shadow-md">
          <div className="w-5 h-5 rounded-full bg-amber-300 border border-amber-600 flex items-center justify-center shadow-xs">
            <span className="text-[10px]">🔬</span>
          </div>
        </div>

        {/* Walls */}
        <div className="w-[90%] mx-auto h-[48%] bg-sky-100 border-2 border-sky-400 relative flex justify-between px-2 pt-1 shadow-inner">
          <div className="w-3.5 h-4 bg-sky-900 border border-sky-400 rounded-xs flex items-center justify-center">
            <div className="w-2.5 h-3 bg-sky-200 rounded-xs" />
          </div>

          {/* Doorway with interactive indicator */}
          <div className="w-5 h-7 bg-slate-800 border border-slate-900 rounded-t-sm self-end flex items-center justify-center">
            <span className="text-[8px]">🚪</span>
          </div>

          <div className="w-3.5 h-4 bg-sky-900 border border-sky-400 rounded-xs flex items-center justify-center">
            <div className="w-2.5 h-3 bg-sky-200 rounded-xs" />
          </div>
        </div>
      </div>

      <span className="text-[8px] font-pixel text-amber-300 bg-blue-950/95 px-2 py-0.5 rounded border border-blue-400 mt-0.5 shadow">
        Rumah Sains (Mini-Lab)
      </span>
    </div>
  );
};
