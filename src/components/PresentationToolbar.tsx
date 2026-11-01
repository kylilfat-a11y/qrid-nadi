import React from 'react';
import { ScreenType } from '../types';
import { Smartphone, Monitor, Layers } from 'lucide-react';
import { BrandLogo } from './common/BrandLogo';

interface PresentationToolbarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  isPhoneFrame: boolean;
  onToggleFrame: () => void;
}

export const PresentationToolbar: React.FC<PresentationToolbarProps> = ({
  currentScreen,
  onSelectScreen,
  isPhoneFrame,
  onToggleFrame,
}) => {
  const screensList: { id: ScreenType; num: number; label: string }[] = [
    { id: 'splash', num: 1, label: 'Splash Screen' },
    { id: 'onboarding', num: 2, label: 'Onboarding' },
    { id: 'login', num: 3, label: 'Login' },
    { id: 'register', num: 4, label: 'Registrasi UMKM' },
    { id: 'dashboard', num: 5, label: 'Dashboard Utama' },
    { id: 'analisis', num: 6, label: 'Analisis QRIS' },
    { id: 'prediksi', num: 7, label: 'Prediksi & Stok' },
    { id: 'keuangan', num: 8, label: 'Kesehatan Finansial' },
    { id: 'advisor', num: 9, label: 'AI Business Advisor' },
    { id: 'riwayat', num: 10, label: 'Riwayat Transaksi' },
    { id: 'laporan', num: 11, label: 'Laporan & Unduhan' },
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 select-none px-4 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" />
          <div className="hidden lg:block h-6 w-px bg-slate-200" />
          <span className="hidden lg:inline text-xs font-semibold text-slate-600">
            Prototipe Interaktif (Oktober 2026)
          </span>
        </div>

        {/* 11 Screen Quick Jump Bar matching presentation numbering */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full py-1">
          {screensList.map((s) => {
            const active = currentScreen === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  active
                    ? 'bg-[#108981] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
                title={s.label}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Frame Toggle Button */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onToggleFrame}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-4 h-4 text-[#108981]" />
                <span>Mode Lebar</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-[#108981]" />
                <span>Frame HP</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
