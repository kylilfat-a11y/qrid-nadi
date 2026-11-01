import React, { useState } from 'react';
import { HeaderBar } from '../common/HeaderBar';
import { ArrowUpRight } from 'lucide-react';
import { bestsellerProducts, salesTrendsOct2026 } from '../../data/mockData';
import { BestsellerProduct } from '../../types';

interface AnalyticsScreenProps {
  onBack: () => void;
  onSelectProduct?: (product: BestsellerProduct) => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  onBack,
  onSelectProduct,
}) => {
  const [period, setPeriod] = useState<'7 Hari' | '30 Hari' | '90 Hari'>('30 Hari');
  const [activeDay, setActiveDay] = useState(salesTrendsOct2026[salesTrendsOct2026.length - 1]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Period-dependent stats
  const periodStats = {
    '7 Hari': {
      totalRevenue: 'Rp 12.480.000',
      growth: '12% dari periode sebelumnya',
      orders: '1.243',
    },
    '30 Hari': {
      totalRevenue: 'Rp 48.950.000',
      growth: '15.4% dari bulan lalu',
      orders: '4.890',
    },
    '90 Hari': {
      totalRevenue: 'Rp 142.300.000',
      growth: '18.2% kuartal ini',
      orders: '14.200',
    },
  }[period];

  const displayedProducts = showAllProducts
    ? bestsellerProducts
    : bestsellerProducts.slice(0, 4);

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-50/50 overflow-y-auto select-none">
      <div className="pb-6">
        {/* Header Bar */}
        <HeaderBar
          title="Analisis Transaksi"
          showBack={true}
          onBack={onBack}
        />

        <div className="px-5 pt-3 space-y-4">
          {/* Segmented Filter: 7 Hari | 30 Hari | 90 Hari */}
          <div className="w-full p-1 bg-slate-200/70 rounded-2xl flex items-center">
            {(['7 Hari', '30 Hari', '90 Hari'] as const).map((p) => {
              const active = period === p;
              return (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-150 ${
                    active
                      ? 'bg-[#108981] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          {/* Tren Penjualan Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div>
              <span className="text-xs text-[#64748B] font-medium">Tren Penjualan</span>
              <h3 className="text-2xl font-black text-[#0F172A] tracking-tight mt-0.5">
                {periodStats.totalRevenue}
              </h3>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#108981] mt-1">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{periodStats.growth}</span>
              </div>
            </div>

            {/* Interactive Bar Chart for Oktober 2026 */}
            <div className="pt-2">
              <div className="h-44 w-full flex items-end justify-between gap-2.5 px-2 pb-2 border-b border-slate-100">
                {salesTrendsOct2026.map((item) => {
                  const isCurrent = activeDay.day === item.day;
                  return (
                    <div
                      key={item.day}
                      onClick={() => setActiveDay(item)}
                      className="flex-1 flex flex-col items-center cursor-pointer group h-full justify-end"
                    >
                      {/* Hover / Active tooltip value */}
                      {isCurrent && (
                        <div className="text-[9px] font-bold text-[#108981] bg-[#D1FAE5] px-1.5 py-0.5 rounded mb-1 animate-in fade-in duration-150">
                          {Math.round(item.revenue / 1000)}k
                        </div>
                      )}
                      {/* Bar */}
                      <div
                        style={{ height: `${item.heightPct}%` }}
                        className={`w-full max-w-[28px] rounded-t-xl transition-all duration-200 ${
                          isCurrent
                            ? 'bg-[#108981] shadow-md shadow-[#108981]/30'
                            : 'bg-emerald-300 group-hover:bg-[#108981]/70'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Day Labels matching presentation */}
              <div className="flex justify-between items-center px-2 pt-2 text-[11px] font-medium text-[#64748B]">
                {salesTrendsOct2026.map((item) => (
                  <span
                    key={item.day}
                    className={`flex-1 text-center cursor-pointer ${
                      activeDay.day === item.day ? 'font-bold text-[#108981]' : ''
                    }`}
                  >
                    {item.day}
                  </span>
                ))}
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-1">
                Oktober 2026 (Tap batang untuk melihat detail per tanggal)
              </p>

              {/* Active Day Detail Card */}
              <div className="mt-3 p-3 bg-slate-50 rounded-2xl flex items-center justify-between text-xs border border-slate-100">
                <div>
                  <span className="text-[10px] text-[#64748B]">
                    Penjualan {activeDay.label} 2026:
                  </span>
                  <p className="font-bold text-sm text-[#0F172A]">
                    Rp {activeDay.revenue.toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#64748B]">Total Transaksi:</span>
                  <p className="font-bold text-sm text-[#108981]">
                    {activeDay.orders} order
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Produk Terlaris Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#0F172A]">Produk Terlaris</h4>
              <button
                onClick={() => setShowAllProducts(!showAllProducts)}
                className="text-xs font-semibold text-[#108981] hover:underline"
              >
                {showAllProducts ? 'Sembunyikan' : 'Lihat Semua >'}
              </button>
            </div>

            <div className="space-y-4">
              {displayedProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct && onSelectProduct(prod)}
                  className="space-y-1.5 cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl ${prod.avatarColor} font-bold text-xs flex items-center justify-center shrink-0`}
                      >
                        {prod.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-[#108981] transition-colors">
                          {prod.name}
                        </p>
                        <p className="text-[10px] text-[#64748B]">
                          {prod.category} • Rp {prod.revenue.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-slate-900">
                        {prod.percentage}%
                      </span>
                      <p className="text-[10px] text-[#64748B]">
                        {prod.transactions} transaksi
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${prod.percentage * 2.2}%` }}
                      className="h-full bg-[#108981] rounded-full transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
