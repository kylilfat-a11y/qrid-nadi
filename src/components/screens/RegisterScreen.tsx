import React, { useState } from 'react';
import { StatusBar } from '../common/HeaderBar';
import { ChevronLeft, Store, Phone, MapPin, ChevronDown } from 'lucide-react';
import { MerchantProfile } from '../../types';

interface RegisterScreenProps {
  onBack: () => void;
  onRegisterSuccess: (merchant: Partial<MerchantProfile>) => void;
  onGoToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onRegisterSuccess,
  onGoToLogin,
}) => {
  const [storeName, setStoreName] = useState('Warung Sari Rasa');
  const [businessType, setBusinessType] = useState('Kuliner / Makanan & Minuman');
  const [phone, setPhone] = useState('081298765432');
  const [address, setAddress] = useState('Jl. Malioboro No. 42, Danurejan, Yogyakarta');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess({
        storeName,
        businessType,
        phone,
        address,
      });
    }, 600);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-white overflow-y-auto select-none p-5 pt-0">
      <div>
        <StatusBar />
        {/* Back button */}
        <div className="py-2">
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Title */}
        <div className="mt-2 space-y-1">
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
            Daftar Akun UMKM
          </h2>
          <p className="text-xs text-[#64748B]">
            Bergabung dengan QRIS NADI secara gratis
          </p>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Usaha
            </label>
            <div className="relative flex items-center">
              <Store className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Contoh: Warung Sari Rasa"
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#108981] focus:ring-2 focus:ring-[#108981]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Jenis Usaha
            </label>
            <div className="relative">
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#108981] focus:ring-2 focus:ring-[#108981]/20 transition-all pr-9 cursor-pointer"
              >
                <option value="Kuliner / Makanan & Minuman">
                  Kuliner / Makanan & Minuman
                </option>
                <option value="Toko Kelontong & Sembako">
                  Toko Kelontong & Sembako
                </option>
                <option value="Fashion & Pakaian">Fashion & Pakaian</option>
                <option value="Jasa & Servis">Jasa & Servis</option>
                <option value="Kopi & Kafe">Kopi & Kafe</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nomor HP (WhatsApp)
            </label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#108981] focus:ring-2 focus:ring-[#108981]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Usaha
            </label>
            <div className="relative flex items-start">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Masukkan alamat lengkap"
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-[#108981] focus:ring-2 focus:ring-[#108981]/20 transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#108981] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#108981]/20 hover:bg-[#0e746d] active:scale-98 transition-all mt-4"
          >
            {loading ? 'Mendaftarkan Akun...' : 'Daftar'}
          </button>
        </form>

        <p className="text-[10px] text-center text-[#64748B] mt-4 leading-normal">
          Dengan mendaftar, saya menyetujui{' '}
          <span className="font-semibold text-[#108981] underline cursor-pointer">
            Syarat dan Ketentuan
          </span>{' '}
          serta{' '}
          <span className="font-semibold text-[#108981] underline cursor-pointer">
            Kebijakan Privasi
          </span>
        </p>
      </div>

      <div className="py-3 text-center">
        <p className="text-xs text-[#64748B]">
          Sudah punya akun?{' '}
          <button
            onClick={onGoToLogin}
            className="text-[#108981] font-bold hover:underline"
          >
            Masuk di sini
          </button>
        </p>
      </div>
    </div>
  );
};
