import React, { useState } from 'react';
import { QuizData } from '../types';
import { sound } from '../utils/audio';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface QuizModalProps {
  quiz: QuizData;
  onSuccess: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ quiz, onSuccess }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (optionId: string) => {
    if (hasSubmitted && isCorrect) return;
    setSelectedOptionId(optionId);
    sound.playTone(480, 'sine', 0.05, 0.1);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;

    const chosen = quiz.options.find((o) => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      setIsCorrect(true);
      setHasSubmitted(true);
      sound.playCorrect();
    } else {
      setIsCorrect(false);
      setHasSubmitted(true);
      sound.playWrong();
    }
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setIsCorrect(false);
  };

  const optionLetterBg = [
    'bg-sky-500 text-white',
    'bg-emerald-500 text-white',
    'bg-amber-500 text-white',
    'bg-purple-500 text-white',
  ];

  return (
    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
      <div className="bg-white/98 border-4 border-sky-400 rounded-3xl max-w-lg w-full p-4 sm:p-5 shadow-2xl relative my-auto animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header topic */}
        <div className="flex items-center justify-between mb-2.5 border-b-2 border-sky-100 pb-2.5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-2xl bg-sky-100 border-2 border-sky-300 text-sky-600 flex items-center justify-center flex-shrink-0 shadow-inner">
              <HelpCircle className="w-5 h-5 stroke-[2.5]" />
            </span>
            <div>
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-wider block">
                {quiz.topic}
              </span>
              <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                {quiz.title}
              </h3>
            </div>
          </div>
          <span className="text-[11px] bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300 font-bold">
            Tantangan IPAS ⭐
          </span>
        </div>

        {/* Scrollable Questions & Options Body */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-2.5 mb-3">
          {/* Question text */}
          <p className="text-slate-800 text-xs sm:text-sm font-bold leading-relaxed bg-sky-50/90 p-3 rounded-2xl border-2 border-sky-200">
            {quiz.question}
          </p>

          {/* Options list */}
          <div className="space-y-2">
            {quiz.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              let optionContainerStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-xs';

              if (isSelected) {
                optionContainerStyle = 'bg-sky-50 border-sky-500 text-sky-950 shadow-md ring-2 ring-sky-300';
              }

              if (hasSubmitted) {
                if (option.isCorrect) {
                  optionContainerStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300';
                } else if (isSelected && !option.isCorrect) {
                  optionContainerStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200';
                }
              }

              const letter = String.fromCharCode(65 + idx);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  disabled={hasSubmitted && isCorrect}
                  className={`w-full text-left p-2.5 rounded-xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm cursor-pointer active:scale-98 ${optionContainerStyle}`}
                >
                  <div className="flex items-center gap-2 pr-2">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs flex-shrink-0 ${optionLetterBg[idx % 4]}`}>
                      {letter}
                    </span>
                    <span className="font-semibold">{option.text}</span>
                  </div>
                  {hasSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                  {hasSubmitted && isSelected && !option.isCorrect && (
                    <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback / Educational explanation */}
          {hasSubmitted && (
            <div
              className={`p-3 rounded-xl border-2 text-xs animate-in fade-in duration-150 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-1.5 font-black text-xs mb-1">
                {isCorrect ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Luar Biasa! Jawabanmu Benar! 🎉</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    <span>Jawaban Kurang Tepat. Yuk Coba Lagi! 💪</span>
                  </>
                )}
              </div>
              <p className="leading-relaxed font-medium">
                {quiz.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="flex justify-end gap-2 flex-shrink-0 pt-1 border-t border-slate-100">
          {!hasSubmitted ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedOptionId}
              className={`px-5 py-2 rounded-full font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                selectedOptionId
                  ? 'btn-cartoon-blue text-white cursor-pointer active:scale-95'
                  : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
              }`}
            >
              <span>Kirim Jawaban</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          ) : isCorrect ? (
            <button
              type="button"
              onClick={onSuccess}
              className="btn-cartoon-emerald px-5 py-2 rounded-full text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
            >
              <span>Lanjut Petualangan!</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRetry}
              className="btn-cartoon-amber px-5 py-2 rounded-full text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[3]" />
              <span>Coba Lagi</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
