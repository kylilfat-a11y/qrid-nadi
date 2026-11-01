import React, { useState } from 'react';
import { HeaderBar } from '../common/HeaderBar';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FinancialHealthScreenProps {
  onBack: () => void;
  onOpenReport?: () => void;
}

export const FinancialHealthScreen: React.FC<FinancialHealthScreenProps> = ({
  onBack,
  onOpenReport,
}) => {
  const [activeTab, setActiveTab] = useState<'Ringkasan' | 'Detail'>('Ringkasan');
  const [selectedCostCategory, setSelectedCostCategory] = useState<string | null>(null);

  const costCategories = [
    { name: 'Bahan Baku', pct: 54, amount: 4212000, color: '#3B82F6', textCol: 'text-blue-600' },
    { name: 'Operasional', pct: 18, amount: 1404000, color: '#108981', textCol: 'text-emerald-600' },
    { name: 'Gaji', pct: 12, amount: 936000, color: '#F97316', textCol: 'text-orange-500' },
    { name: 'Lainnya', pct: 16, amount: 1248000, color: '#0F172A', textCol: 'text-slate-800' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-50/50 overflow-y-auto select-none">
      <div className="pb-6">
        <HeaderBar
          title="Kesehatan Finansial"
          showBack={true}
          onBack={onBack}
        />

        <div className="px-5 pt-3 space-y-4">
          {/* Estimasi Laba Bersih Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
            <div>
              <span className="text-xs text-[#64748B] font-medium">
                Estimasi Laba Bersih (30 hari)
              </span>
              <h3 className="text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
                Rp 4.680.000
              </h3>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#108981] mt-1">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>18% dari bulan lalu</span>
              </div>
            </div>

            {/* Segmented Control: Ringkasan | Detail */}
            <div className="w-full p-1 bg-slate-200/70 rounded-2xl flex items-center mt-3">
              {(['Ringkasan', 'Detail'] as const).map((tab) => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 ${
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

            {/* Stats Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] text-[#64748B] font-medium">Omzet</span>
                <p className="text-sm font-black text-[#0F172A] mt-0.5">
                  Rp 12.480.000
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] text-[#64748B] font-medium">Total Biaya</span>
                <p className="text-sm font-black text-[#0F172A] mt-0.5">
                  Rp 7.800.000
                </p>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-900">
                Margin Keuntungan:
              </span>
              <span className="text-sm font-black text-[#108981]">37,5%</span>
            </div>
          </div>

          {/* Rincian Biaya Donut Chart Section */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#0F172A]">Rincian Biaya</h4>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#108981]">
                <ShieldCheck className="w-4 h-4" />
                <span>Cashflow Sehat</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              {/* SVG Donut Chart matching presentation */}
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F1F5F9"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  {/* Segment 1: Bahan Baku (54%) -> 0.54 * 238.7 = ~128.9 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#3B82F6"
                    strokeWidth="12"
                    strokeDasharray="128.9 238.7"
                    strokeDashoffset="0"
                    fill="transparent"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedCostCategory('Bahan Baku')}
                  />
                  {/* Segment 2: Operasional (18%) -> 0.18 * 238.7 = 43.0 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#108981"
                    strokeWidth="12"
                    strokeDasharray="43.0 238.7"
                    strokeDashoffset="-128.9"
                    fill="transparent"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedCostCategory('Operasional')}
                  />
                  {/* Segment 3: Gaji (12%) -> 0.12 * 238.7 = 28.6 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F97316"
                    strokeWidth="12"
                    strokeDasharray="28.6 238.7"
                    strokeDashoffset="-171.9"
                    fill="transparent"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedCostCategory('Gaji')}
                  />
                  {/* Segment 4: Lainnya (16%) -> 0.16 * 238.7 = 38.2 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#0F172A"
                    strokeWidth="12"
                    strokeDasharray="38.2 238.7"
                    strokeDashoffset="-200.5"
                    fill="transparent"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedCostCategory('Lainnya')}
                  />
                </svg>

                {/* Donut Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] text-slate-400 font-medium">Total</span>
                  <span className="text-xs font-black text-[#0F172A]">100%</span>
                </div>
              </div>

              {/* Legend List matching presentation */}
              <div className="flex-1 space-y-2">
                {costCategories.map((c) => (
                  <div
                    key={c.name}
                    onClick={() => setSelectedCostCategory(c.name)}
                    className={`flex items-center justify-between text-xs p-1.5 rounded-xl cursor-pointer transition-colors ${
                      selectedCostCategory === c.name
                        ? 'bg-slate-100 font-bold'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-slate-700 text-[11px]">{c.name}</span>
                    </div>
                    <span className="font-bold text-[#0F172A] text-[11px]">
                      {c.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected category detail banner */}
            {selectedCostCategory && (
              <div className="p-3 bg-slate-50 rounded-2xl text-xs flex justify-between items-center border border-slate-200">
                <div>
                  <span className="text-[#64748B]">
                    Alokasi {selectedCostCategory}:
                  </span>
                  <p className="font-bold text-slate-900">
                    Rp{' '}
                    {costCategories
                      .find((c) => c.name === selectedCostCategory)
                      ?.amount.toLocaleString('id-ID')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCostCategory(null)}
                  className="text-[10px] text-[#108981] font-semibold hover:underline"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {/* Quick CTA to Full Report */}
          {onOpenReport && (
            <button
              onClick={onOpenReport}
              className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-[#108981] hover:bg-slate-50 transition-colors shadow-xs"
            >
              Lihat Laporan Keuangan Lengkap (PDF) &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
