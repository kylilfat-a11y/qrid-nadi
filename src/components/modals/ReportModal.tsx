import React, { useState } from 'react';
import { X, Download, FileText, Check, Printer } from 'lucide-react';
import { ReportItem } from '../../types';

interface ReportModalProps {
  report: ReportItem | null;
  onClose: () => void;
  storeName?: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  report,
  onClose,
  storeName = 'Warung Sari Rasa',
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!report) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] text-[#108981] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0F172A]">{report.title}</h3>
              <p className="text-xs text-[#64748B]">Periode: {report.dateRange}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Simulated Sheet */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-sans">
          <div className="p-5 border border-slate-200 rounded-2xl bg-white shadow-xs space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <p className="font-bold text-base text-[#108981]">QRIS NADI</p>
                <p className="font-semibold text-xs text-slate-800">{storeName}</p>
                <p className="text-[10px] text-slate-500">Laporan Resmi UMKM Terintegrasi</p>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-[#108981] text-[10px] font-bold">
                  TERVERIFIKASI
                </span>
                <p className="text-[10px] text-slate-400 mt-1">Dibuat: 16 Okt 2026</p>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl space-y-2">
              <p className="text-[11px] font-semibold text-slate-700">Ringkasan Eksekutif:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px]">Nilai / Summary:</span>
                  <p className="font-bold text-[#0F172A] text-sm">{report.summary}</p>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">Periode Evaluasi:</span>
                  <p className="font-medium text-slate-700">{report.dateRange}</p>
                </div>
              </div>
            </div>

            {report.type === 'penjualan' && (
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">Rincian Transaksi QRIS:</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Total Volume Penjualan</span>
                    <span className="font-bold text-slate-900">Rp 12.480.000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Frekuensi Transaksi</span>
                    <span className="font-medium text-slate-800">1.243 transaksi</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Rata-rata Transaksi (Basket Size)</span>
                    <span className="font-medium text-slate-800">Rp 10.030</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600">Menu Terlaris</span>
                    <span className="font-semibold text-[#108981]">Nasi Ayam (412 pesanan)</span>
                  </div>
                </div>
              </div>
            )}

            {report.type === 'keuangan' && (
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">Struktur Laba Rugi:</p>
                <div className="space-y-1.5">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Pendapatan Kotor (Omzet)</span>
                    <span className="font-bold text-emerald-600">Rp 12.480.000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Biaya Bahan Baku (54%)</span>
                    <span className="text-slate-800">Rp 4.212.000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Biaya Operasional (18%)</span>
                    <span className="text-slate-800">Rp 1.404.000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Gaji Karyawan (12%)</span>
                    <span className="text-slate-800">Rp 936.000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Biaya Lainnya (16%)</span>
                    <span className="text-slate-800">Rp 1.248.000</span>
                  </div>
                  <div className="flex justify-between py-1 pt-2 font-bold text-sm bg-emerald-50 px-2 rounded-lg">
                    <span className="text-[#0F172A]">Estimasi Laba Bersih</span>
                    <span className="text-[#108981]">Rp 4.680.000 (37.5%)</span>
                  </div>
                </div>
              </div>
            )}

            {report.type === 'stok' && (
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">Rekomendasi Restock AI:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Nasi Ayam (Fillet) sisa 8 porsi, butuh order 20 porsi segera.</li>
                  <li>Es Teh Manis (Biang) sisa 15 botol, butuh order 10 botol.</li>
                  <li>Cabai rawit merah waspada kenaikan harga pasar minggu ini.</li>
                </ul>
              </div>
            )}

            <div className="text-[10px] text-slate-400 text-center pt-2">
              Laporan ini digenerate secara otomatis oleh sistem AI QRIS NADI untuk kemudahan pelaporan pajak dan pembukuan UMKM.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white text-xs font-bold transition-all shadow-md ${
              downloadSuccess
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-[#108981] hover:bg-[#0e756e]'
            }`}
          >
            {downloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menyiapkan PDF...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>PDF Berhasil Diunduh ({report.fileSize})</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF Resmi ({report.fileSize})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
