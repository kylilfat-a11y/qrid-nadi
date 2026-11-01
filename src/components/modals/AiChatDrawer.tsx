import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';

interface AiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
  merchantName?: string;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AiChatDrawer: React.FC<AiChatDrawerProps> = ({
  isOpen,
  onClose,
  storeName = 'Warung Sari Rasa',
  merchantName = 'Budi',
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `Halo ${merchantName}! Saya asisten AI Bisnis QRIS NADI untuk ${storeName}. Apa yang ingin Anda diskusikan hari ini seputar penjualan, efisiensi modal, atau strategi promosi akhir pekan?`,
      time: '10:30',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Bagaimana cara menaikkan omzet akhir pekan?',
    'Apakah perlu naikkan harga Nasi Ayam?',
    'Cara mengurangi biaya bahan baku ayam',
    'Ide promo minuman yang hemat biaya',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal.trim();
    if (!text) return;

    const userMsg: Message = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // AI intelligent answer generation tailored to Indonesian UMKM
    setTimeout(() => {
      let responseText = '';
      const lower = text.toLowerCase();

      if (lower.includes('omzet') || lower.includes('akhir pekan') || lower.includes('weekend')) {
        responseText = `Berdasarkan data Oktober 2026, penjualan di hari Sabtu & Minggu melonjak rata-rata 35%-40%. Rekomendasi konkret:\n1. Siapkan stok Nasi Ayam 40% lebih banyak mulai Jumat sore.\n2. Buat paket bundling: 'Nasi Ayam + Es Teh Manis' seharga Rp 32.000 (diskon Rp 4.000) untuk mempercepat perputaran meja.\n3. Tampilkan QRIS stand di meja depan agar antrean pembayaran cepat.`;
      } else if (lower.includes('harga') || lower.includes('nasi ayam')) {
        responseText = `Melihat margin keuntungan Anda saat ini 37,5% dan Nasi Ayam menyumbang 32% omzet (412 transaksi), kami menyarankan untuk TIDAK menaikkan harga dasar secara langsung agar pelanggan setia tidak kaget. Sebagai gantinya, buat versi 'Nasi Ayam Jumbo + Ekstra Sambal' dengan harga Rp 32.000 untuk meningkatkan basket size rata-rata.`;
      } else if (lower.includes('bahan baku') || lower.includes('ayam') || lower.includes('biaya')) {
        responseText = `Biaya bahan baku Anda saat ini berada di 54% dari total pengeluaran (Rp 4.212.000). Untuk menurunkannya:\n• Konsolidasikan pembelian daging ayam langsung ke agen/RPU per 3 hari untuk mendapatkan potongan harga partai Rp 2.000/kg.\n• Porsi fillet bisa distandarisasi menggunakan timbangan digital 120gr per porsi agar tidak terjadi food waste.`;
      } else if (lower.includes('promo') || lower.includes('minuman')) {
        responseText = `Rekomendasi promo digital: Promo 'Buy 2 Get 1' untuk Es Teh Manis setiap Jumat siang. Biaya modal 1 gelas es teh hanya ~Rp 2.000, sehingga laba kotor Anda tetap terjaga tinggi (+75%), sementara jumlah transaksi akan meningkat pesat melalui word-of-mouth!`;
      } else {
        responseText = `Analisis AI QRIS NADI untuk ${storeName}: Performa penjualan Anda di bulan Oktober 2026 sangat sehat dengan estimasi laba bersih Rp 4.680.000 (tumbuh 18%). Fokus utama saat ini adalah antisipasi puncak penjualan Sabtu 17 Oktober 2026 dan menjaga ketersediaan bahan baku ayam segar.`;
      }

      const aiMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md h-[90vh] max-h-[680px] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 bg-[#108981] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm">Konsultan AI Bisnis</h3>
                <span className="px-1.5 py-0.2 rounded bg-white/20 text-[10px] font-semibold">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-white/80">
                Analisis data transaksi & rekomendasi cerdas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-7 h-7 rounded-full bg-[#D1FAE5] text-[#108981] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 shadow-xs ${
                    isAi
                      ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-xs'
                      : 'bg-[#108981] text-white rounded-tr-xs'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  <span
                    className={`block text-[10px] text-right mt-1.5 ${
                      isAi ? 'text-slate-400' : 'text-white/70'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
                {!isAi && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-slate-400 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#D1FAE5] text-[#108981] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-100 py-2 px-3 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 bg-[#108981] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#108981] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#108981] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200/60 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] whitespace-nowrap bg-white text-slate-700 border border-slate-200/80 hover:border-[#108981] hover:text-[#108981] px-2.5 py-1 rounded-full shrink-0 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan analisis usaha atau rekomendasi promo..."
            className="flex-1 bg-slate-100 text-xs text-slate-900 rounded-xl px-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#108981]/30 border border-transparent focus:border-[#108981]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim() || isTyping}
            className="w-9 h-9 rounded-xl bg-[#108981] text-white flex items-center justify-center hover:bg-[#0e746d] disabled:opacity-50 transition-all shrink-0 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
