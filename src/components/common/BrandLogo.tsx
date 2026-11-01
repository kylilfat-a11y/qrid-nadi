import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-black tracking-tight',
    lg: 'text-2xl font-black tracking-tight',
    xl: 'text-3xl font-black tracking-tight',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon: Leaf with upward trending bar chart */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-[#108981] to-[#0d716a] text-white shadow-md shadow-[#108981]/20 p-2`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Sprout leaf */}
          <path
            d="M8 20C8 13.3726 13.3726 8 20 8C20 14.6274 14.6274 20 8 20Z"
            fill="#D1FAE5"
            fillOpacity="0.85"
          />
          {/* Growth chart bars */}
          <rect x="12" y="24" width="3.5" height="7" rx="1.5" fill="white" />
          <rect x="18" y="19" width="3.5" height="12" rx="1.5" fill="white" />
          <rect x="24" y="14" width="3.5" height="17" rx="1.5" fill="white" />
          {/* Upward trending line with arrowhead */}
          <path
            d="M13 22L19 16L25 11L31 7"
            stroke="#D1FAE5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27 7H31V11"
            stroke="#D1FAE5"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center leading-none">
          <span className={`${textSizes[size]} text-[#0F172A]`}>QRIS</span>
          <span className={`${textSizes[size]} text-[#108981] ml-1`}>NADI</span>
        </div>
        {showSubtitle && (
          <span className="text-[11px] text-[#64748B] font-medium tracking-tight mt-0.5">
            Kecerdasan Bisnis UMKM
          </span>
        )}
      </div>
    </div>
  );
};
