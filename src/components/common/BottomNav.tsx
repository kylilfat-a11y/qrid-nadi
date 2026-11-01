import React from 'react';
import {
  Home,
  ReceiptText,
  BarChart3,
  FileText,
  User,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
}) => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Beranda',
      icon: Home,
      screen: 'dashboard' as ScreenType,
    },
    {
      id: 'riwayat',
      label: 'Transaksi',
      icon: ReceiptText,
      screen: 'riwayat' as ScreenType,
    },
    {
      id: 'analisis',
      label: 'Analisis',
      icon: BarChart3,
      screen: 'analisis' as ScreenType,
    },
    {
      id: 'laporan',
      label: 'Laporan',
      icon: FileText,
      screen: 'laporan' as ScreenType,
    },
    {
      id: 'akun',
      label: 'Akun',
      icon: User,
      screen: 'akun' as ScreenType,
    },
  ];

  // Helper to determine which tab is highlighted
  const isTabActive = (tabScreen: ScreenType) => {
    if (currentScreen === tabScreen) return true;
    if (
      tabScreen === 'analisis' &&
      (currentScreen === 'prediksi' ||
        currentScreen === 'keuangan' ||
        currentScreen === 'advisor')
    ) {
      return true;
    }
    return false;
  };

  return (
    <nav
      aria-label="Navigasi Utama"
      className="sticky bottom-0 w-full bg-white border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] px-3 py-2 z-30 shrink-0"
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const active = isTabActive(tab.screen);
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.screen)}
              className={`flex flex-col items-center justify-center py-1 transition-all duration-150 group relative min-h-[46px] ${
                active ? 'text-[#108981]' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div
                className={`p-1 rounded-xl transition-transform ${
                  active ? 'scale-105 bg-[#D1FAE5]/50' : 'group-hover:scale-105'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    active ? 'stroke-[2.5] text-[#108981]' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 ${
                  active ? 'font-bold text-[#108981]' : 'text-[#64748B]'
                }`}
              >
                {tab.label}
              </span>
              {active && (
                <span className="w-1.5 h-1.5 bg-[#108981] rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
