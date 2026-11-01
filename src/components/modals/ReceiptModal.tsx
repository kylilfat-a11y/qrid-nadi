import React from 'react';
import { X, CheckCircle2, Share2, Download, QrCode } from 'lucide-react';
import { Transaction } from '../../types';

interface ReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  storeName?: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  transaction,
  onClose,
  storeName = 'Warung Sari Rasa',
}) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Receipt Header */}
        <div className="bg-[#108981] text-white p-5 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-xs">
            <CheckCircle2 className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-lg font-bold">Transaksi Berhasil</h3>
          <p className="text-xs text-white/80 mt-0.5">Metode Pembayaran QRIS</p>
        </div>

        {/* Receipt Body */}
        <div className="p-6">
          <div className="text-center pb-4 border-b border-dashed border-slate-200">
            <p className="text-xs text-[#64748B]">Total Pembayaran</p>
            <p className="text-2xl font-black text-[#0F172A] mt-1">
              Rp {transaction.amount.toLocaleString('id-ID')}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D1FAE5] text-[#108981] text-xs font-semibold mt-2">
              <QrCode className="w-3.5 h-3.5" />
              <span>QRIS Terverifikasi</span>
            </div>
          </div>

          <div className="py-4 space-y-3 text-xs border-b border-dashed border-slate-200">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Nama Merchant</span>
              <span className="font-semibold text-[#0F172A]">{storeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Produk / Pesanan</span>
              <span className="font-semibold text-[#0F172A]">
                {transaction.item}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Waktu Transaksi</span>
              <span className="font-medium text-[#0F172A]">
                {transaction.date} • {transaction.time} WIB
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Pelanggan</span>
              <span className="font-medium text-[#0F172A]">
                {transaction.customerName || 'Pelanggan QRIS'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">No. Referensi (RRN)</span>
              <span className="font-mono text-[11px] text-[#0F172A]">
                {transaction.referenceNo}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">ID Transaksi</span>
              <span className="font-mono text-[11px] text-[#0F172A]">
                {transaction.id}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-center text-[#64748B] my-3">
            Simpan struk ini sebagai bukti pembayaran digital QRIS resmi yang sah.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={() => {
                alert('Struk transaksi berhasil disimpan ke galeri Anda.');
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4 text-[#108981]" />
              <span>Simpan Struk</span>
            </button>
            <button
              onClick={() => {
                alert('Tautan bukti pembayaran telah disalin ke papan klip.');
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#108981] text-white text-xs font-semibold hover:bg-[#0e746d] active:scale-98 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Bagikan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
