import React from 'react';
import { X, CheckCircle2, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisor?: () => void;
  onOpenTransactions?: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAdvisor,
  onOpenTransactions,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      type: 'payment',
      title: 'Pembayaran QRIS Diterima',
      desc: 'Rp 28.000 dari Ananda Putri untuk pesanan Nasi Ayam Spesial.',
      time: '10:24 WIB (Hari Ini)',
      icon: CheckCircle2,
      color: 'bg-[#D1FAE5] text-[#108981]',
      action: onOpenTransactions,
    },
    {
      id: 'n2',
      type: 'alert',
      title: 'Peringatan Stok Menipis',
      desc: 'Stok daging ayam sisa 8 porsi. Prediksi akhir pekan melonjak 40%.',
      time: '08:30 WIB (Hari Ini)',
      icon: AlertTriangle,
      color: 'bg-amber-100 text-amber-700',
      action: onOpenAdvisor,
    },
    {
      id: 'n3',
      type: 'insight',
      title: 'Puncak Penjualan Terdeteksi',
      desc: 'Penjualan hari Sabtu 17 Okt 2026 diproyeksikan menembus Rp 2.750.000.',
      time: 'Kemarin, 15 Okt 2026',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-700',
      action: onOpenAdvisor,
    },
    {
      id: 'n4',
      type: 'ai',
      title: 'Rekomendasi Promo AI Baru',
      desc: 'Manfaatkan promo Buy 2 Get 1 Es Teh untuk maksimalkan laba minuman.',
      time: '14 Okt 2026',
      icon: Sparkles,
      color: 'bg-purple-100 text-purple-700',
      action: onOpenAdvisor,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#0F172A]">Notifikasi Usaha</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#108981] text-white text-[10px] font-bold">
              4 Baru
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[420px] overflow-y-auto text-xs">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.action) {
                    item.action();
                    onClose();
                  }
                }}
                className="p-3 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 shadow-xs"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-900 truncate">{item.title}</p>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#108981] hover:underline"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
