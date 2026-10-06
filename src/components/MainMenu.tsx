import React, { useState } from 'react';
import { AvatarId } from '../types';
import { CharacterSprite } from './PixelAvatars';
import { sound } from '../utils/audio';
import { Play, Sparkles, BookOpen, Volume2, VolumeX, Droplets, Wind, MessageSquare } from 'lucide-react';

interface MainMenuProps {
  onStartGame: (name: string, avatar: AvatarId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenNotes: () => void;
}

const AVATAR_OPTIONS: { id: AvatarId; name: string; gender: string; color: string; bg: string }[] = [
  { id: 'adam', name: 'Adam', gender: 'Murid Kelas 5', color: 'border-sky-400', bg: 'bg-sky-50' },
  { id: 'hawa', name: 'Hawa', gender: 'Murid Kelas 5', color: 'border-emerald-400', bg: 'bg-emerald-50' },
  { id: 'rayyan', name: 'Rayyan', gender: 'Murid Kelas 6', color: 'border-amber-400', bg: 'bg-amber-50' },
  { id: 'maya', name: 'Maya', gender: 'Murid Kelas 6', color: 'border-purple-400', bg: 'bg-purple-50' },
];

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  isMuted,
  onToggleMute,
  onOpenNotes,
}) => {
  const [name, setName] = useState('Pahlawan Cilik');
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>('adam');

  const handleStart = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = name.trim() || 'Pahlawan Cilik';
    sound.playPickup();
    onStartGame(finalName, selectedAvatar);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-sky-400 via-sky-300 to-blue-500 overflow-y-auto">
      {/* Floating cartoon clouds decoration */}
      <div className="absolute top-6 left-8 w-24 h-10 bg-white/70 rounded-full blur-[1px] pointer-events-none" />
      <div className="absolute top-12 right-12 w-32 h-12 bg-white/60 rounded-full blur-[1px] pointer-events-none" />
      <div className="absolute bottom-10 left-16 w-36 h-14 bg-white/50 rounded-full blur-[1px] pointer-events-none" />

      {/* Sound & Notes toggle top-right */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-10">
        <button
          type="button"
          onClick={onOpenNotes}
          className="btn-cartoon-amber text-slate-950 font-black rounded-full px-3 py-1.5 text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">Buku IPAS</span>
        </button>

        <button
          type="button"
          onClick={onToggleMute}
          className="btn-cartoon-white text-slate-700 rounded-full p-2 shadow-md transition-all cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500 stroke-[2.5]" /> : <Volume2 className="w-3.5 h-3.5 text-sky-600 stroke-[2.5]" />}
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white/95 border-4 border-sky-400 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl backdrop-blur-md relative z-10 animate-in fade-in zoom-in-95 duration-300 my-auto">
        {/* Title Badges */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border-2 border-sky-300 text-sky-800 text-xs font-black mb-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Edu-Venture • IPAS SD Fase C</span>
          </div>

          <h1 className="font-pixel text-xl sm:text-2xl text-slate-900 drop-shadow-xs tracking-tight">
            PETUALANGAN DESA MAKMUR
          </h1>
          <h2 className="font-pixel text-[11px] sm:text-xs text-sky-600 tracking-wider mt-0.5">
            ★ SIKLUS AIR & SISTEM PERNAPASAN ★
          </h2>
        </div>

        {/* Input Form */}
        <form onSubmit={handleStart} className="space-y-3.5">
          {/* Player Name */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1">
              Nama Murid / Peneliti:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={16}
              placeholder="Ketik nama kamu di sini..."
              className="w-full bg-slate-50 border-2 border-slate-300 focus:border-sky-500 rounded-2xl px-4 py-2 text-slate-900 font-bold text-sm outline-none transition-colors shadow-inner"
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1">
              Pilih Tokoh Karakter:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {AVATAR_OPTIONS.map((avatar) => {
                const isSelected = selectedAvatar === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => {
                      setSelectedAvatar(avatar.id);
                      sound.playTone(480, 'sine', 0.05, 0.1);
                    }}
                    className={`flex flex-col items-center p-1.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? `${avatar.bg} ${avatar.color} shadow-md scale-105 ring-2 ring-sky-300`
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-11 h-11 flex items-center justify-center">
                      <CharacterSprite id={avatar.id} size={42} isMoving={isSelected} />
                    </div>
                    <span className="text-[11px] text-slate-900 mt-0.5 font-black">
                      {avatar.name}
                    </span>
                    <span className="text-[9px] text-slate-500 font-semibold truncate w-full text-center">
                      {avatar.gender}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Stages Preview Grid */}
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-2.5 text-[11px] space-y-1">
            <div className="font-black text-sky-950 uppercase tracking-wider text-[10px] mb-1">
              Alur 3 Tahap Petualangan IPAS:
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="font-bold text-sky-700">1.</span>
              <span>Sungai Tersumbat & Pompa Air Kebun</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="font-bold text-sky-700">2.</span>
              <span>Penyelidikan Siklus Air (Mini-Lab Teko & Es)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <span className="font-bold text-sky-700">3.</span>
              <span>Analisis Olahraga & Refleksi Sistem Pernapasan</span>
            </div>
          </div>

          {/* Start Game Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-2xl btn-cartoon-blue text-white font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer select-none shadow-lg active:scale-95"
          >
            <Play className="w-5 h-5 fill-white stroke-[2]" />
            <span>MULAI PETUALANGAN DESA!</span>
          </button>
        </form>
      </div>
    </div>
  );
};
