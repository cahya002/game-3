import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';
import { Sparkles, Users, Droplets, CheckCircle2, ArrowRight } from 'lucide-react';

interface KerjaBaktiCutsceneProps {
  onFinish: () => void;
}

export const KerjaBaktiCutscene: React.FC<KerjaBaktiCutsceneProps> = ({ onFinish }) => {
  const [stage, setStage] = useState<number>(0);

  useEffect(() => {
    // Stage 0: Warga berkumpul
    sound.playTone(520, 'sine', 0.1, 0.2);

    const t1 = setTimeout(() => {
      setStage(1); // Warga gotong royong membersihkan sampah
      sound.playPickup();
    }, 1800);

    const t2 = setTimeout(() => {
      setStage(2); // Mesin pompa menyala & air mengalir
      sound.playTone(660, 'triangle', 0.15, 0.3);
    }, 3800);

    const t3 = setTimeout(() => {
      setStage(3); // Tanaman segar mekar & berhasil!
      sound.playVictory();
    }, 5800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white/98 border-4 border-emerald-400 rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative animate-in zoom-in-95 duration-300 text-center flex flex-col items-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-800 text-xs font-black mb-3">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          <span>KERJA BAKTI DESA MAKMUR</span>
        </div>

        {/* Dynamic Visual Stage */}
        <div className="w-full bg-gradient-to-b from-sky-100 to-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 mb-4 relative min-h-[170px] flex flex-col items-center justify-center overflow-hidden">
          {stage === 0 && (
            <div className="animate-in fade-in duration-300 flex flex-col items-center">
              <div className="text-4xl mb-2 animate-bounce-soft">📢 🧑‍🌾 👨‍🌾</div>
              <h4 className="font-black text-slate-900 text-sm sm:text-base">
                Kepala Desa Mengumumkan Kerja Bakti!
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Warga desa berbondong-bondong membawa karung dan jaring untuk membersihkan sungai.
              </p>
            </div>
          )}

          {stage === 1 && (
            <div className="animate-in zoom-in duration-300 flex flex-col items-center">
              <div className="text-4xl mb-2 flex gap-3">
                <span className="animate-bounce">🧹</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🚮</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🌊</span>
              </div>
              <h4 className="font-black text-emerald-900 text-sm sm:text-base">
                Gotong Royong Membersihkan Sungai!
              </h4>
              <p className="text-xs text-emerald-700 mt-1">
                Tumpukan plastik dan limbah diangkat bersama. Sungai kembali mengalir jernih!
              </p>
            </div>
          )}

          {stage === 2 && (
            <div className="animate-in zoom-in duration-300 flex flex-col items-center">
              <div className="text-4xl mb-2 animate-pulse">⚙️ 💧 🌊</div>
              <h4 className="font-black text-sky-900 text-sm sm:text-base">
                Mesin Pompa Air Berfungsi Kembali!
              </h4>
              <p className="text-xs text-sky-700 mt-1">
                Saringan pipa intake bersih! Aliran air bertekanan mengalir lancar menuju parit kebun warga.
              </p>
            </div>
          )}

          {stage >= 3 && (
            <div className="animate-in zoom-in duration-300 flex flex-col items-center">
              <div className="text-4xl mb-2 animate-bounce flex gap-2">
                <span>🌱</span>
                <span>➔</span>
                <span className="scale-125">🌻</span>
                <span>🌾</span>
              </div>
              <h4 className="font-black text-emerald-800 text-base sm:text-lg">
                Tanaman Kebun Segar & Mekar Kembali!
              </h4>
              <p className="text-xs text-emerald-700 font-semibold mt-1">
                Pasokan air tercukupi, tanah menjadi subur, dan kebun warga terselamatkan!
              </p>
            </div>
          )}
        </div>

        {/* Success Details */}
        <div className="space-y-1 mb-4 text-xs text-slate-700 font-medium">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Tahap 1 Berhasil Diselesaikan!</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Sungai bersih membuka jalan bagi siklus air alami di Desa Makmur.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onFinish}
          className="btn-cartoon-emerald text-white px-7 py-3 rounded-full font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
        >
          <span>Lanjut ke Tahap 2 (Penyelidikan Siklus Air)!</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
