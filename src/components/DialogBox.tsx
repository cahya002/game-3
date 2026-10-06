import React, { useEffect, useState } from 'react';
import { CharacterSprite } from './PixelAvatars';
import { sound } from '../utils/audio';
import { ArrowRight } from 'lucide-react';

interface DialogBoxProps {
  speaker: string;
  role?: string;
  avatarId?: 'adam' | 'hawa' | 'rayyan' | 'maya' | 'kades' | 'pemancing' | 'rian' | 'guru' | 'ketua' | 'nelayan' | 'doktor';
  text: string;
  onNext: () => void;
  showNextArrow?: boolean;
}

export const DialogBox: React.FC<DialogBoxProps> = ({
  speaker,
  role,
  avatarId = 'kades',
  text,
  onNext,
  showNextArrow = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIdx = 0;
    setDisplayedText('');
    setIsTyping(true);

    const timer = setInterval(() => {
      if (currentIdx < text.length) {
        setDisplayedText(text.slice(0, currentIdx + 1));
        if (currentIdx % 3 === 0) {
          sound.playTone(460 + (currentIdx % 4) * 35, 'triangle', 0.04, 0.05);
        }
        currentIdx++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [text]);

  const handleClick = () => {
    if (isTyping) {
      setDisplayedText(text);
      setIsTyping(false);
    } else {
      sound.playTone(550, 'triangle', 0.06, 0.15);
      onNext();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTyping, text, onNext]);

  // Sprite mapping fallback
  const getMappedAvatarId = () => {
    if (avatarId === 'kades') return 'ketua';
    if (avatarId === 'pemancing') return 'nelayan';
    if (avatarId === 'rian') return 'rayyan';
    if (avatarId === 'guru') return 'doktor';
    return avatarId;
  };

  return (
    <div
      onClick={handleClick}
      className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-6 sm:right-6 md:left-16 md:right-16 z-40 cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-150 select-none"
    >
      <div className="bg-white/98 border-3 border-sky-400 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl backdrop-blur-md flex items-start gap-2.5 sm:gap-3.5 relative max-h-[35vh] sm:max-h-[30vh] overflow-hidden">
        {/* Avatar portrait frame */}
        <div className="flex-shrink-0 bg-sky-50 border-2 border-sky-300 rounded-xl sm:rounded-2xl p-1 flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 shadow-inner">
          <CharacterSprite id={getMappedAvatarId() as any} size={40} direction="down" />
        </div>

        {/* Text Area (Responsive & Scrollable if text is long) */}
        <div className="flex-1 min-w-0 pr-10 sm:pr-16 overflow-y-auto max-h-[28vh]">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
            <span className="text-xs sm:text-sm md:text-base text-slate-900 font-extrabold tracking-tight">
              {speaker}
            </span>
            {role && (
              <span className="text-[9px] sm:text-xs px-2 py-0.5 rounded-full border border-sky-300 bg-sky-50 text-sky-800 font-bold">
                {role}
              </span>
            )}
          </div>
          <p className="text-slate-800 text-xs sm:text-sm md:text-base leading-relaxed font-semibold">
            {displayedText}
          </p>
        </div>

        {/* Continuation prompt */}
        {showNextArrow && (
          <div className="absolute bottom-2.5 right-2.5 sm:right-3 flex items-center">
            <button
              type="button"
              className="btn-cartoon-amber text-slate-950 font-black text-[10px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1 shadow-md active:scale-95"
            >
              <span>{isTyping ? 'Lewati' : 'Lanjut'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
