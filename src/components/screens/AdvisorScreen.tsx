import React from 'react';
import { HeaderBar } from '../common/HeaderBar';
import {
  TrendingUp,
  Target,
  Sparkles,
  ChevronRight,
  Bot,
  Clock,
} from 'lucide-react';
import { MerchantProfile } from '../../types';

interface AdvisorScreenProps {
  merchant: MerchantProfile;
  onBack: () => void;
  onAskMore: () => void;
  onNavigateToStock?: () => void;
}

export const AdvisorScreen: React.FC<AdvisorScreenProps> = ({
  merchant,
  onBack,
  onAskMore,
  onNavigateToStock,
}) => {
  const recommendations = [
    {
      id: 'rec-1',
      title: 'Tingkatkan stok Nasi Ayam',
      desc: 'Jelang akhir pekan, permintaan Nasi Ayam diprediksi meningkat hingga 40%.',
      icon: TrendingUp,
      color: 'bg-emerald-50 text-[#108981]',
      action: onNavigateToStock,
    },
    {
      id: 'rec-2',
      title: 'Optimalkan biaya bahan baku',
      desc: 'Harga ayam naik 8% minggu ini. Pertimbangkan pembelian dalam jumlah besar untuk dapat diskon.',
      icon: Target,
      color: 'bg-teal-50 text-teal-600',
      action: onAskMore,
    },
    {
      id: 'rec-3',
      title: 'Manfaatkan promo digital',
      desc: "Coba tawarkan promo 'Buy 2 Get 1' untuk minuman setiap Jumat-Minggu.",
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-600',
      action: onAskMore,
    },
    {
      id: 'rec-4',
      title: 'Jam Buka Puncak Makan Siang',
      desc: 'Pukul 11:30 - 13:30 menghasilkan 62% transaksi QRIS. Siapkan kasir & meja saji lebih awal.',
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
      action: onAskMore,
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-50/50 overflow-y-auto select-none">
      <div>
        <HeaderBar
          title="AI Business Advisor"
          showBack={true}
          onBack={onBack}
        />

        <div className="px-5 pt-3 space-y-4">
          {/* AI Greeting Card matching the presentation */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] text-[#108981] flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-[#0F172A]">
                Halo, {merchant.name.split(' ')[0]}! 👋
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Berdasarkan data transaksi dan stok usaha Anda, berikut beberapa
                rekomendasi untuk meningkatkan profitabilitas:
              </p>
            </div>
          </div>

          {/* Recommendation Action Cards matching the presentation */}
          <div className="space-y-3">
            {recommendations.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action && item.action()}
                  className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.color} group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A] group-hover:text-[#108981] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#108981] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Sticky CTA matching presentation */}
      <div className="p-5 pt-3 pb-6">
        <button
          onClick={onAskMore}
          className="w-full h-12 rounded-2xl bg-[#108981] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#108981]/20 hover:bg-[#0e746d] active:scale-98 transition-all"
        >
          <span>Tanya lebih lanjut</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
