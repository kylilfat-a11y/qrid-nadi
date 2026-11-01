import React, { useState } from 'react';
import { StatusBar } from '../common/HeaderBar';
import { QrCode, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

interface OnboardingScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onNext,
  onSkip,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const features = [
    {
      icon: QrCode,
      title: 'Pantau transaksi QRIS dalam satu tempat',
      desc: 'Semua pembayaran dari berbagai e-wallet dan mobile banking tercatat otomatis dan real-time tanpa repot rekap manual.',
    },
    {
      icon: TrendingUp,
      title: 'Dapatkan analisis & prediksi berbasis AI',
      desc: 'Ketahui tren penjualan harian, menu terlaris, dan prediksi lonjakan pembeli di akhir pekan Oktober 2026.',
    },
    {
      icon: Sparkles,
      title: 'Terima rekomendasi bisnis sesuai kebutuhan usaha Anda',
      desc: 'Konsultasi otomatis strategi promo, kontrol biaya bahan baku, dan pengingat stok agar tidak kehabisan saat ramai.',
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-white overflow-y-auto select-none p-5 pt-0">
      {/* Top Header */}
      <div>
        <StatusBar />
        <div className="flex items-center justify-between pt-2 pb-4">
          <span className="text-xs font-bold text-[#108981] tracking-wide">
            QRIS NADI ONBOARDING
          </span>
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] py-1 px-2 rounded-lg hover:bg-slate-100"
          >
            Lewati
          </button>
        </div>

        {/* Title */}
        <div className="space-y-2 mt-2">
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">
            Selamat Datang di
            <br />
            <span className="text-[#108981]">QRIS NADI</span>
          </h2>
          <p className="text-xs text-[#64748B] leading-relaxed">
            Solusi cerdas untuk mengelola usaha Anda lebih mudah, efisien, dan
            menguntungkan.
          </p>
        </div>

        {/* 3 Key Feature Cards matching the presentation */}
        <div className="space-y-3.5 mt-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeSlide === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'border-[#108981] bg-[#D1FAE5]/25 shadow-xs'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#108981] text-white shadow-md shadow-[#108981]/20'
                      : 'bg-emerald-50 text-[#108981]'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#0F172A] leading-snug">
                    {item.title}
                  </h4>
                  {isSelected && (
                    <p className="text-[11px] text-[#64748B] mt-1 leading-relaxed animate-in fade-in duration-150">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="pt-6 pb-4 space-y-5">
        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-200 ${
                activeSlide === i ? 'w-6 bg-[#108981]' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Mulai Button */}
        <button
          onClick={onNext}
          className="w-full h-12 rounded-xl bg-[#108981] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#108981]/25 hover:bg-[#0e746d] active:scale-98 transition-all"
        >
          <span>Mulai</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
