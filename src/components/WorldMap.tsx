import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StageId, AvatarId, TrashItem } from '../types';
import { CharacterSprite } from './PixelAvatars';
import {
  WaterPumpStation,
  VillageFarmField,
  VillageFootballField,
  VillageHallBuilding,
  ScienceHouseBuilding,
} from './EduVillageElements';
import {
  RiverPier,
  RiverBridge,
  WoodenSignpost,
  WoodenFence,
  AnimatedRiver,
} from './VillageElements';
import { GlowingArrow } from './GlowingArrow';
import { sound } from '../utils/audio';
import { Sparkles, Trash2, HelpCircle, MessageSquare, Hand } from 'lucide-react';

interface WorldMapProps {
  playerName: string;
  avatarId: AvatarId;
  currentStage: StageId;
  trashCount: number;
  isCropsHealthy: boolean;
  onApproachRiver: () => void;
  onInteractPemancing: () => void;
  onInteractKades: () => void;
  onInteractRian: () => void;
  onEnterScienceHouse: () => void;
  onCollectTrash: (trashId: string) => void;
  onActionPromptChange?: (actionLabel: string | null) => void;
  externalMove?: { dir: 'up' | 'down' | 'left' | 'right'; timestamp: number } | null;
  externalActionTimestamp?: number | null;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  playerName,
  avatarId,
  currentStage,
  trashCount,
  isCropsHealthy,
  onApproachRiver,
  onInteractPemancing,
  onInteractKades,
  onInteractRian,
  onEnterScienceHouse,
  onCollectTrash,
  onActionPromptChange,
  externalMove,
  externalActionTimestamp,
}) => {
  // Player Position in percentage (0 to 100)
  const [playerPos, setPlayerPos] = useState({ x: 48, y: 52 });
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const [isMoving, setIsMoving] = useState(false);
  const [activePrompt, setActivePrompt] = useState<{ text: string; buttonLabel: string; action: () => void } | null>(null);

  // Trash entities along the riverbank in Stage 1
  const [trashes, setTrashes] = useState<TrashItem[]>([
    { id: 't1', name: 'Botol Plastik Bekas', x: 30, y: 80, type: 'bottle', collected: false },
    { id: 't2', name: 'Kaleng Minuman Limbah', x: 48, y: 81, type: 'can', collected: false },
    { id: 't3', name: 'Kantong Plastik Kresek', x: 66, y: 80, type: 'plastic', collected: false },
  ]);

  // Track if river approach has been triggered in Stage 1
  const [hasTriggeredRiverApproach, setHasTriggeredRiverApproach] = useState(false);

  // Synchronize trash count externally
  const remainingTrashes = useMemo(() => trashes.filter((t) => !t.collected), [trashes]);

  // Handle player movement
  const movePlayer = useCallback((dir: 'up' | 'down' | 'left' | 'right') => {
    setDirection(dir);
    setIsMoving(true);

    const step = 2.4;
    setPlayerPos((prev) => {
      let nextX = prev.x;
      let nextY = prev.y;

      if (dir === 'up') nextY = Math.max(12, prev.y - step);
      if (dir === 'down') nextY = Math.min(84, prev.y + step); // riverbank boundary
      if (dir === 'left') nextX = Math.max(6, prev.x - step);
      if (dir === 'right') nextX = Math.min(94, prev.x + step);

      return { x: nextX, y: nextY };
    });

    const stopTimer = setTimeout(() => setIsMoving(false), 180);
    return () => clearTimeout(stopTimer);
  }, []);

  // Handle external joypad inputs
  useEffect(() => {
    if (externalMove) {
      movePlayer(externalMove.dir);
    }
  }, [externalMove, movePlayer]);

  // Handle external action button
  useEffect(() => {
    if (externalActionTimestamp && activePrompt) {
      activePrompt.action();
    }
  }, [externalActionTimestamp, activePrompt]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        movePlayer('up');
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        movePlayer('down');
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        movePlayer('left');
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        movePlayer('right');
      } else if (['Space', 'Enter'].includes(e.code)) {
        if (activePrompt) {
          e.preventDefault();
          activePrompt.action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer, activePrompt]);

  // Check proximity to interactive objects and NPCs
  useEffect(() => {
    const { x, y } = playerPos;

    // 1. Stage 1: River Approach Trigger (Automatic first time near river y >= 73)
    if (currentStage === 1 && !hasTriggeredRiverApproach && y >= 73) {
      setHasTriggeredRiverApproach(true);
      onApproachRiver();
      return;
    }

    // 2. Trash items near river (Stage 1)
    if (currentStage === 1) {
      const nearTrash = remainingTrashes.find((t) => {
        const dist = Math.hypot(t.x - x, t.y - y);
        return dist < 6.5;
      });

      if (nearTrash) {
        const promptObj = {
          text: `Pungut ${nearTrash.name}`,
          buttonLabel: 'Pungut',
          action: () => {
            sound.playPickup();
            setTrashes((prev) =>
              prev.map((t) => (t.id === nearTrash.id ? { ...t, collected: true } : t))
            );
            onCollectTrash(nearTrash.id);
          },
        };
        setActivePrompt(promptObj);
        onActionPromptChange?.('Pungut');
        return;
      }
    }

    // 3. NPC Pemancing (Pak Bambang) near pier (x: 26, y: 76)
    const distToPemancing = Math.hypot(26 - x, 76 - y);
    if (distToPemancing < 7.5) {
      const promptObj = {
        text: 'Bicara dengan Pak Bambang (Pemancing)',
        buttonLabel: 'Bicara',
        action: onInteractPemancing,
      };
      setActivePrompt(promptObj);
      onActionPromptChange?.('Bicara');
      return;
    }

    // 4. NPC Kepala Desa (Pak Harun) at Balai Desa (x: 52, y: 46)
    const distToKades = Math.hypot(52 - x, 46 - y);
    if (distToKades < 8.0) {
      const promptObj = {
        text: 'Bicara dengan Kepala Desa (Pak Harun)',
        buttonLabel: 'Bicara',
        action: onInteractKades,
      };
      setActivePrompt(promptObj);
      onActionPromptChange?.('Bicara');
      return;
    }

    // 5. Stage 2: Science House Lab Entrance (x: 38, y: 22)
    if (currentStage === 2) {
      const distToScienceHouse = Math.hypot(38 - x, 22 - y);
      if (distToScienceHouse < 8.5) {
        const promptObj = {
          text: 'Masuk Rumah Sains (Mini-Lab Siklus Air)',
          buttonLabel: 'Masuk Lab',
          action: onEnterScienceHouse,
        };
        setActivePrompt(promptObj);
        onActionPromptChange?.('Masuk Lab');
        return;
      }
    }

    // 6. Stage 3: NPC Rian at Soccer Field (x: 78, y: 44)
    if (currentStage === 3) {
      const distToRian = Math.hypot(78 - x, 44 - y);
      if (distToRian < 8.5) {
        const promptObj = {
          text: 'Bicara dengan Rian (Pemain Bola)',
          buttonLabel: 'Bicara',
          action: onInteractRian,
        };
        setActivePrompt(promptObj);
        onActionPromptChange?.('Bicara');
        return;
      }
    }

    // Default: No nearby action
    setActivePrompt(null);
    onActionPromptChange?.(null);
  }, [
    playerPos,
    currentStage,
    hasTriggeredRiverApproach,
    remainingTrashes,
    onApproachRiver,
    onInteractPemancing,
    onInteractKades,
    onEnterScienceHouse,
    onInteractRian,
    onCollectTrash,
    onActionPromptChange,
  ]);

  return (
    <div className="relative w-full h-full bg-[#1e4620] overflow-hidden select-none">
      {/* 1. GRASS & VILLAGE GROUND PATTERN */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#2d6a30 15%, transparent 16%), radial-gradient(#1e4620 15%, transparent 16%)',
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
      />

      {/* 2. VILLAGE DIRT PATHWAYS (Jalan Setapak Desa) */}
      <div className="absolute top-[28%] left-0 right-0 h-10 bg-[#7c4a1e]/40 border-y border-[#5c3210]/60 pointer-events-none" />
      <div className="absolute top-[56%] left-[20%] right-[20%] h-9 bg-[#7c4a1e]/35 border-y border-[#5c3210]/50 rounded-full pointer-events-none" />
      <div className="absolute top-[18%] bottom-[16%] left-[46%] w-10 bg-[#7c4a1e]/40 border-x border-[#5c3210]/60 pointer-events-none" />

      {/* 3. WEST ZONE: KEBUN WARGA (Tanaman Layu vs Segar Mekar) */}
      <div className="absolute top-[20%] left-[8%] z-10">
        <VillageFarmField isHealthy={isCropsHealthy} />
      </div>

      {/* 4. NORTH-CENTER ZONE: RUMAH SAINS & BALAI DESA */}
      {/* Rumah Sains Desa (Mini-Lab) */}
      <div className="absolute top-[8%] left-[32%] z-10">
        <ScienceHouseBuilding isGlow={currentStage === 2} />
        {currentStage === 2 && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <GlowingArrow label="Pintu Lab Sains" />
          </div>
        )}
      </div>

      {/* Balai Desa Makmur */}
      <div className="absolute top-[32%] left-[44%] z-10">
        <VillageHallBuilding />
      </div>

      {/* 5. EAST ZONE: LAPANGAN SEPAK BOLA DESA */}
      <div className="absolute top-[20%] right-[6%] z-10">
        <VillageFootballField />
        {currentStage === 3 && (
          <div className="absolute -top-7 left-1/2 -translate-x-1/2">
            <GlowingArrow label="Temui Rian" />
          </div>
        )}
      </div>

      {/* 6. SOUTH ZONE: MESIN POMPA AIR & DERMAGA DI TEPI SUNGAI */}
      {/* Mesin Pompa Air di x: 40%, y: 72% */}
      <div className="absolute top-[68%] left-[38%] z-15">
        <WaterPumpStation
          isRunning={isCropsHealthy}
          isClogged={!isCropsHealthy}
        />
        {currentStage === 1 && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <GlowingArrow label="Amati Sungai" />
          </div>
        )}
      </div>

      {/* Dermaga Kayu di x: 20%, y: 76% */}
      <div className="absolute top-[75%] left-[20%] z-15">
        <RiverPier />
      </div>

      {/* Jembatan Desa di x: 56%, y: 80% */}
      <div className="absolute top-[81%] left-[56%] z-20 h-16">
        <RiverBridge />
      </div>

      {/* 7. HORIZONTAL FLOWING RIVER (y: 83% - 93%) */}
      <div className="absolute top-[82%] left-0 right-0 h-[15%] z-10">
        <AnimatedRiver isPolluted={currentStage === 1 && !isCropsHealthy} />
      </div>

      {/* 8. TRASH ITEMS ALONG RIVERBANK (Tahap 1) */}
      {currentStage === 1 &&
        remainingTrashes.map((trash) => (
          <div
            key={trash.id}
            style={{ left: `${trash.x}%`, top: `${trash.y}%` }}
            className="absolute z-15 -translate-x-1/2 -translate-y-1/2 animate-bounce-soft filter drop-shadow cursor-pointer"
            onClick={() => {
              setPlayerPos({ x: trash.x, y: trash.y - 2 });
            }}
          >
            <div className="w-8 h-8 rounded-full bg-amber-400/90 border-2 border-amber-800 flex items-center justify-center shadow-lg">
              <span className="text-sm">
                {trash.type === 'bottle' ? '🍾' : trash.type === 'can' ? '🥫' : '🛍️'}
              </span>
            </div>
            <span className="text-[7px] font-pixel text-amber-200 bg-slate-950/80 px-1 py-0.2 rounded border border-amber-600 block text-center whitespace-nowrap mt-0.5">
              [PUNGUT]
            </span>
          </div>
        ))}

      {/* 9. NPC KARAKTER DESA */}
      {/* NPC 1: Pak Bambang (Pemancing) di tepi sungai */}
      <div
        className="absolute z-15 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
        style={{ left: '26%', top: '76%' }}
        onClick={onInteractPemancing}
      >
        <CharacterSprite id="nelayan" size={42} direction="down" />
        <span className="text-[7px] font-pixel text-sky-200 bg-slate-950/85 px-1.5 py-0.5 rounded border border-sky-400 mt-0.5 shadow">
          Pak Bambang (Pemancing)
        </span>
      </div>

      {/* NPC 2: Pak Harun (Kepala Desa) di Balai Desa */}
      <div
        className="absolute z-15 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
        style={{ left: '52%', top: '48%' }}
        onClick={onInteractKades}
      >
        <CharacterSprite id="ketua" size={44} direction="down" />
        <span className="text-[7px] font-pixel text-amber-200 bg-slate-950/85 px-1.5 py-0.5 rounded border border-amber-400 mt-0.5 shadow">
          Pak Harun (Kepala Desa)
        </span>
      </div>

      {/* NPC 3: Rian (Pemain Bola) di Lapangan Desa (Stage 3) */}
      <div
        className="absolute z-15 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer"
        style={{ left: '78%', top: '44%' }}
        onClick={onInteractRian}
      >
        <div className="relative">
          <CharacterSprite id="rayyan" size={42} direction="down" />
          {currentStage === 3 && (
            <div className="absolute -top-3 -right-2 text-xs animate-bounce">
              💨
            </div>
          )}
        </div>
        <span className="text-[7px] font-pixel text-emerald-200 bg-slate-950/85 px-1.5 py-0.5 rounded border border-emerald-400 mt-0.5 shadow">
          Rian (Pemain Bola)
        </span>
      </div>

      {/* 10. PLAYER SPRITE */}
      <div
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%` }}
        className="absolute z-25 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 flex flex-col items-center pointer-events-none"
      >
        {/* Name tag */}
        <div className="bg-sky-950/90 border border-sky-400 text-sky-200 text-[8px] font-pixel px-1.5 py-0.2 rounded-full mb-0.5 shadow-sm whitespace-nowrap">
          {playerName}
        </div>

        {/* Character Sprite with shadow */}
        <div className="filter drop-shadow-md">
          <CharacterSprite
            id={avatarId}
            size={48}
            direction={direction}
            isMoving={isMoving}
          />
        </div>
      </div>

      {/* 11. ACTIVE INTERACTION PROMPT BAR (TOP/CENTER OF GAME SCREEN) */}
      {activePrompt && (
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-35 animate-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={activePrompt.action}
            className="btn-cartoon-amber text-slate-950 font-black text-xs sm:text-sm px-4 py-2 rounded-full flex items-center gap-2 border-2 border-amber-300 shadow-xl cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Hand className="w-4 h-4 stroke-[2.5]" />
            <span>{activePrompt.text}</span>
            <span className="text-[10px] bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full font-pixel hidden sm:inline">
              [SPASI]
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
