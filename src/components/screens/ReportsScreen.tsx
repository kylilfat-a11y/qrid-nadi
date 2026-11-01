import React, { useState } from 'react';
import { HeaderBar } from '../common/HeaderBar';
import { Download, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { reportItemsData } from '../../data/mockData';
import { ReportItem } from '../../types';

interface ReportsScreenProps {
  onBack: () => void;
  onOpenReportModal: (report: ReportItem) => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  onBack,
  onOpenReportModal,
}) => {
  const [period, setPeriod] = useState<'Harian' | 'Mingguan' | 'Bulanan'>('Mingguan');

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-50/50 overflow-y-auto select-none">
      <div className="pb-6">
        <HeaderBar
          title="Laporan"
          showBack={true}
          onBack={onBack}
        />

        <div className="px-5 pt-3 space-y-4">
          {/* Segmented Filter: Harian | Mingguan | Bulanan */}
          <div className="w-full p-1 bg-slate-200/70 rounded-2xl flex items-center">
            {(['Harian', 'Mingguan', 'Bulanan'] as const).map((p) => {
              const active = period === p;
              return (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all duration-150 ${
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

          {/* Report Cards matching presentation */}
          <div className="space-y-3.5">
            {reportItemsData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3 hover:border-slate-200 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#D1FAE5] text-[#108981] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#0F172A] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#64748B] mt-0.5">
                        {item.dateRange}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                  <div>
                    {item.type === 'stok' ? (
                      <p className="text-xs font-bold text-amber-600">
                        {item.summary}
                      </p>
                    ) : item.type === 'penjualan' ? (
                      <p className="text-sm font-black text-[#0F172A]">
                        {item.summary}
                      </p>
                    ) : (
                      <p className="text-xs font-bold text-[#108981]">
                        {item.summary}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onOpenReportModal(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:border-[#108981] hover:text-[#108981] text-xs font-bold transition-all shadow-2xs active:scale-95"
                  >
                    <span>Download PDF</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Export Tips */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#108981] shrink-0" />
            <p className="text-[11px] text-emerald-950 leading-relaxed">
              Semua laporan siap dicetak dan kompatibel dengan format pembukuan SPT pajak UMKM & pengajuan modal perbankan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
