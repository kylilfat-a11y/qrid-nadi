import React, { useState } from 'react';
import { HeaderBar } from '../common/HeaderBar';
import { Search, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { transactionsData } from '../../data/mockData';
import { Transaction } from '../../types';

interface TransactionsScreenProps {
  onBack: () => void;
  onSelectTransaction: (trx: Transaction) => void;
}

export const TransactionsScreen: React.FC<TransactionsScreenProps> = ({
  onBack,
  onSelectTransaction,
}) => {
  const [filterTab, setFilterTab] = useState<'Semua' | 'QRIS' | 'Produk'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredTransactions = transactionsData.filter((trx) => {
    if (filterTab === 'QRIS' && trx.paymentMethod !== 'QRIS') return false;
    if (filterTab === 'Produk' && trx.category !== 'Makanan') return false;
    if (
      searchQuery &&
      !trx.item.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !trx.referenceNo.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-50/50 overflow-y-auto select-none">
      <div className="pb-6">
        <HeaderBar
          title="Riwayat Transaksi"
          showBack={true}
          onBack={onBack}
          rightAction={
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100"
            >
              <Search className="w-5 h-5" />
            </button>
          }
        />

        <div className="px-5 pt-3 space-y-4">
          {/* Optional expandable search bar */}
          {showSearch && (
            <div className="relative animate-in fade-in duration-150">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari transaksi atau menu..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#108981]"
              />
            </div>
          )}

          {/* Segmented Filter Tabs: Semua | QRIS | Produk */}
          <div className="w-full p-1 bg-slate-200/70 rounded-2xl flex items-center">
            {(['Semua', 'QRIS', 'Produk'] as const).map((tab) => {
              const active = filterTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab)}
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

          {/* Transaction List matching presentation */}
          <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-sm divide-y divide-slate-100">
            {filteredTransactions.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#64748B]">
                Tidak ada transaksi ditemukan.
              </div>
            ) : (
              filteredTransactions.map((trx) => (
                <div
                  key={trx.id}
                  onClick={() => onSelectTransaction(trx)}
                  className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer rounded-2xl group"
                >
                  <div className="flex items-center gap-3">
                    {/* Item Avatar / Icon */}
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-base shrink-0 group-hover:scale-105 transition-transform">
                      {trx.category === 'Minuman' ? '🥤' : '🍛'}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A] leading-snug group-hover:text-[#108981] transition-colors">
                        {trx.item}
                      </h4>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {trx.date} • {trx.time}{' '}
                        <span className="font-semibold text-emerald-600">
                          {trx.paymentMethod}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-[#0F172A] group-hover:text-[#108981] transition-colors">
                      Rp {trx.amount.toLocaleString('id-ID')}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
