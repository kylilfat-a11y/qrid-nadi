import React from 'react';
import { ChevronLeft, Wifi, Battery, Signal } from 'lucide-react';
import { ScreenType } from '../../types';

interface HeaderBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  currentScreen?: ScreenType;
}

export const StatusBar: React.FC<{ light?: boolean }> = ({ light = false }) => {
  return (
    <div
      className={`w-full px-7 pt-3 pb-1 flex items-center justify-between text-xs select-none ${
        light ? 'text-white' : 'text-slate-900'
      }`}
    >
      <span className="font-semibold text-[13px] tracking-tight">9:41</span>
      {/* Dynamic island subtle notch */}
      <div className="w-24 h-4 bg-black/10 rounded-full mx-auto hidden sm:block opacity-20" />
      <div className="flex items-center gap-1.5 opacity-90">
        <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
        <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
        <div className="flex items-center">
          <Battery className="w-4 h-4 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightAction,
  transparent = false,
}) => {
  return (
    <div
      className={`w-full z-20 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100'
      }`}
    >
      <StatusBar />
      {(title || showBack || rightAction) && (
        <div className="flex items-center justify-between px-5 py-3 min-h-[50px]">
          <div className="flex items-center gap-2">
            {showBack && (
              <button
                onClick={onBack}
                aria-label="Kembali"
                className="w-9 h-9 -ml-1.5 flex items-center justify-center rounded-full hover:bg-slate-100 active:bg-slate-200 text-slate-800 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
            )}
            {title && (
              <div>
                <h1 className="text-[17px] font-bold text-[#0F172A] leading-tight tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-[#64748B] mt-0.5">{subtitle}</p>
                )}
              </div>
            )}
          </div>

          {rightAction && (
            <div className="flex items-center gap-2">{rightAction}</div>
          )}
        </div>
      )}
    </div>
  );
};
