import { QuizData } from '../types';

export const QUIZ_STAGE1_REASON: QuizData = {
  id: 'alasan_sungai_tidak_mengairi_kebun',
  title: 'Analisis Masalah: Pompa Air & Sungai',
  topic: 'MASALAH LINGKUNGAN',
  question: 'Mengapa mesin pompa air di tepi sungai tidak dapat mengalirkan air menuju kebun warga sehingga tanaman layu kekeringan?',
  options: [
    {
      id: 'a',
      text: 'Pipa saringan dan aliran air tersumbat oleh tumpukan sampah limbah',
      isCorrect: true,
    },
    {
      id: 'b',
      text: 'Karena tanaman kebun tidak membutuhkan air untuk hidup',
      isCorrect: false,
    },
    {
      id: 'c',
      text: 'Karena air sungai menguap seluruhnya menjadi awan dalam 1 detik',
      isCorrect: false,
    },
    {
      id: 'd',
      text: 'Karena warga sengaja membuang mesin pompa ke tengah hutan',
      isCorrect: false,
    },
  ],
  explanation: 'Tepat sekali! Tumpukan sampah plastik dan limbah menyumbat kisi pipa intake pompa air. Akibatnya, air sungai tidak bisa tersedot ke parit irigasi kebun, menyebabkan tanaman kekurangan pasokan air dan layu!',
};

export const QUIZ_STAGE1_IMPACT: QuizData = {
  id: 'prediksi_dampak_sungai_tersumbat',
  title: 'Prediksi Dampak Lingkungan',
  topic: 'MASALAH LINGKUNGAN',
  question: 'Apa prediksi yang akan terjadi pada lingkungan Desa Makmur jika sungai terus-menerus dibiarkan tersumbat sampah?',
  options: [
    {
      id: 'a',
      text: 'Kebun mati gagal panen, banjir meluap saat hujan, dan ekosistem sungai rusak',
      isCorrect: true,
    },
    {
      id: 'b',
      text: 'Air sungai berubah menjadi bersih dengan sendirinya',
      isCorrect: false,
    },
    {
      id: 'c',
      text: 'Jumlah ikan bertambah banyak karena suka memakan sampah plastik',
      isCorrect: false,
    },
    {
      id: 'd',
      text: 'Tanaman kebun akan tumbuh dua kali lipat lebih cepat',
      isCorrect: false,
    },
  ],
  explanation: 'Luar biasa! Penyumbatan sungai yang terus dibiarkan akan memicu bencana banjir saat debit air naik, mematikan seluruh tanaman perkebunan warga, meracuni habitat ikan, serta menimbulkan krisis air bersih bagi kehidupan desa.',
};

export const QUIZ_STAGE3_RUNNING: QuizData = {
  id: 'analisis_frekuensi_napas_berlari',
  title: 'Analisis Pernapasan & Aktivitas Berat',
  topic: 'SISTEM PERNAPASAN',
  question: 'Ketika kita terus-menerus berlari atau berolahraga berat di lapangan sepak bola, apa yang terjadi pada ritme sistem pernapasan kita?',
  options: [
    {
      id: 'a',
      text: 'Frekuensi napas menjadi lebih cepat dan dalam untuk memasok banyak oksigen ke otot',
      isCorrect: true,
    },
    {
      id: 'b',
      text: 'Paru-paru berhenti bekerja secara otomatis agar tubuh tidak letih',
      isCorrect: false,
    },
    {
      id: 'c',
      text: 'Frekuensi napas menjadi jauh lebih lambat dari saat kita tidur',
      isCorrect: false,
    },
    {
      id: 'd',
      text: 'Otot tubuh tidak membutuhkan oksigen saat berolahraga',
      isCorrect: false,
    },
  ],
  explanation: 'Benar sekali! Saat berlari, sel-sel otot bekerja keras dan membutuhkan lebih banyak energi melalui pembakaran oksigen (O2). Akibatnya, tubuh secara otomatis meningkatkan laju pernapasan agar paru-paru dapat menyerap oksigen lebih banyak dan cepat membuang karbon dioksida (CO2).',
};

