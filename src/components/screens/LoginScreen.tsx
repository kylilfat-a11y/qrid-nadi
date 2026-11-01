import React, { useState } from 'react';
import { StatusBar } from '../common/HeaderBar';
import { ChevronLeft, Mail, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (emailOrPhone: string) => void;
  onGoToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onLoginSuccess,
  onGoToRegister,
}) => {
  const [identifier, setIdentifier] = useState('budi.warung@gmail.com');
  const [password, setPassword] = useState('rahasia123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(identifier);
    }, 600);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between bg-white overflow-y-auto select-none p-5 pt-0">
      <div>
        <StatusBar />
        {/* Top Back button */}
        <div className="py-2">
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Header */}
        <div className="mt-2 space-y-1">
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
            Masuk ke Akun Anda
          </h2>
          <p className="text-xs text-[#64748B]">Kelola usaha, raih pertumbuhan.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email atau nomor HP
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="contoh@email.com"
                className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-xs text-slate-900 outline-none focus:border-[#108981] focus:ring-2 focus:ring-[#108981]/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full bg-white border border-slate-200 rounded-xl pl-3.5 pr-10 py-3 text-xs text-slate-900 outline-none focus:border-[#108981] focus:ring-2 focus:ring-[#108981]/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#108981] focus:ring-[#108981] accent-[#108981]"
              />
              <span className="text-slate-700 font-medium text-[11px]">
                Ingat saya
              </span>
            </label>
            <button
              type="button"
              onClick={() => alert('Fitur reset password telah dikirim ke email terdaftar.')}
              className="text-[#108981] hover:underline font-semibold text-[11px]"
            >
              Lupa password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#108981] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#108981]/20 hover:bg-[#0e746d] active:scale-98 transition-all mt-2"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-[11px]">
            <span className="bg-white px-3 text-[#64748B]">atau</span>
          </div>
        </div>

        {/* Google Login button */}
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              onLoginSuccess('budi.warung@gmail.com');
            }, 500);
          }}
          className="w-full h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2.5 text-xs font-semibold text-slate-700 transition-all shadow-xs"
        >
          {/* Google G logo */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Daftar dengan Google</span>
        </button>
      </div>

      {/* Footer link */}
      <div className="py-4 text-center">
        <p className="text-xs text-[#64748B]">
          Belum punya akun?{' '}
          <button
            onClick={onGoToRegister}
            className="text-[#108981] font-bold hover:underline"
          >
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
};
