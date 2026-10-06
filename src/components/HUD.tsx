import React, { useState } from 'react';
import { StageId, BadgeType } from '../types';
import { CHAPTERS_DATA } from '../data/chaptersData';
import {
  Volume2,
  VolumeX,
  BookOpen,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Droplets,
  Wind,
  Award,
} from 'lucide-react';

interface HUDProps {
  playerName: string;
  currentChapter: StageId;
  trashCount: number;
  isMuted: boolean;
  unreadChatCount: number;
  unlockedBadges?: BadgeType[];
  onToggleMute: () => void;
  onOpenNotes: () => void;
  onOpenChat: () => void;
  onShowBadgeDetails?: (type: BadgeType) => void;
}

export const HUD: React.FC<HUDProps> = ({
  playerName,
  currentChapter,
  trashCount,
  isMuted,
  unreadChatCount,
  unlockedBadges = [],
  onToggleMute,
  onOpenNotes,
  onOpenChat,
  onShowBadgeDetails,
}) => {
  const [showChecklist, setShowChecklist] = useState(false);
  const chapterInfo = CHAPTERS_DATA[currentChapter] || CHAPTERS_DATA[1];

  const overallPct = Math.round(((currentChapter - 1) / 3) * 100 + (currentChapter === 1 ? (trashCount / 3) * 33 : 16));

  return (
    <div className="select-none pointer-events-none">
      {/* 1. KIRI ATAS: Profil Karakter & Tahap Aktif + Lencana */}
      <div className="absolute top-2 left-2 sm:left-3 pointer-events-auto z-30 flex flex-col gap-1.5">
        <div className="bg-sky-950/95 border-2 border-sky-400 rounded-2xl px-2.5 sm:px-3 py-1.5 shadow-xl flex items-center gap-2 backdrop-blur-md">
          <div className="w-8 h-8 rounded-full bg-sky-500/20 border-2 border-sky-300 flex items-center justify-center text-sm font-bold shadow-inner">
            {chapterInfo.mascot}
          </div>
          <div>
            <div className="text-[11px] font-black text-white leading-tight flex items-center gap-1.5">
              <span>{playerName}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 font-black uppercase">
                Tahap {currentChapter}/3
              </span>
            </div>
            <div className="text-[9px] font-bold text-sky-300">
              {chapterInfo.badge}
            </div>
          </div>
        </div>

        {/* Unlocked Badges Bar */}
        {unlockedBadges.length > 0 && (
          <div className="flex items-center gap-1">
            {unlockedBadges.includes('water') && (
              <button
                type="button"
                onClick={() => onShowBadgeDetails?.('water')}
                className="bg-sky-900/90 hover:bg-sky-800 border border-sky-400 text-sky-100 text-[9px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
                title="Lencana: Master of Water"
              >
                <Droplets className="w-3 h-3 text-sky-300" />
                <span>Master of Water</span>
              </button>
            )}
            {unlockedBadges.includes('air') && (
              <button
                type="button"
                onClick={() => onShowBadgeDetails?.('air')}
                className="bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-400 text-emerald-100 text-[9px] font-black px-2 py-0.5 rounded-full shadow-md flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
                title="Lencana: Master of Air"
              >
                <Wind className="w-3 h-3 text-emerald-300" />
                <span>Master of Air</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 2. KANAN ATAS: Utilitas (Chat Online, Buku Saku Sains, Suara) + Misi Aktif */}
      <div className="absolute top-2 right-2 sm:right-3 pointer-events-auto z-30 flex flex-col items-end gap-1.5 w-60 sm:w-72 md:w-80">
        {/* Buttons Bar */}
        <div className="flex items-center gap-1.5">
          {/* Tombol Chat Online (Multiplayer Discussion) */}
          <button
            type="button"
            onClick={onOpenChat}
            className="p-1.5 px-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 border border-sky-300 text-white shadow-md cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 text-[10px] font-black relative"
            title="Buka Diskusi Chat Online IPAS"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat IPAS</span>
            {unreadChatCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 rounded-full text-[9px] font-black flex items-center justify-center animate-bounce shadow">
                {unreadChatCount}
              </span>
            )}
          </button>

          {/* Tombol Catatan Sains */}
          <button
            type="button"
            onClick={onOpenNotes}
            className="p-1.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-400 text-amber-300 shadow-md cursor-pointer active:scale-95 transition-all flex items-center gap-1 text-[10px] font-bold"
            title="Catatan Sains IPAS"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Catatan</span>
          </button>

          {/* Tombol Suara */}
          <button
            type="button"
            onClick={onToggleMute}
            className="p-1.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-sky-400 text-sky-300 shadow-md cursor-pointer active:scale-95 transition-all"
            title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Card Misi Aktif Tahap */}
        <div
          onClick={() => setShowChecklist(!showChecklist)}
          className="w-full bg-slate-900/95 border-2 border-sky-400 rounded-2xl px-2.5 py-1.5 shadow-xl backdrop-blur-md cursor-pointer hover:border-sky-300 transition-all flex items-center justify-between gap-2 group"
        >
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <span className="text-base flex-shrink-0">
              {chapterInfo.mascot}
            </span>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-black text-amber-300 truncate leading-tight">
                {chapterInfo.title}
              </div>
              <div className="text-[9px] text-sky-100 font-semibold truncate leading-tight mt-0.5">
                {chapterInfo.objective}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400 group-hover:text-white flex-shrink-0">
            <span className="text-[8px] font-black uppercase bg-sky-950 px-1 py-0.5 rounded text-sky-300 border border-sky-800">
              Tahap {currentChapter}/3
            </span>
            {showChecklist ? (
              <ChevronUp className="w-3.5 h-3.5 text-sky-300" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-sky-300" />
            )}
          </div>
        </div>

        {/* Dropdown 3 Tahap Alur Cerita */}
        {showChecklist && (
          <div className="w-full bg-slate-950/98 border-2 border-sky-400 rounded-2xl p-2.5 shadow-2xl animate-in fade-in zoom-in duration-150 z-40 flex flex-col space-y-1.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <span className="text-[9px] font-black text-amber-300 uppercase tracking-wider">
                ALUR CERITA EDU-VENTURE (3 TAHAP)
              </span>
              <span className="text-[8px] text-sky-400 font-bold">
                Aktif: Tahap {currentChapter}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              {Object.values(CHAPTERS_DATA).map((stage) => {
                const isDone = stage.id < currentChapter;
                const isCurrent = stage.id === currentChapter;
                return (
                  <div
                    key={stage.id}
                    className={`p-1.5 rounded-lg flex items-center justify-between border text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-sky-950 border-sky-400 text-sky-100 shadow-sm'
                        : isDone
                        ? 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span>{stage.mascot}</span>
                      <span className="truncate">
                        Tahap {stage.id}: {stage.title.replace(/^Tahap \d+: /, '')}
                      </span>
                    </div>
                    <span className="text-[8px] flex-shrink-0 ml-1">
                      {isDone ? '✅ Selesai' : isCurrent ? '⚡ Berjalan' : '🔒'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
