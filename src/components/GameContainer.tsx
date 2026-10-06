import React, { useState, useEffect } from 'react';
import {
  GameState,
  StageId,
  AvatarId,
  DialogMessage,
  QuizData,
  BadgeNotificationData,
  BadgeType,
} from '../types';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { MainMenu } from './MainMenu';
import { WorldMap } from './WorldMap';
import { HUD } from './HUD';
import { DialogBox } from './DialogBox';
import { QuizModal } from './QuizModal';
import { VirtualJoypad } from './VirtualJoypad';
import { ScienceNotesModal } from './ScienceNotesModal';
import { VictoryScreen } from './VictoryScreen';
import { LevelTransition } from './LevelTransition';
import { RainEffect } from './Effects';
import { WaterCycleSimulationModal } from './WaterCycleSimulationModal';
import { RespiratoryDiagramModal } from './RespiratoryDiagramModal';
import { OnlineChatModal } from './OnlineChatModal';
import { KerjaBaktiCutscene } from './KerjaBaktiCutscene';
import { BadgeNotification } from './BadgeNotification';
import {
  QUIZ_STAGE1_REASON,
  QUIZ_STAGE1_IMPACT,
  QUIZ_STAGE3_RUNNING,
  QUIZ_STAGE3_ECOSYSTEM,
} from '../data/quizData';
import { sound } from '../utils/audio';

