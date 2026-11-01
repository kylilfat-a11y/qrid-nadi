import React from 'react';
import { StatusBar } from '../common/HeaderBar';
import { BrandLogo } from '../common/BrandLogo';
import { ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
  onGoToDashboard: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onContinue,
  onGoToDashboard,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-white overflow-hidden select-none">
      {/* Top status bar */}
      <StatusBar />

      {/* Brand & Slogan Header */}
      <div className="pt-4 pb-2 px-6 flex flex-col items-center text-center z-10">
        <BrandLogo size="lg" className="justify-center mb-3" />
        <p className="text-sm font-semibold text-[#0F172A] tracking-tight">
          Data Hari Ini, Keputusan Lebih Baik
        </p>
      </div>

      {/* Main Illustration Area */}
      <div className="relative flex-1 flex items-center justify-center px-4 overflow-hidden my-2">
        {/* Soft background glow circles */}
        <div className="absolute w-72 h-72 rounded-full bg-[#D1FAE5]/60 blur-2xl -z-1" />
        
        <div className="relative w-full max-w-[320px] aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white/80">
          <img
            src="/src/assets/images/qris_merchant_banner_1793528273691.jpg"
            alt="Pedagang UMKM QRIS NADI"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="relative z-10 pb-8 px-6 pt-3 flex flex-col items-center text-center">
        {/* Decorative curved shape background */}
        <div className="w-full bg-[#108981]/5 rounded-2xl p-4 border border-[#108981]/15 mb-4">
          <p className="text-xs font-semibold text-[#108981] leading-relaxed">
            Memperkuat UMKM,
            <br />
            Membangun Ekonomi Digital Indonesia
          </p>
        </div>

        <div className="w-full space-y-2">
          <button
            onClick={onContinue}
            className="w-full h-12 rounded-xl bg-[#108981] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#108981]/25 hover:bg-[#0e746d] active:scale-98 transition-all"
          >
            <span>Mulai Jelajahi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onGoToDashboard}
            className="text-xs font-medium text-[#64748B] hover:text-[#0F172A] py-1"
          >
            Langsung ke Dashboard Utama &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
