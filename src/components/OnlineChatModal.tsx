import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { sound } from '../utils/audio';
import {
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Users,
  X,
  Volume2,
  CheckCircle2,
} from 'lucide-react';

interface OnlineChatModalProps {
  playerName: string;
  isOpen: boolean;
  onClose: () => void;
  unreadCount: number;
  onClearUnread: () => void;
}

const DEFAULT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'Bu Ratna',
    role: 'teacher',
    text: 'Halo para peneliti cilik Desa Makmur! 👋 Selamat datang di forum diskusi IPAS Fase C. Silakan tuliskan atau rekam hasil analisis observasimu di sini ya!',
    time: '10:00',
  },
  {
    id: 'm2',
    sender: 'Budi Santoso',
    role: 'classmate',
    text: 'Tadi aku cek kebun timur, kasihan tanamannya layu karena mesin pompa air tersumbat sampah plastik di sungai!',
    time: '10:02',
  },
  {
    id: 'm3',
    sender: 'Siti Rahma',
    role: 'classmate',
    text: 'Saat simulasi teko di rumah, uap air yang bertemu batu es langsung mengembun jadi tetesan air hujan! Keren banget! 💧',
    time: '10:05',
  },
];

const QUICK_OBSERVATIONS = [
  '🌱 Pompa air tersumbat sampah membuat tanaman layu kekeringan!',
  '💧 Uap air panas mengembun (kondensasi) saat terkena dinginnya batu es!',
  '🫁 Berlari membuat frekuensi napas lebih cepat karena otot butuh oksigen!',
  '🌿 Sungai bersih mengairi tanaman, tanaman menghasilkan oksigen untuk bernapas!',
];