export const GameContainer: React.FC = () => {
  // Game states
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [currentStage, setCurrentStage] = useState<StageId>(1);

  // Player info
  const [playerName, setPlayerName] = useState('Pahlawan Cilik');
  const [playerAvatar, setPlayerAvatar] = useState<AvatarId>('adam');

  // Stage 1 quest progress
  const [trashCount, setTrashCount] = useState(0);
  const [isCropsHealthy, setIsCropsHealthy] = useState(false);
  const [hasSpokenToPemancing, setHasSpokenToPemancing] = useState(false);
  const [hasSpokenToKades, setHasSpokenToKades] = useState(false);
  const [hasTriggeredRiverQuiz, setHasTriggeredRiverQuiz] = useState(false);
  const [showKerjaBakti, setShowKerjaBakti] = useState(false);

  // Stage 2 & 3 modal states
  const [showWaterSimulation, setShowWaterSimulation] = useState(false);
  const [showRespiratoryDiagram, setShowRespiratoryDiagram] = useState(false);

  // Multiplayer Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadChatCount, setUnreadChatCount] = useState(1);

  // UI Dialogs, Quizzes, Transition
  const [activeDialog, setActiveDialog] = useState<DialogMessage | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizData | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showLevelTransition, setShowLevelTransition] = useState(false);
  const [pendingNextStage, setPendingNextStage] = useState<StageId | null>(null);
  const [currentActionLabel, setCurrentActionLabel] = useState<string>('Aksi');

  // Virtual Joypad bridge
  const [externalMove, setExternalMove] = useState<{ dir: 'up' | 'down' | 'left' | 'right'; timestamp: number } | null>(null);
  const [externalActionTimestamp, setExternalActionTimestamp] = useState<number | null>(null);

  // Badge Notification Overlay State
  const [activeBadgeNotification, setActiveBadgeNotification] = useState<BadgeNotificationData | null>(null);
  const [unlockedBadges, setUnlockedBadges] = useState<BadgeType[]>(() => {
    try {
      const saved = localStorage.getItem('edu_venture_unlocked_badges');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const awardBadge = (badge: BadgeNotificationData) => {
    setActiveBadgeNotification(badge);
    setUnlockedBadges((prev: BadgeType[]) => {
      if (prev.includes(badge.type)) return prev;
      const next = [...prev, badge.type];
      try {
        localStorage.setItem('edu_venture_unlocked_badges', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Audio synchronization across stages
  useEffect(() => {
    if (gameState === 'MENU') {
      sound.playBGM('menu');
    } else if (gameState === 'PLAYING') {
      if (currentStage === 1) {
        sound.playBGM('drought');
      } else if (currentStage === 2) {
        sound.playBGM('rain');
      } else if (currentStage === 3) {
        sound.playBGM('menu');
      }
    } else if (gameState === 'EPILOGUE') {
      sound.playBGM('victory');
    }
  }, [gameState, currentStage]);

  // Start game handler
  const handleStartGame = (name: string, avatar: AvatarId) => {
    setPlayerName(name);
    setPlayerAvatar(avatar);
    setGameState('PLAYING');
    setCurrentStage(1);
    setTrashCount(0);
    setIsCropsHealthy(false);
    setHasTriggeredRiverQuiz(false);

    // Initial greeting from Pak Harun (Kepala Desa)
    setTimeout(() => {
      setActiveDialog({
        speaker: 'Pak Harun',
        role: 'Kepala Desa Makmur',
        avatarId: 'kades',
        text: `Halo ${name}! Selamat datang di Desa Makmur. Kita sedang menghadapi masalah darurat: tanaman di kebun warga mendadak layu kekeringan karena mesin pompa air di tepi sungai macet dan tidak mengalirkan air. Coba kamu berjalan ke selatan untuk menyelidiki kondisi sungai dan pompa air tersebut!`,
      });
    }, 400);
  };

  // -------------------------------------------------------------
  // TAHAP 1: PENGENALAN MASALAH LINGKUNGAN
  // -------------------------------------------------------------
  // 1. Saat mendekati sungai: Pop-up pertanyaan 1 (alasan sungai tidak dapat mengairi kebun)
  const handleApproachRiver = () => {
    if (hasTriggeredRiverQuiz) return;
    setHasTriggeredRiverQuiz(true);

    sound.playTone(520, 'sine', 0.1, 0.2);
    setActiveDialog({
      speaker: 'Pahlawan Cilik',
      role: 'Peneliti IPAS',
      avatarId: playerAvatar,
      text: `Lihat itu! Mesin pompa air di tepi sungai mengeluarkan asap dan baling-balingnya macet! Pipa intake-nya tersumbat tumpukan sampah plastik dan kaleng! Mari kita analisis masalah ini.`,
      onComplete: () => {
        // Trigger Pop-up Pertanyaan 1
        setActiveQuiz(QUIZ_STAGE1_REASON);
      },
    });
  };

  // Callback setelah Kuis 1 dijawab benar -> Munculkan Pop-up Pertanyaan 2 (Prediksi Dampak)
  const handleQuizSuccess = () => {
    if (!activeQuiz) return;

    if (activeQuiz.id === QUIZ_STAGE1_REASON.id) {
      // Pertanyaan 2: Prediksi Dampak jika terus tersumbat
      setActiveQuiz(QUIZ_STAGE1_IMPACT);
    } else if (activeQuiz.id === QUIZ_STAGE1_IMPACT.id) {
      setActiveQuiz(null);
      // Dialog ajakan pungut sampah
      setActiveDialog({
        speaker: 'Pahlawan Cilik',
        role: 'Peneliti IPAS',
        avatarId: playerAvatar,
        text: `Analisis tepat! Jika dibiarkan, kebun akan gagal panen dan sungai meluap banjir. Ayo segera pungut 3 tumpukan sampah di sekitar bantaran sungai ini!`,
      });
    } else if (activeQuiz.id === QUIZ_STAGE3_RUNNING.id) {
      setActiveQuiz(null);
      // Lanjut buka diagram visual sistem pernapasan
      setShowRespiratoryDiagram(true);
    } else if (activeQuiz.id === QUIZ_STAGE3_ECOSYSTEM.id) {
      setActiveQuiz(null);
      // Award Master of Air Badge for Stage 3!
      awardBadge({
        type: 'air',
        title: 'Master of Air',
        stageCompleted: 3,
        description: 'Hebat! Kamu menguasai sistem pernapasan manusia & peran ekosistem sungai bagi pasokan oksigen!',
      });
      // Selesai seluruh game!
      sound.playVictory();
      setActiveDialog({
        speaker: 'Pak Harun & Bu Ratna',
        role: 'Refleksi Akhir IPAS',
        avatarId: 'kades',
        text: `Luar biasa, ${playerName}! Kamu telah membuktikan bahwa menjaga sungai dan tanaman adalah kunci siklus air dan penghasil oksigen bagi pernapasan kita semua. Petualangan Desa Makmur selesai dengan nilai sempurna!`,
        onComplete: () => {
          setActiveDialog(null);
          setGameState('EPILOGUE');
        },
      });
    }
  };

  // Pungut sampah di sungai
  const handleCollectTrash = (trashId: string) => {
    const nextCount = trashCount + 1;
    setTrashCount(nextCount);

    if (nextCount === 3) {
      sound.playTone(660, 'sine', 0.1, 0.2);
      setActiveDialog({
        speaker: 'Pahlawan Cilik',
        role: 'Peneliti IPAS',
        avatarId: playerAvatar,
        text: `Alhamdulillah! 3 tumpukan sampah di bantaran sungai sudah kita pungut! Sekarang mari kita laporkan ke Pak Bambang (Pemancing) dan Pak Harun (Kepala Desa) di Balai Desa!`,
      });
    }
  };

  // Interaksi dengan Pak Bambang (Pemancing di Dermaga)
  const handleInteractPemancing = () => {
    setHasSpokenToPemancing(true);
    sound.playTone(480, 'sine', 0.05, 0.1);

    if (currentStage === 1) {
      if (trashCount < 3) {
        setActiveDialog({
          speaker: 'Pak Bambang',
          role: 'Pemancing Sungai',
          avatarId: 'pemancing',
          text: `Aduh pusing kepala saya... Sampah plastik di mana-mana bikin air sungai keruh dan ikan-ikan menghilang. Mesin pompa kebun warga juga jadi macet total! Tolong bantu bersihkan sampah di bantaran sungai ya, Nak!`,
        });
      } else {
        setActiveDialog({
          speaker: 'Pak Bambang',
          role: 'Pemancing Sungai',
          avatarId: 'pemancing',
          text: `Hebat sekali kamu, Nak! Sampah-sampah besar sudah kamu angkat. Segera temui Pak Kades di Balai Desa agar warga bisa kita ajak gotong royong kerja bakti membersihkan seluruh sisa kotoran!`,
        });
      }
    } else {
      setActiveDialog({
        speaker: 'Pak Bambang',
        role: 'Pemancing Sungai',
        avatarId: 'pemancing',
        text: `Wah, air sungai kini sudah jernih kembali! Ikan-ikan mulai berenang riang, dan mesin pompa mengalirkan air segar ke kebun warga! Terima kasih banyak, ${playerName}!`,
      });
    }
  };

  // Interaksi dengan Pak Harun (Kepala Desa di Balai Desa)
  const handleInteractKades = () => {
    setHasSpokenToKades(true);
    sound.playTone(520, 'sine', 0.05, 0.1);

    if (currentStage === 1) {
      if (trashCount < 3) {
        setActiveDialog({
          speaker: 'Pak Harun',
          role: 'Kepala Desa Makmur',
          avatarId: 'kades',
          text: `Bagaimana hasil investigasimu di sungai, ${playerName}? Jangan lupa selidiki penyebab pompa macet dan bantu pungut tumpukan sampah di bantaran sungai ya!`,
        });
      } else {
        // Trigger Kerja Bakti alur cerita
        setActiveDialog({
          speaker: 'Pak Harun',
          role: 'Kepala Desa Makmur',
          avatarId: 'kades',
          text: `Luar biasa dedikasimu! Kamu telah membuktikan bahwa sampah limbah adalah biang keladi macetnya pompa air. Sekarang, saya akan umumkan kepada seluruh warga Desa Makmur untuk segera melakukan KERJA BAKTI BERSAMA!`,
          onComplete: () => {
            setActiveDialog(null);
            setShowKerjaBakti(true);
          },
        });
      }
    } else if (currentStage === 2) {
      setActiveDialog({
        speaker: 'Pak Harun',
        role: 'Kepala Desa Makmur',
        avatarId: 'kades',
        text: `Hujan lebat sedang membasahi desa kita! Masuklah ke Rumah Sains di sebelah utara untuk mengamati simulasi siklus air dengan teko transparan dan es batu!`,
      });
    } else {
      setActiveDialog({
        speaker: 'Pak Harun',
        role: 'Kepala Desa Makmur',
        avatarId: 'kades',
        text: `Desa Makmur kini sangat asri dan sehat. Pergilah ke lapangan bola di sebelah timur untuk bertemu temanmu Rian!`,
      });
    }
  };

  // Selesai Kerja Bakti -> Mengembalikan fungsi pompa, menyegarkan tanaman, transisi ke Tahap 2
  const handleFinishKerjaBakti = () => {
    setShowKerjaBakti(false);
    setIsCropsHealthy(true);

    // Award Master of Water Badge for Stage 1!
    awardBadge({
      type: 'water',
      title: 'Master of Water',
      stageCompleted: 1,
      description: 'Selamat! Masalah lingkungan terselesaikan & pompa air kebun kembali menyala!',
    });

    sound.playVictory();
    setActiveDialog({
      speaker: 'Pak Harun',
      role: 'Kepala Desa Makmur',
      avatarId: 'kades',
      text: `Alhamdulillah! Berkat kerja bakti warga, mesin pompa air telah menyala kembali ("Brrmmm!"), saluran irigasi mengalir lancar, dan tanaman kebun yang layu kini mekar subur! Dan lihatlah, langit mulai mendung dan tetesan air hujan mulai turun... Mari kita lanjut ke Tahap 2!`,
      onComplete: () => {
        setActiveDialog(null);
        triggerStageTransition(2);
      },
    });
  };

  // -------------------------------------------------------------
  // TAHAP 2: PENYELIDIKAN SIKLUS AIR
  // -------------------------------------------------------------
  const handleEnterScienceHouse = () => {
    sound.playTone(600, 'triangle', 0.1, 0.2);
    setShowWaterSimulation(true);
  };

  const handleFinishWaterSimulation = () => {
    setShowWaterSimulation(false);

    // Award Master of Water Badge for Stage 2!
    awardBadge({
      type: 'water',
      title: 'Master of Water',
      stageCompleted: 2,
      description: 'Luar biasa! Kamu menguasai siklus air: Evaporasi, Kondensasi, dan Presipitasi!',
    });

    sound.playVictory();

    setActiveDialog({
      speaker: 'Bu Ratna',
      role: 'Guru Sains IPAS',
      avatarId: 'guru',
      text: `Hebat sekali eksperimenmu! Kamu telah menyaksikan langsung Evaporasi (penguapan air panas), Kondensasi (uap menjadi butiran air karena es dingin), dan Presipitasi (hujan buatan). Kamu juga sudah merasakan bagaimana uap air hangat dihirup masuk ke rongga hidung menuju paru-paru! Sekarang, mari melangkah ke Tahap 3 di Lapangan Desa!`,
      onComplete: () => {
        setActiveDialog(null);
        triggerStageTransition(3);
      },
    });
  };

  // -------------------------------------------------------------
  // TAHAP 3: ANALISIS DATA & REFLEKSI SISTEM PERNAPASAN
  // -------------------------------------------------------------
  const handleInteractRian = () => {
    sound.playTone(440, 'sine', 0.08, 0.15);

    setActiveDialog({
      speaker: 'Rian',
      role: 'Pemain Sepak Bola Desa',
      avatarId: 'rian',
      text: `Hosh... hosh...! Aduh, napasku memburu cepat sekali setelah berlari keliling lapangan mengejar bola! Menurutmu, mengapa aktivitas berat seperti berlari membuat pernapasan kita bekerja jauh lebih cepat?`,
      onComplete: () => {
        // Pop-up pertanyaan analisis lari & pernapasan
        setActiveQuiz(QUIZ_STAGE3_RUNNING);
      },
    });
  };

  const handleCloseRespiratoryDiagram = () => {
    setShowRespiratoryDiagram(false);
    // Pertanyaan refleksi integratif ekosistem
    setTimeout(() => {
      setActiveQuiz(QUIZ_STAGE3_ECOSYSTEM);
    }, 300);
  };

  // Stage Transitions
  const triggerStageTransition = (nextSt: StageId) => {
    setPendingNextStage(nextSt);
    setShowLevelTransition(true);
  };

  const handleCompleteTransition = () => {
    if (pendingNextStage) {
      const nextSt = pendingNextStage;
      setCurrentStage(nextSt);
      setPendingNextStage(null);
      setShowLevelTransition(false);

      if (nextSt === 2) {
        setTimeout(() => {
          setActiveDialog({
            speaker: 'Pahlawan Cilik',
            role: 'Observasi Siklus Air',
            avatarId: playerAvatar,
            text: `Subhanallah, hujan berkah membasahi Desa Makmur! Menjaga kebersihan sungai dan menanam pepohonan memicu proses evaporasi dan transpirasi yang menghasilkan awan hujan. Ayo segera masuk ke Rumah Sains Desa untuk melakukan simulasi siklus air!`,
          });
        }, 500);
      } else if (nextSt === 3) {
        setTimeout(() => {
          setActiveDialog({
            speaker: 'Pahlawan Cilik',
            role: 'Observasi Sistem Pernapasan',
            avatarId: playerAvatar,
            text: `Hujan sudah reda dan cuaca kembali cerah berseri! Di sebelah timur, terdengar suara anak-anak bermain bola di Lapangan Desa. Mari kita ke sana untuk menganalisis sistem organ pernapasan manusia!`,
          });
        }, 500);
      }
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* 1. MAIN MENU SCREEN */}
      {gameState === 'MENU' && (
        <MainMenu
          onStartGame={handleStartGame}
          isMuted={isMuted}
          onToggleMute={() => {
            const next = !isMuted;
            setIsMuted(next);
            sound.toggleMute();
          }}
          onOpenNotes={() => setShowNotes(true)}
        />
      )}

      {/* 2. PLAYING WORLD */}
      {gameState === 'PLAYING' && (
        <div className="relative w-full h-full">
          {/* Weather Effects (Rain during Stage 2) */}
          {currentStage === 2 && <RainEffect />}

          {/* World Map Game Canvas */}
          <WorldMap
            playerName={playerName}
            avatarId={playerAvatar}
            currentStage={currentStage}
            trashCount={trashCount}
            isCropsHealthy={isCropsHealthy}
            onApproachRiver={handleApproachRiver}
            onInteractPemancing={handleInteractPemancing}
            onInteractKades={handleInteractKades}
            onInteractRian={handleInteractRian}
            onEnterScienceHouse={handleEnterScienceHouse}
            onCollectTrash={handleCollectTrash}
            onActionPromptChange={(label) => setCurrentActionLabel(label || 'Aksi')}
            externalMove={externalMove}
            externalActionTimestamp={externalActionTimestamp}
          />

          {/* Heads-Up Display (HUD) */}
          <HUD
            playerName={playerName}
            currentChapter={currentStage}
            trashCount={trashCount}
            isMuted={isMuted}
            unreadChatCount={unreadChatCount}
            unlockedBadges={unlockedBadges}
            onToggleMute={() => {
              const next = !isMuted;
              setIsMuted(next);
              sound.toggleMute();
            }}
            onOpenNotes={() => setShowNotes(true)}
            onOpenChat={() => {
              setIsChatOpen(true);
              setUnreadChatCount(0);
            }}
            onShowBadgeDetails={(type) => {
              if (type === 'water') {
                awardBadge({
                  type: 'water',
                  title: 'Master of Water',
                  stageCompleted: currentStage,
                  description: 'Ahli Siklus Air & Kelestarian Sungai Desa Makmur!',
                });
              } else {
                awardBadge({
                  type: 'air',
                  title: 'Master of Air',
                  stageCompleted: 3,
                  description: 'Ahli Sistem Pernapasan & Ekosistem Oksigen Manusia!',
                });
              }
            }}
          />

          {/* Compact Virtual Joypad Controls */}
          <VirtualJoypad
            onMove={(dir) => setExternalMove({ dir, timestamp: Date.now() })}
            onAction={() => setExternalActionTimestamp(Date.now())}
            actionLabel={currentActionLabel}
            isActionAvailable={true}
          />
        </div>
      )}

      {/* 3. VICTORY / EPILOGUE SCREEN */}
      {gameState === 'EPILOGUE' && (
        <VictoryScreen
          playerName={playerName}
          unlockedBadges={unlockedBadges}
          onRestart={() => {
            setGameState('MENU');
            setCurrentStage(1);
          }}
          onOpenChat={() => {
            setIsChatOpen(true);
            setUnreadChatCount(0);
          }}
        />
      )}

      {/* MODALS & CUTSCENES */}
      {/* Dialogue Box */}
      {activeDialog && (
        <DialogBox
          speaker={activeDialog.speaker}
          role={activeDialog.role}
          avatarId={activeDialog.avatarId as any}
          text={activeDialog.text}
          onNext={() => {
            if (activeDialog.onComplete) {
              activeDialog.onComplete();
            } else {
              setActiveDialog(null);
            }
          }}
        />
      )}

      {/* Quiz Modal */}
      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz}
          onSuccess={handleQuizSuccess}
        />
      )}

      {/* Kerja Bakti Cutscene (Tahap 1) */}
      {showKerjaBakti && (
        <KerjaBaktiCutscene onFinish={handleFinishKerjaBakti} />
      )}

      {/* Water Cycle Simulation Mini-Lab (Tahap 2) */}
      {showWaterSimulation && (
        <WaterCycleSimulationModal
          onComplete={handleFinishWaterSimulation}
        />
      )}

      {/* Respiratory Diagram Modal (Tahap 3) */}
      {showRespiratoryDiagram && (
        <RespiratoryDiagramModal
          onClose={handleCloseRespiratoryDiagram}
        />
      )}

      {/* Online Chat Modal (Multiplayer Discussion) */}
      <OnlineChatModal
        playerName={playerName}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        unreadCount={unreadChatCount}
        onClearUnread={() => setUnreadChatCount(0)}
      />

      {/* Science Pocket Notes */}
      {showNotes && (
        <ScienceNotesModal onClose={() => setShowNotes(false)} />
      )}

      {/* Stage Transition Curtain */}
      {showLevelTransition && pendingNextStage && (
        <LevelTransition
          chapterNumber={pendingNextStage}
          chapterTitle={CHAPTERS_DATA[pendingNextStage].title.toUpperCase()}
          chapterSubtitle={CHAPTERS_DATA[pendingNextStage].subtitle}
          completedText={`Tahap ${pendingNextStage - 1} Berhasil Dituntaskan! 🎉`}
          missionPoints={CHAPTERS_DATA[pendingNextStage].missionList.slice(0, 3).map((m) => ({
            icon: '🌟',
            text: m,
          }))}
          onComplete={handleCompleteTransition}
        />
      )}

      {/* Badge Notification Overlay */}
      <BadgeNotification
        badge={activeBadgeNotification}
        onDismiss={() => setActiveBadgeNotification(null)}
      />
    </div>
  );
};
