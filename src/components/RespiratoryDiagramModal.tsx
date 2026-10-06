import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Wind, Heart, Sparkles, ArrowRight, CheckCircle2, Info } from 'lucide-react';

interface RespiratoryDiagramModalProps {
  onClose: () => void;
}

export const RespiratoryDiagramModal: React.FC<RespiratoryDiagramModalProps> = ({
  onClose,
}) => {
  const [selectedOrgan, setSelectedOrgan] = useState<'hidung' | 'tenggorokan' | 'paru'>('hidung');

  const handleSelectOrgan = (organ: 'hidung' | 'tenggorokan' | 'paru') => {
    setSelectedOrgan(organ);
    sound.playTone(520, 'sine', 0.05, 0.1);
  };

  const organData = {
    hidung: {
      name: '1. Rongga Hidung',
      icon: '👃',
      badge: 'Gerbang Masuk Udara',
      summary:
        'Pintu utama udara masuk. Di dalamnya terdapat rambut hidung untuk menyaring partikel debu dan kotoran, serta selaput lendir yang berfungsi menyesuaikan suhu dan melembapkan udara sebelum masuk lebih dalam ke tubuh.',
    },
    tenggorokan: {
      name: '2. Tenggorokan (Trakea)',
      icon: '🧣',
      badge: 'Saluran Batang Udara',
      summary:
        'Saluran pipa udara yang terdiri dari Faring, Laring (pita suara), dan Trakea. Dinding trakea dilapisi sel bersilia yang aktif menyapu kotoran halus agar kita bisa batuk atau bersin mengeluarkan debu.',
    },
    paru: {
      name: '3. Paru-Paru (Alveolus)',
      icon: '🫁',
      badge: 'Pusat Pertukaran Gas',
      summary:
        'Udara bercabang ke Bronkus kanan-kiri menuju kantung-kantung kecil bernama Alveolus. Di alveolus inilah terjadi pertukaran ajaib: Oksigen (O2) diserap masuk ke pembuluh darah, dan Karbon Dioksida (CO2) dilepas untuk diembuskan keluar.',
    },
  };

  return (
    <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white/98 border-4 border-sky-400 rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl relative my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-sky-100 pb-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-sky-100 border-2 border-sky-300 text-sky-600 flex items-center justify-center text-xl shadow-inner flex-shrink-0">
              🫁
            </span>
            <div>
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider block">
                IPAS Fase C • Sistem Organ Manusia
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                Alur Sistem Pernapasan Manusia
              </h3>
            </div>
          </div>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300 font-bold hidden sm:inline">
            Oksigen (O₂) ➔ Energi ⚡
          </span>
        </div>

        {/* Visual Flow Arrow Pipeline */}
        <div className="flex items-center justify-between bg-sky-50 p-2.5 rounded-2xl border-2 border-sky-200 mb-4">
          <button
            type="button"
            onClick={() => handleSelectOrgan('hidung')}
            className={`flex-1 p-2 rounded-xl text-center transition-all cursor-pointer ${
              selectedOrgan === 'hidung'
                ? 'bg-sky-500 text-white font-black shadow-md'
                : 'text-slate-700 hover:bg-sky-100 font-bold'
            }`}
          >
            <div className="text-lg">👃</div>
            <div className="text-[10px] sm:text-xs">1. Hidung</div>
          </button>

          <span className="text-sky-400 font-black px-1 text-sm">➔</span>

          <button
            type="button"
            onClick={() => handleSelectOrgan('tenggorokan')}
            className={`flex-1 p-2 rounded-xl text-center transition-all cursor-pointer ${
              selectedOrgan === 'tenggorokan'
                ? 'bg-sky-500 text-white font-black shadow-md'
                : 'text-slate-700 hover:bg-sky-100 font-bold'
            }`}
          >
            <div className="text-lg">🧣</div>
            <div className="text-[10px] sm:text-xs">2. Tenggorokan</div>
          </button>

          <span className="text-sky-400 font-black px-1 text-sm">➔</span>

          <button
            type="button"
            onClick={() => handleSelectOrgan('paru')}
            className={`flex-1 p-2 rounded-xl text-center transition-all cursor-pointer ${
              selectedOrgan === 'paru'
                ? 'bg-sky-500 text-white font-black shadow-md'
                : 'text-slate-700 hover:bg-sky-100 font-bold'
            }`}
          >
            <div className="text-lg">🫁</div>
            <div className="text-[10px] sm:text-xs">3. Paru-Paru</div>
          </button>
        </div>

        {/* Detail Panel of Selected Organ */}
        <div className="bg-gradient-to-br from-white to-sky-50 border-2 border-sky-200 p-4 rounded-2xl mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{organData[selectedOrgan].icon}</span>
            <div>
              <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                {organData[selectedOrgan].name}
              </h4>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                {organData[selectedOrgan].badge}
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {organData[selectedOrgan].summary}
          </p>
        </div>

        {/* Holistic Key Insight */}
        <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl text-[11px] sm:text-xs text-amber-950 leading-relaxed mb-4 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Kaitan dengan Olahraga di Lapangan:</strong> Saat kita berlari kencang, paru-paru memompa oksigen lebih cepat ke seluruh otot tubuh. Jika lingkungan dan udara kita bersih, tubuh terasa bugar dan bersemangat!
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-cartoon-emerald px-6 py-2.5 rounded-full text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
          >
            <span>Lanjut ke Pertanyaan Refleksi!</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
