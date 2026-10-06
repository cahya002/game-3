import React from 'react';
import { SCIENCE_NOTES } from '../data/quizData';
import { X, BookOpen, Droplets, Wind, CheckCircle2, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface ScienceNotesModalProps {
  onClose: () => void;
}

export const ScienceNotesModal: React.FC<ScienceNotesModalProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white/98 border-4 border-sky-400 rounded-3xl max-w-lg w-full max-h-[88vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b-2 border-sky-100 bg-sky-50/80">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
            </span>
            <div>
              <span className="text-[10px] font-black text-sky-700 uppercase tracking-wider block">
                BUKU SAKU PINTAR IPAS FASE C
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                Ringkasan Materi 3 Tahap Petualangan
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playTone(320, 'sine', 0.05, 0.1);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3 text-xs sm:text-sm text-slate-800 flex-1">
          {SCIENCE_NOTES.map((note, index) => {
            const isSky = index === 0;
            const isBlue = index === 1;
            const isEmerald = index === 2;

            return (
              <div
                key={index}
                className={`p-3.5 rounded-2xl border-2 space-y-2 shadow-xs ${
                  isSky
                    ? 'bg-sky-50 border-sky-300'
                    : isBlue
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-emerald-50 border-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2 font-black border-b pb-1.5 text-slate-900 border-slate-200">
                  {isSky && <span className="text-base">🚯</span>}
                  {isBlue && <Droplets className="w-4 h-4 text-blue-500 animate-bounce" />}
                  {isEmerald && <Wind className="w-4 h-4 text-emerald-500" />}
                  <span className="text-xs sm:text-sm">{note.title}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 font-semibold">
                  {note.points.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-slate-200/80 leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t-2 border-slate-100 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Referensi LKM & Belajar Mandiri</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-cartoon-blue px-4 py-1.5 rounded-full text-white font-black text-xs cursor-pointer active:scale-95"
          >
            Tutup Buku Saku
          </button>
        </div>
      </div>
    </div>
  );
};