export const OnlineChatModal: React.FC<OnlineChatModalProps> = ({
  playerName,
  isOpen,
  onClose,
  onClearUnread,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('edu_venture_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_MESSAGES;
  });

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Setup BroadcastChannel for real-time multiplayer across tabs
  useEffect(() => {
    try {
      const channel = new BroadcastChannel('edu_venture_online_chat');
      channelRef.current = channel;

      channel.onmessage = (event) => {
        if (event.data?.type === 'NEW_CHAT_MESSAGE' && event.data.message) {
          setMessages((prev) => {
            const next = [...prev, event.data.message];
            try {
              localStorage.setItem('edu_venture_chat_history', JSON.stringify(next));
            } catch {}
            return next;
          });
        }
      };

      return () => {
        channel.close();
      };
    } catch {
      // Ignore if BroadcastChannel not supported in browser
    }
  }, []);

  // Clear unread when opened
  useEffect(() => {
    if (isOpen) {
      onClearUnread();
    }
  }, [isOpen, onClearUnread]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle voice recording simulation timer
  useEffect(() => {
    let timer: number | null = null;
    if (isRecording) {
      timer = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);

  const sendMessage = (text: string, isOral: boolean = false) => {
    if (!text.trim()) return;

    sound.playTone(600, 'triangle', 0.05, 0.15);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: playerName,
      role: 'player',
      text: isOral ? `🎙️ [Catatan Lisan ${recordingSeconds}s]: "${text}"` : text,
      time: timeStr,
    };

    const nextList = [...messages, newMsg];
    setMessages(nextList);
    try {
      localStorage.setItem('edu_venture_chat_history', JSON.stringify(nextList));
      channelRef.current?.postMessage({
        type: 'NEW_CHAT_MESSAGE',
        message: newMsg,
      });
    } catch {}

    setInputText('');
    setIsRecording(false);

    // Realistic automated reply from Bu Ratna / Classmate to foster collaborative learning
    setTimeout(() => {
      sound.playTone(720, 'sine', 0.08, 0.2);
      const replyMsg: ChatMessage = {
        id: `reply_${Date.now()}`,
        sender: 'Bu Ratna',
        role: 'teacher',
        text: `Bagus sekali analisis dari ${playerName}! 👍 Observasi tersebut membuktikan bahwa konsep IPAS sangat erat dengan kehidupan sehari-hari kita di alam.`,
        time: timeStr,
      };
      setMessages((curr) => {
        const updated = [...curr, replyMsg];
        try {
          localStorage.setItem('edu_venture_chat_history', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }, 1800);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    sendMessage(inputText);
  };

  const handleToggleVoice = () => {
    if (!isRecording) {
      sound.playTone(550, 'sine', 0.08, 0.15);
      setIsRecording(true);
    } else {
      sound.playTone(450, 'sine', 0.08, 0.15);
      setIsRecording(false);
      // Submit voice note
      const oralText =
        inputText.trim() || 'Saya mengamati proses siklus air dan pentingnya oksigen bagi pernapasan kita!';
      sendMessage(oralText, true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm z-50 flex items-center justify-end p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white/98 border-4 border-sky-400 rounded-3xl w-full max-w-md h-[92vh] max-h-[680px] shadow-2xl flex flex-col overflow-hidden relative animate-in slide-in-from-right-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white p-3.5 flex items-center justify-between shadow-md flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-white/20 border border-white/40 flex items-center justify-center text-lg shadow-inner">
              💬
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm leading-tight">Diskusi IPAS Online</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-[10px] text-sky-100 font-bold flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Edu-Venture • Teman Sekelas Aktif</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-sky-50 border-b border-sky-200 px-3 py-1.5 text-[11px] text-sky-800 font-bold flex items-center justify-between">
          <span>Komunikasikan hasil analisis secara lisan / tulisan:</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black">
            LKM Online
          </span>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-50/50">
          {messages.map((msg) => {
            const isMe = msg.role === 'player';
            const isTeacher = msg.role === 'teacher';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} text-xs`}
              >
                <div className="flex items-center gap-1.5 mb-0.5 px-1">
                  <span className="font-extrabold text-[11px] text-slate-700">
                    {msg.sender}
                  </span>
                  {isTeacher && (
                    <span className="text-[9px] font-black bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded-full border border-amber-300">
                      Guru
                    </span>
                  )}
                  {isMe && (
                    <span className="text-[9px] font-black bg-sky-200 text-sky-900 px-1.5 py-0.2 rounded-full">
                      Saya
                    </span>
                  )}
                  <span className="text-[9px] text-slate-400 font-medium">
                    {msg.time}
                  </span>
                </div>

                <div
                  className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed font-semibold shadow-sm ${
                    isMe
                      ? 'bg-sky-500 text-white rounded-br-xs'
                      : isTeacher
                      ? 'bg-amber-50 border border-amber-300 text-slate-900 rounded-bl-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Observation Chips */}
        <div className="p-2 bg-white border-t border-slate-200 flex-shrink-0">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Pilihan Cepat Analisis Observasi:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_OBSERVATIONS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendMessage(chip)}
                className="whitespace-nowrap text-[10px] font-bold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-full transition-all cursor-pointer flex-shrink-0 shadow-2xs"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form & Voice Option */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 flex flex-col gap-1.5 flex-shrink-0">
          {isRecording && (
            <div className="bg-red-50 border border-red-300 rounded-xl p-1.5 text-center text-xs font-bold text-red-700 flex items-center justify-center gap-2 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span>Merekam Lisan ({recordingSeconds}s)... Klik mikrofon lagi untuk kirim!</span>
            </div>
          )}

          <form onSubmit={handleSend} className="flex items-center gap-1.5">
            {/* Voice Observation Toggle */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center ${
                isRecording
                  ? 'bg-red-500 border-red-600 text-white animate-bounce'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-sky-400'
              }`}
              title="Komunikasi Lisan (Rekam Suara)"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-sky-600" />}
            </button>

            {/* Written Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ketik analisis / observasi kamu..."
              className="flex-1 bg-white border-2 border-slate-300 focus:border-sky-500 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-semibold outline-none transition-colors"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2 rounded-xl text-white transition-all ${
                inputText.trim()
                  ? 'btn-cartoon-blue cursor-pointer active:scale-95'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
