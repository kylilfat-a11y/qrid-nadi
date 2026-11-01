import React from 'react';
import { StatusBar } from '../common/HeaderBar';
import {
  Bell,
  ArrowUpRight,
  Receipt,
  TrendingUp,
  Wallet,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { MerchantProfile, ScreenType } from '../../types';

interface DashboardScreenProps {
  merchant: MerchantProfile;
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  merchant,
  onNavigate,
  onOpenNotifications,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-50/50 overflow-y-auto select-none">
      <div className="p-5 pt-0 space-y-4">
        {/* Status Bar */}
        <StatusBar />

        {/* User Greeting & Notification */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#108981] to-[#14b8a6] text-white flex items-center justify-center font-bold text-base shadow-md shadow-[#108981]/20 border-2 border-white">
              🏪
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-extrabold text-[#0F172A] leading-tight">
                  Halo, {merchant.name.split(' ')[0]}!
                </h2>
                <span className="text-sm">👋</span>
              </div>
              <p className="text-xs text-[#64748B] font-medium">
                {merchant.storeName}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenNotifications}
            aria-label="Notifikasi"
            className="relative w-10 h-10 rounded-2xl bg-white border border-slate-200/80 hover:bg-slate-50 flex items-center justify-center text-slate-700 shadow-xs transition-colors"
          >
            <Bell className="w-5 h-5 stroke-[2]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
          </button>
        </div>

        {/* Total Transaksi (30 Hari) Green Card */}
        <div className="w-full rounded-3xl bg-gradient-to-br from-[#108981] to-[#0c6b65] text-white p-5 shadow-xl shadow-[#108981]/25 relative overflow-hidden">
          {/* Subtle decorative circles */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none blur-xl" />
          <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none blur-lg" />

          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-white/80 font-medium">
                  Total Transaksi (30 hari)
                </span>
                <h3 className="text-2xl font-black tracking-tight mt-1">
                  Rp 12.480.000
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#D1FAE5] mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>12% dari bulan lalu</span>
                </div>
              </div>

              {/* Detail Button */}
              <button
                onClick={() => onNavigate('analisis')}
                className="px-3.5 py-1.5 rounded-full bg-white text-[#108981] hover:bg-emerald-50 text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                Detail
              </button>
            </div>

            {/* Inner Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3.5 border-t border-white/20">
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 px-3">
                <span className="text-[10px] text-white/80 font-medium">
                  Jumlah Transaksi
                </span>
                <p className="text-base font-extrabold tracking-tight mt-0.5">
                  1.243
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-2.5 px-3">
                <span className="text-[10px] text-white/80 font-medium">
                  Rata-rata per Transaksi
                </span>
                <p className="text-base font-extrabold tracking-tight mt-0.5">
                  Rp 10.030
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Action Icons matching the presentation */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {/* Action 1: Transaksi */}
          <button
            onClick={() => onNavigate('riwayat')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-sm active:scale-95 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#108981] flex items-center justify-center group-hover:bg-[#108981] group-hover:text-white transition-colors">
              <Receipt className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[11px] font-bold text-[#0F172A] mt-2">
              Transaksi
            </span>
          </button>

          {/* Action 2: Prediksi */}
          <button
            onClick={() => onNavigate('prediksi')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-sm active:scale-95 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[11px] font-bold text-[#0F172A] mt-2">
              Prediksi
            </span>
          </button>

          {/* Action 3: Keuangan */}
          <button
            onClick={() => onNavigate('keuangan')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-sm active:scale-95 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Wallet className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[11px] font-bold text-[#0F172A] mt-2">
              Keuangan
            </span>
          </button>

          {/* Action 4: Rekomendasi */}
          <button
            onClick={() => onNavigate('advisor')}
            className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 shadow-xs hover:shadow-sm active:scale-95 transition-all group"
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[11px] font-bold text-[#0F172A] mt-2">
              Rekomendasi
            </span>
          </button>
        </div>

        {/* Ringkasan Hari Ini Card matching the presentation */}
        <div
          onClick={() => onNavigate('analisis')}
          className="w-full bg-white rounded-3xl p-5 border border-slate-100 shadow-sm cursor-pointer hover:border-slate-200 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A]">
              Ringkasan Hari Ini (16 Okt 2026)
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-baseline gap-2 mt-2">
            <h4 className="text-2xl font-black text-[#0F172A] tracking-tight">
              Rp 428.000
            </h4>
            <span className="text-xs text-[#64748B] font-medium">
              56 transaksi
            </span>
          </div>

          {/* Sparkline Curve Chart matching presentation */}
          <div className="w-full h-16 mt-3 relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 300 70"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#108981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#108981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill */}
              <path
                d="M0,55 Q50,60 100,45 T200,30 T280,15 L300,10 L300,70 L0,70 Z"
                fill="url(#sparkGrad)"
              />
              {/* Line */}
              <path
                d="M0,55 Q50,60 100,45 T200,30 T280,15 L300,10"
                fill="none"
                stroke="#108981"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Current peak point */}
              <circle
                cx="300"
                cy="10"
                r="4.5"
                fill="#108981"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>

        {/* Quick Tips / Banner */}
        <div
          onClick={() => onNavigate('advisor')}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-between cursor-pointer hover:bg-emerald-100/50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-lg">💡</span>
            <div>
              <p className="text-xs font-bold text-[#0F172A]">
                Tips AI: Stok Nasi Ayam Menipis
              </p>
              <p className="text-[11px] text-[#64748B]">
                Pesan tambahan 20 porsi untuk lonjakan weekend.
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#108981] shrink-0" />
        </div>
      </div>
    </div>
  );
};
