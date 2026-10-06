import { ChapterInfo, StageId } from '../types';

export const CHAPTERS_DATA: Record<StageId, ChapterInfo> = {
  1: {
    id: 1,
    title: 'Tahap 1: Pengenalan Masalah Lingkungan',
    subtitle: 'Sungai Tersumbat Sampah & Pompa Kebun Rusak',
    mascot: '🚯',
    badge: 'MASALAH LINGKUNGAN',
    difficulty: 'Mudah',
    objective: 'Dekati sungai, pecahkan kuis analisis pompa macet, pungut sampah, dan ajak Kepala Desa kerja bakti.',
    missionList: [
      'Dekati tepian sungai untuk mengamati penyebab kebun warga layu',
      'Jawab pertanyaan analisis penyebab pompa macet & dampak sungai tersumbat',
      'Pungut 3 tumpukan sampah limbah di bantaran sungai (0/3)',
      'Bicara dengan Pemancing dan Kepala Desa di Balai Desa',
      'Mulai alur Kerja Bakti warga untuk menghidupkan kembali pompa air & menyegarkan kebun',
    ],
  },
  2: {
    id: 2,
    title: 'Tahap 2: Penyelidikan Siklus Air',
    subtitle: 'Hujan Presipitasi & Mini-Lab Siklus Air',
    mascot: '🌧️',
    badge: 'SIKLUS AIR',
    difficulty: 'Sedang',
    objective: 'Amati hujan berkah, masuk ke dalam rumah untuk melakukan simulasi siklus air dengan teko transparan & es batu.',
    missionList: [
      'Amati cuaca hujan lebat yang membasahi Desa Makmur',
      'Dengarkan dialog pentingnya kebersihan sungai & pohon bagi evaporasi',
      'Masuk ke Rumah Sains Desa untuk memulai mini-lab eksperimen',
      'Lakukan simulasi: Teko air mendidih (Evaporasi) + Penutup + Batu Es (Kondensasi & Presipitasi)',
      'Hirup uap hangat sebagai jembatan mempelajari sistem pernapasan manusia',
    ],
  },
  3: {
    id: 3,
    title: 'Tahap 3: Analisis Data & Refleksi Sistem Pernapasan',
    subtitle: 'Aktivitas Berat, Organ Pernapasan & Refleksi Ekosistem',
    mascot: '🫁',
    badge: 'SISTEM PERNAPASAN',
    difficulty: 'Tantangan Akhir',
    objective: 'Kunjungi lapangan desa, temui Rian si pemain bola, pelajari alur napas dan simpulkan keterkaitan ekosistem.',
    missionList: [
      'Jelajahi area lapangan bola desa di sebelah timur',
      'Bicara dengan Rian yang sedang terengah-engah setelah berlari',
      'Jawab kuis analisis mengapa olahraga mempercepat frekuensi napas',
      'Pelajari diagram alur sistem pernapasan (Hidung → Tenggorokan → Paru-paru)',
      'Lakukan refleksi integratif: bagaimana sungai bersih mendukung oksigen untuk manusia bernapas',
    ],
  },
};
