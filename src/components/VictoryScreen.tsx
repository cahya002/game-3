import { Award, RotateCcw, Sparkles, Droplets, Wind, CheckCircle2, MessageSquare } from 'lucide-react';
import { sound } from '../utils/audio';
import { BadgeType } from '../types';

interface VictoryScreenProps {
  playerName: string;
  unlockedBadges?: BadgeType[];
  onRestart: () => void;
  onOpenChat: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  playerName,
  unlockedBadges = ['water', 'air'],
  onRestart,
  onOpenChat,
}) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-4 bg-gradient-to-b from-sky-400 via-sky-300 to-blue-600 overflow-y-auto">
      {/* Floating Sparkles Background */}
      <div className="bg-white/98 border-4 border-sky-400 rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl backdrop-blur-md relative z-10 animate-in zoom-in-95 duration-300 my-auto text-center flex flex-col items-center">
        {/* Badge & Trophy */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl mb-3 animate-bounce-soft">
          🏆
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-black mb-2 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>MISI SELESAI SEMPURNA • NILAI A+</span>
        </div>

        <h1 className="font-pixel text-lg sm:text-xl md:text-2xl text-slate-900 drop-shadow-xs">
          SELAMAT, {playerName.toUpperCase()}!
        </h1>
        <p className="text-xs sm:text-sm text-sky-800 font-bold mt-1 mb-3">
          Kamu Telah Menuntaskan Seluruh Petualangan Edu-Venture Desa Makmur!
        </p>

        {/* Master Badges Showcase */}
        <div className="w-full grid grid-cols-2 gap-2 mb-3.5">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 border-2 border-sky-300 rounded-2xl p-2.5 text-white flex items-center gap-2 shadow-md">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
              💧
            </div>
            <div className="text-left">
              <span className="text-[9px] font-black uppercase text-amber-300 block">Lencana Tahap 1 & 2</span>
              <h5 className="font-black text-xs leading-tight">Master of Water</h5>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 border-2 border-emerald-300 rounded-2xl p-2.5 text-white flex items-center gap-2 shadow-md">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg flex-shrink-0">
              🌬️
            </div>
            <div className="text-left">
              <span className="text-[9px] font-black uppercase text-amber-300 block">Lencana Tahap 3</span>
              <h5 className="font-black text-xs leading-tight">Master of Air</h5>
            </div>
          </div>
        </div>

        {/* 3 Stages Summary Cards */}
        <div className="w-full space-y-2 text-left mb-4">
          {/* Stage 1 */}
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 flex items-start gap-2.5">
            <span className="text-xl">🚯</span>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                Tahap 1: Masalah Lingkungan & Pompa Air
              </h4>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                Mengidentifikasi penyebab pompa air tersumbat sampah, memprediksi dampak kekeringan kebun, dan memimpin kerja bakti gotong royong warga.
              </p>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 flex items-start gap-2.5">
            <span className="text-xl">🔬</span>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                Tahap 2: Penyelidikan Siklus Air & Uap Pernapasan
              </h4>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                Membuktikan proses Evaporasi (teko panas), Kondensasi (batu es dingin), Presipitasi (tetesan hujan), serta menghirup uap air hangat masuk ke tubuh.
              </p>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 flex items-start gap-2.5">
            <span className="text-xl">🫁</span>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                Tahap 3: Analisis Data Olahraga & Refleksi Ekosistem
              </h4>
              <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                Menganalisis frekuensi napas saat berlari, menguasai alur Hidung ➔ Tenggorokan ➔ Paru-paru, dan menyimpulkan peran sungai bersih dalam menyediakan oksigen pernapasan.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-2">
          <button
            type="button"
            onClick={onOpenChat}
            className="w-full sm:flex-1 py-3 px-4 rounded-2xl btn-cartoon-blue text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Bagikan ke Forum Diskusi</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="w-full sm:flex-1 py-3 px-4 rounded-2xl btn-cartoon-emerald text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
          >
            <RotateCcw className="w-4 h-4 stroke-[3]" />
            <span>Mainkan Lagi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
