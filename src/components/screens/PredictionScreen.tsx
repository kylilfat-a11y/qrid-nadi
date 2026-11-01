import React, { useState } from 'react';
import { HeaderBar } from '../common/HeaderBar';
import { ArrowUpRight, AlertCircle, Sparkles } from 'lucide-react';
import { predictionWeekDays, stockRecommendations } from '../../data/mockData';
import { StockRecommendation } from '../../types';

interface PredictionScreenProps {
  onBack: () => void;
  onOpenRestockModal: (item: StockRecommendation) => void;
}

export const PredictionScreen: React.FC<PredictionScreenProps> = ({
  onBack,
  onOpenRestockModal,
}) => {
  const [activeTab, setActiveTab] = useState<'Penjualan' | 'Stok'>('Penjualan');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(5); // Default to Saturday peak

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-50/50 overflow-y-auto select-none">
      <div className="pb-6">
        <HeaderBar
          title="Prediksi Penjualan & Stok"
          showBack={true}
          onBack={onBack}
        />

        <div className="px-5 pt-3 space-y-4">
          {/* Toggle Tabs: Penjualan | Stok */}
          <div className="w-full p-1 bg-slate-200/70 rounded-2xl flex items-center">
            {(['Penjualan', 'Stok'] as const).map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-150 ${
                    active
                      ? 'bg-[#108981] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {activeTab === 'Penjualan' ? (
            <>
              {/* Prediksi Penjualan 7 Hari Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
                <div>
                  <span className="text-xs text-[#64748B] font-medium">
                    Prediksi Penjualan 7 Hari ke Depan
                  </span>
                  <h3 className="text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
                    Rp 14.320.000
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#108981] mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>15% dari minggu ini</span>
                  </div>
                </div>

                {/* Smooth Area Curve Chart with Peak Callout */}
                <div className="relative pt-6 pb-2">
                  {/* Floating Peak Callout Pill matching presentation */}
                  <div className="absolute top-0 right-12 z-10 bg-[#D1FAE5] text-[#108981] border border-[#108981]/30 rounded-xl px-2.5 py-1 text-[10px] font-bold shadow-xs flex items-center gap-1 animate-pulse">
                    <Sparkles className="w-3 h-3" />
                    <span>Puncak penjualan Sab, 17 Okt 2026</span>
                  </div>

                  <div className="w-full h-36 relative mt-4">
                    <svg
                      className="w-full h-full overflow-visible"
                      viewBox="0 0 320 120"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#108981" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#108981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path
                        d="M10,80 Q55,75 105,65 T210,50 T265,18 T310,45 L310,120 L10,120 Z"
                        fill="url(#predGrad)"
                      />

                      {/* Line Stroke */}
                      <path
                        d="M10,80 Q55,75 105,65 T210,50 T265,18 T310,45"
                        fill="none"
                        stroke="#108981"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Data Points */}
                      <circle cx="10" cy="80" r="3.5" fill="#108981" />
                      <circle cx="60" cy="73" r="3.5" fill="#108981" />
                      <circle cx="110" cy="65" r="3.5" fill="#108981" />
                      <circle cx="160" cy="57" r="3.5" fill="#108981" />
                      <circle cx="210" cy="48" r="3.5" fill="#108981" />
                      {/* Saturday Peak Dot */}
                      <circle
                        cx="265"
                        cy="18"
                        r="6"
                        fill="#108981"
                        stroke="#FFFFFF"
                        strokeWidth="3"
                        className="animate-ping opacity-75"
                      />
                      <circle
                        cx="265"
                        cy="18"
                        r="5"
                        fill="#108981"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                      />
                      <circle cx="310" cy="45" r="3.5" fill="#108981" />
                    </svg>
                  </div>

                  {/* Day labels matching presentation */}
                  <div className="flex justify-between items-center text-xs font-semibold text-[#64748B] pt-2 px-1">
                    {predictionWeekDays.map((d, index) => (
                      <button
                        key={d.day}
                        onClick={() => setSelectedDayIndex(index)}
                        className={`py-1 px-1.5 rounded-lg transition-colors ${
                          selectedDayIndex === index
                            ? 'bg-[#108981] text-white'
                            : 'hover:text-[#0F172A]'
                        }`}
                      >
                        {d.day}
                      </button>
                    ))}
                  </div>

                  {/* Day preview box */}
                  <div className="mt-3 p-2.5 bg-[#D1FAE5]/30 rounded-xl flex items-center justify-between text-xs text-slate-800">
                    <span className="text-[11px]">
                      Estimasi {predictionWeekDays[selectedDayIndex].day} (
                      {predictionWeekDays[selectedDayIndex].label}):
                    </span>
                    <span className="font-bold text-[#108981]">
                      Rp{' '}
                      {predictionWeekDays[
                        selectedDayIndex
                      ].value.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rekomendasi Stok Section */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#0F172A]">
                    Rekomendasi Stok
                  </h4>
                  <span className="text-xs text-[#64748B]">Berdasarkan AI</span>
                </div>

                <div className="space-y-3">
                  {stockRecommendations.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg shrink-0">
                          🍗
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#0F172A]">
                            {item.name.split(' (')[0]}
                          </h5>
                          <p className="text-[10px] text-red-600 font-medium">
                            Stok saat ini: {item.currentStock} {item.unit}
                          </p>
                          <p className="text-[11px] font-semibold text-[#108981] mt-0.5">
                            {item.reason.split(' (')[0]}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenRestockModal(item)}
                        className="px-3 py-1.5 rounded-full border border-[#108981] text-[#108981] hover:bg-[#108981] hover:text-white text-xs font-bold shrink-0 transition-all active:scale-95"
                      >
                        Lihat detail
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Stok Inventory Tab */
            <div className="space-y-3">
              <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                <h4 className="text-sm font-bold text-[#0F172A] mb-3">
                  Status Gudang & Bahan Baku
                </h4>
                <div className="space-y-3.5">
                  {stockRecommendations.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs font-bold text-[#0F172A]">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-[#64748B]">
                            Supplier: {item.supplier}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.urgency === 'Tinggi'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.urgency === 'Tinggi' ? 'Kritis' : 'Waspada'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600">
                          Sisa: {item.currentStock} {item.unit}
                        </span>
                        <button
                          onClick={() => onOpenRestockModal(item)}
                          className="px-3 py-1 rounded-lg bg-[#108981] text-white text-[11px] font-bold hover:bg-[#0e746d]"
                        >
                          Pesan {item.recommendedOrder} {item.unit}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
