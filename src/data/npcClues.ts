import { StageId } from '../types';

export interface NPCClue {
  speaker: string;
  role: string;
  avatarId: 'salmah' | 'burhan' | 'rayyan' | 'maya';
  hint: string;
}

export const NPC_MISSION_CLUES: Record<StageId, Record<'salmah' | 'burhan' | 'rayyan' | 'maya', string>> = {
  1: {
    salmah: 'Kudengar sungai kita sedang tersumbat sampah botol dan limbah plastik sehingga pompa kebun macet. Ayo bantu pungut sampah di bantaran sungai!',
    burhan: 'Aliran sungai tersumbat membuat tanaman kebun layu kekeringan. Dekati tepi air dan selesaikan kuis analisisnya bersama Pak Kades!',
    rayyan: 'Yuk segera bersihkan! Botol plastik terapung di sungai dekat dermaga harus segera dipungut biar kebun warga bisa dialiri air bersih lagi!',
    maya: 'Pipa pompa air tersumbat plastik. Setelah memungut sampah, mari ajak warga kerja bakti bersama Pak Harun!',
  },
  2: {
    salmah: 'Alhamdulillah hujan berkah turun! Air sungai dan tanaman mengalami penguapan (evaporasi) yang naik ke atmosfer membentuk awan hujan!',
    burhan: 'Masuklah ke Rumah Sains di utara! Ada eksperimen seru menggunakan teko transparan dan es batu untuk membuktikan kondensasi!',
    rayyan: 'Jangan lewatkan menghirup uap air hangat di dalam teko! Itu jembatan penting untuk memahami saluran pernapasan kita!',
    maya: 'Saat uap air panas menyentuh penutup dingin berisi es batu, terjadi kondensasi dan presipitasi tetesan air hujan!',
  },
  3: {
    salmah: 'Rian sedang istirahat di lapangan bola sebelah timur. Napasnya terengah-engah setelah berlari kencang!',
    burhan: 'Saat kita berolahraga berat, otot memerlukan pasokan oksigen ekstra sehingga frekuensi napas bertambah cepat!',
    rayyan: 'Jalur napas kita: Udara masuk lewat rongga hidung, melewati tenggorokan (trakea), lalu menuju alveolus di paru-paru!',
    maya: 'Sungai yang bersih menyuburkan tanaman penghasil oksigen. Tanpa air bersih, kita akan kekurangan oksigen bersih untuk bernapas!',
  },
};
