import React, { useState } from 'react';
import { HeaderBar } from '../common/HeaderBar';
import {
  Store,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  QrCode,
  ShieldCheck,
  Check,
  Volume2,
} from 'lucide-react';
import { MerchantProfile } from '../../types';

interface AccountScreenProps {
  merchant: MerchantProfile;
  onUpdateMerchant: (updated: Partial<MerchantProfile>) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({
  merchant,
  onUpdateMerchant,
  onLogout,
  onBack,
}) => {
  const [editing, setEditing] = useState(false);
  const [storeName, setStoreName] = useState(merchant.storeName);
  const [phone, setPhone] = useState(merchant.phone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onUpdateMerchant({ storeName, phone });
    setEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-slate-50/50 overflow-y-auto select-none">
      <div className="pb-6">
        <HeaderBar title="Profil Akun UMKM" showBack={true} onBack={onBack} />

        <div className="px-5 pt-3 space-y-4">
          {savedSuccess && (
            <div className="p-3 bg-emerald-100 text-[#108981] rounded-2xl text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Profil toko berhasil diperbarui!</span>
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md shadow-[#108981]/25 border-2 border-white shrink-0 bg-[#D1FAE5]">
                <img
                  src="/budi_avatar.jpg"
                  alt="Foto Profil Budi"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/public/budi_avatar.jpg';
                  }}
                />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#0F172A]">
                  {merchant.storeName}
                </h3>
                <p className="text-xs text-[#64748B]">{merchant.name}</p>
                <div className="flex items-center gap-1 text-[10px] text-[#108981] font-semibold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Merchant QRIS Terverifikasi</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setEditing(!editing)}
              className="text-xs font-bold text-[#108981] hover:underline"
            >
              {editing ? 'Batal' : 'Ubah'}
            </button>
          </div>

          {editing ? (
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">
                  Nama Toko
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#108981]"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1 font-semibold">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#108981]"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full py-2.5 bg-[#108981] text-white rounded-xl font-bold hover:bg-[#0e746d]"
              >
                Simpan Perubahan
              </button>
            </div>
          ) : null}

          {/* QRIS & Settlement Info */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">
              Rekening Settlement QRIS
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-[#64748B]">NMID (QRIS ID)</span>
                <span className="font-mono font-bold text-slate-900">
                  {merchant.qrisId}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-[#64748B]">Bank Penampung</span>
                <span className="font-bold text-slate-900">
                  {merchant.bankName}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-[#64748B]">No. Rekening</span>
                <span className="font-mono font-bold text-slate-900">
                  {merchant.bankAccount}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#64748B]">Jadwal Pencairan</span>
                <span className="font-medium text-emerald-600">
                  {merchant.settlementSchedule}
                </span>
              </div>
            </div>
          </div>

          {/* Hardware & Perangkat */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider">
              Integrasi Perangkat Usaha
            </h4>
            <div className="flex items-center justify-between text-xs py-1">
              <div className="flex items-center gap-2.5">
                <Volume2 className="w-4 h-4 text-[#108981]" />
                <span>QRIS Soundbox Suara Notifikasi</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#108981] font-bold text-[10px]">
                Terhubung (Aktif)
              </span>
            </div>
          </div>

          {/* Action List */}
          <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-sm divide-y divide-slate-100 text-xs">
            <button
              onClick={() => alert('Fitur pengaturan keamanan & ganti PIN kasir.')}
              className="w-full p-3.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Pengaturan Aplikasi & Keamanan</span>
              </div>
              <span className="text-slate-400">&rarr;</span>
            </button>
            <button
              onClick={() => alert('Pusat Bantuan QRIS NADI: Hubungi WhatsApp Support 24/7.')}
              className="w-full p-3.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Bantuan & Panduan UMKM</span>
              </div>
              <span className="text-slate-400">&rarr;</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full p-3.5 flex items-center justify-between text-red-600 hover:bg-red-50 rounded-2xl font-bold"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Akun</span>
              </div>
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
