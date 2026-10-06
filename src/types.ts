/**
 * Game Types for "Edu-Venture: Petualangan Desa Makmur"
 * Media Pembelajaran Interaktif IPAS Fase C (SD Kelas 5-6)
 */

export type GameState = 'MENU' | 'PLAYING' | 'EPILOGUE';

export type StageId = 1 | 2 | 3;
export type ChapterId = StageId; // Alias for compatibility

export type BadgeType = 'water' | 'air';

export interface BadgeNotificationData {
  type: BadgeType;
  title: 'Master of Water' | 'Master of Air';
  stageCompleted: StageId;
  description: string;
}

export interface ChapterInfo {
  id: StageId;
  title: string;
  subtitle: string;
  mascot: string;
  badge: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan Akhir';
  objective: string;
  missionList: string[];
}

export type AvatarId = 'adam' | 'hawa' | 'rayyan' | 'maya';

export interface PlayerState {
  name: string;
  avatar: AvatarId;
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  isMoving: boolean;
}

export interface TrashItem {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'plastic' | 'can' | 'bottle';
  collected: boolean;
}

export type NPCId = 'kades' | 'pemancing' | 'rian' | 'guru' | 'ketua' | 'nelayan' | 'doktor';

export interface DialogMessage {
  speaker: string;
  role?: string;
  text: string;
  avatarId?: string;
  badge?: string;
  onComplete?: () => void;
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizData {
  id: string;
  title: string;
  topic: 'MASALAH LINGKUNGAN' | 'SIKLUS AIR' | 'SISTEM PERNAPASAN' | 'REFLEKSI EKOSISTEM';
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  role: 'player' | 'teacher' | 'classmate';
  text: string;
  time: string;
  avatarId?: string;
}

export interface WaterCycleExperimentState {
  heatOn: boolean;
  hasLid: boolean;
  hasIce: boolean;
  condensationProgress: number; // 0 - 100
  precipitationStarted: boolean;
  hasInhaledSteam: boolean;
}
