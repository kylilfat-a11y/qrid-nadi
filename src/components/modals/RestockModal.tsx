import React, { useState } from 'react';
import { X, CheckCircle, PackagePlus, AlertTriangle } from 'lucide-react';
import { StockRecommendation } from '../../types';

interface RestockModalProps {
  item: StockRecommendation | null;
  onClose: () => void;
  onOrderSuccess: (itemName: string, quantity: number) => void;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  item,
  onClose,
  onOrderSuccess,
}) => {
  if (!item) return null;

  const [orderQty, setOrderQty] = useState<number>(item.recommendedOrder);
  const [ordered, setOrdered] = useState(false);

  const unitCost = item.estimatedCost / item.recommendedOrder;
  const currentTotal = Math.round(unitCost * orderQty);

  const handleConfirmOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      onOrderSuccess(item.name, orderQty);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <PackagePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0F172A]">Detail Restock Bahan</h3>
              <p className="text-xs text-[#64748B]">Rekomendasi Prediksi AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <div>
            <p className="text-sm font-bold text-[#0F172A]">{item.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-700 font-semibold text-[10px]">
                Stok Kritis: {item.currentStock} {item.unit}
              </span>
              <span className="text-[#64748B]">|</span>
              <span className="text-[#64748B]">Supplier: {item.supplier}</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-relaxed">{item.reason}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Jumlah Pesanan:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOrderQty(Math.max(1, orderQty - 5))}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-sm shadow-xs"
                >
                  -
                </button>
                <span className="font-bold text-sm text-[#0F172A] w-12 text-center">
                  {orderQty} {item.unit}
                </span>
                <button
                  onClick={() => setOrderQty(orderQty + 5)}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-sm shadow-xs"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-600">Estimasi Biaya:</span>
              <span className="font-bold text-sm text-[#108981]">
                Rp {currentTotal.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-[#64748B]">
            <p>• Estimasi pengiriman: Besok pagi pukul 07:00 WIB</p>
            <p>• Metode pembayaran: QRIS B2B Merchant / Tagihan Tempo</p>
          </div>

          <button
            onClick={handleConfirmOrder}
            disabled={ordered}
            className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 text-white shadow-md transition-all ${
              ordered
                ? 'bg-emerald-600'
                : 'bg-[#108981] hover:bg-[#0e746d] active:scale-98'
            }`}
          >
            {ordered ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Pesanan Berhasil Dikirim ke Supplier!</span>
              </>
            ) : (
              <>
                <PackagePlus className="w-4 h-4" />
                <span>Pesan Sekarang ke Supplier</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