export const QUIZ_STAGE3_ECOSYSTEM: QuizData = {
  id: 'refleksi_integratif_ekosistem',
  title: 'Refleksi Integratif: Ekosistem & Pernapasan',
  topic: 'REFLEKSI EKOSISTEM',
  question: 'Bagaimanakah keterkaitan antara menjaga kebersihan sungai (siklus air) dengan kelangsungan sistem pernapasan manusia?',
  options: [
    {
      id: 'a',
      text: 'Sungai bersih menyuburkan tanaman melalui siklus air, lalu tanaman berfotosintesis menghasilkan oksigen untuk kita bernapas',
      isCorrect: true,
    },
    {
      id: 'b',
      text: 'Sungai tidak memiliki hubungan sama sekali dengan udara ataupun pernapasan manusia',
      isCorrect: false,
    },
    {
      id: 'c',
      text: 'Oksigen hanya bisa dihasilkan oleh mesin pabrik, bukan dari tumbuhan hijau',
      isCorrect: false,
    },
    {
      id: 'd',
      text: 'Manusia bernapas menggunakan air sungai yang diminum langsung',
      isCorrect: false,
    },
  ],
  explanation: 'Hebat sekali! Semua bagian di alam saling terhubung. Sungai yang bersih menjamin siklus air berjalan lancar dan mengairi tanaman. Tanaman hijau yang sehat melakukan fotosintesis dan melepaskan Oksigen (O2) ke udara yang kita hirup setiap saat untuk bernapas!',
};

export const SCIENCE_NOTES = [
  {
    title: 'Tahap 1: Masalah Lingkungan & Sungai Bersih',
    points: [
      '1. Kebersihan Sungai: Menjaga bantaran sungai dari sampah plastik dan limbah sangat vital agar saluran irigasi dan mesin pompa air tidak tersumbat.',
      '2. Dampak Penyumbatan: Tanaman layu akibat kekeringan, memicu genangan banjir saat hujan lebat, dan merusak ekosistem akuatik.',
      '3. Gotong Royong (Kerja Bakti): Upaya bersama warga merawat lingkungan hidup menciptakan lingkungan yang lestari dan sehat.',
    ],
  },
  {
    title: 'Tahap 2: Siklus Air (Daur Hidrologi)',
    points: [
      '1. Evaporasi (Penguapan): Air di permukaan bumi (sungai, danau) menyerap panas lalu berubah menjadi uap air yang naik ke atmosfer.',
      '2. Kondensasi (Pengembunan): Uap air yang naik mendingin saat bertemu suhu dingin di atmosfer (seperti efek batu es di atas teko) dan membentuk butiran air/awan.',
      '3. Presipitasi (Hujan): Butiran air di awan semakin padat dan berat, kemudian jatuh kembali ke bumi sebagai air hujan.',
      '4. Menghirup Uap Air: Uap air yang hangat dan bersih dapat dihirup lewat rongga hidung, memberi kelembapan dan melegakan saluran pernapasan.',
    ],
  },
  {
    title: 'Tahap 3: Sistem Pernapasan Manusia & Hubungan Ekosistem',
    points: [
      '1. Alur Pernapasan: Rongga Hidung (penyaring rambut & penghangat) -> Faring/Laring -> Trakea (batang tenggorokan) -> Bronkus -> Paru-paru (Alveolus).',
      '2. Pertukaran Gas di Alveolus: Oksigen (O2) diserap ke dalam pembuluh darah, dan Karbon Dioksida (CO2) dikeluarkan dari tubuh.',
      '3. Olahraga & Frekuensi Napas: Aktivitas fisik berat menuntut suplai oksigen tinggi, memicu napas lebih cepat dan dalam.',
      '4. Keterkaitan Holistik: Sungai bersih -> Tanaman subur -> Fotosintesis menghasilkan O2 -> Udara bersih untuk pernapasan manusia yang sehat!',
    ],
  },
];
