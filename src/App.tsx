import React, { useState } from 'react';
import {
  ScreenType,
  Transaction,
  ReportItem,
  StockRecommendation,
  MerchantProfile,
} from './types';
import { initialMerchant, transactionsData } from './data/mockData';
import { PresentationToolbar } from './components/PresentationToolbar';
import { BottomNav } from './components/common/BottomNav';
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { PredictionScreen } from './components/screens/PredictionScreen';
import { FinancialHealthScreen } from './components/screens/FinancialHealthScreen';
import { AdvisorScreen } from './components/screens/AdvisorScreen';
import { TransactionsScreen } from './components/screens/TransactionsScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { AccountScreen } from './components/screens/AccountScreen';
import { ReceiptModal } from './components/modals/ReceiptModal';
import { ReportModal } from './components/modals/ReportModal';
import { RestockModal } from './components/modals/RestockModal';
import { AiChatDrawer } from './components/modals/AiChatDrawer';
import { NotificationDrawer } from './components/modals/NotificationDrawer';
import { BarChart3, TrendingUp, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [history, setHistory] = useState<ScreenType[]>(['dashboard']);

  // Presentation / Device View state
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Merchant Profile State
  const [merchant, setMerchant] = useState<MerchantProfile>(initialMerchant);

  // Modals state
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [selectedRestockItem, setSelectedRestockItem] = useState<StockRecommendation | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Navigation handler
  const navigateTo = (screen: ScreenType) => {
    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (history.length > 1) {
      const nextHistory = [...history];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('dashboard');
    }
  };

  // Determine if bottom nav should be rendered
  const showBottomNav =
    currentScreen !== 'splash' &&
    currentScreen !== 'onboarding' &&
    currentScreen !== 'login' &&
    currentScreen !== 'register';

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-800 flex flex-col font-sans selection:bg-[#108981]/20 selection:text-[#108981]">
      {/* Top Presentation Bar with quick jump numbered buttons 1-11 */}
      <PresentationToolbar
        currentScreen={currentScreen}
        onSelectScreen={(screen) => navigateTo(screen)}
        isPhoneFrame={isPhoneFrame}
        onToggleFrame={() => setIsPhoneFrame(!isPhoneFrame)}
      />

      {/* Main Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left Presentation Showcase Column (Visible on Desktop) */}
        <aside className="hidden lg:flex flex-col justify-between w-[380px] shrink-0 space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D1FAE5] text-[#108981] text-xs font-extrabold tracking-wide">
              <span>OKTOBER 2026</span>
              <span>•</span>
              <span>UMKM GO DIGITAL</span>
            </div>

            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight leading-tight">
              Data Hari Ini, Keputusan Lebih Baik untuk Masa Depan Usaha Anda
            </h1>

            <p className="text-xs text-[#64748B] leading-relaxed">
              Platform kecerdasan bisnis berbasis AI yang mengolah data transaksi
              QRIS dan informasi operasional UMKM menjadi rekomendasi nyata
              untuk meningkatkan produktivitas dan daya saing.
            </p>

            {/* 4 Feature Badges matching presentation */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => navigateTo('analisis')}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-[#108981] hover:bg-[#D1FAE5]/10 text-left transition-all shadow-xs group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#108981] flex items-center justify-center mb-2 group-hover:bg-[#108981] group-hover:text-white transition-colors">
                  <BarChart3 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="text-xs font-bold text-[#0F172A] leading-tight">
                  Analisis Transaksi QRIS
                </p>
              </button>

              <button
                onClick={() => navigateTo('prediksi')}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-[#108981] hover:bg-[#D1FAE5]/10 text-left transition-all shadow-xs group"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-2 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <TrendingUp className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="text-xs font-bold text-[#0F172A] leading-tight">
                  Prediksi Stok & Penjualan
                </p>
              </button>

              <button
                onClick={() => navigateTo('keuangan')}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-[#108981] hover:bg-[#D1FAE5]/10 text-left transition-all shadow-xs group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <HeartPulse className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="text-xs font-bold text-[#0F172A] leading-tight">
                  Kesehatan Finansial
                </p>
              </button>

              <button
                onClick={() => navigateTo('advisor')}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 hover:border-[#108981] hover:bg-[#D1FAE5]/10 text-left transition-all shadow-xs group"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Sparkles className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="text-xs font-bold text-[#0F172A] leading-tight">
                  Rekomendasi AI Personal
                </p>
              </button>
            </div>
          </div>

          {/* Color Palette Display matching presentation */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Palet Warna Desain
            </span>
            <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
              <div>
                <div className="w-full h-8 rounded-lg bg-[#108981] shadow-xs" />
                <span className="font-semibold block mt-1">#108981</span>
                <span className="text-slate-400 text-[9px]">Hijau Utama</span>
              </div>
              <div>
                <div className="w-full h-8 rounded-lg bg-[#D1FAE5] border border-slate-200" />
                <span className="font-semibold block mt-1">#D1FAE5</span>
                <span className="text-slate-400 text-[9px]">Hijau Muda</span>
              </div>
              <div>
                <div className="w-full h-8 rounded-lg bg-[#0F172A]" />
                <span className="font-semibold block mt-1">#0F172A</span>
                <span className="text-slate-400 text-[9px]">Navy</span>
              </div>
              <div>
                <div className="w-full h-8 rounded-lg bg-[#64748B]" />
                <span className="font-semibold block mt-1">#64748B</span>
                <span className="text-slate-400 text-[9px]">Abu-abu</span>
              </div>
              <div>
                <div className="w-full h-8 rounded-lg bg-[#FFFFFF] border border-slate-200" />
                <span className="font-semibold block mt-1">#FFFFFF</span>
                <span className="text-slate-400 text-[9px]">Putih</span>
              </div>
            </div>
          </div>

          {/* Slogan Badge matching bottom of slide */}
          <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20 text-center">
            <span className="font-serif italic font-bold text-lg text-[#108981]">
              UMKM Maju Ekonomi Kuat
            </span>
          </div>
        </aside>

        {/* Center Mobile Device Frame Container */}
        <section className="flex flex-col items-center justify-center w-full max-w-[420px]">
          <div
            className={`w-full overflow-hidden transition-all duration-300 ${
              isPhoneFrame
                ? 'h-[780px] rounded-[48px] shadow-2xl border-[8px] border-slate-900 bg-black ring-1 ring-slate-900/10 relative flex flex-col'
                : 'h-[780px] rounded-3xl shadow-lg border border-slate-200 bg-white relative flex flex-col'
            }`}
          >
            {/* Screen Content Container */}
            <div className="flex-1 w-full bg-white flex flex-col overflow-hidden relative">
              {currentScreen === 'splash' && (
                <SplashScreen
                  onContinue={() => navigateTo('onboarding')}
                  onGoToDashboard={() => navigateTo('dashboard')}
                />
              )}

              {currentScreen === 'onboarding' && (
                <OnboardingScreen
                  onNext={() => navigateTo('login')}
                  onSkip={() => navigateTo('dashboard')}
                />
              )}

              {currentScreen === 'login' && (
                <LoginScreen
                  onBack={goBack}
                  onLoginSuccess={() => navigateTo('dashboard')}
                  onGoToRegister={() => navigateTo('register')}
                />
              )}

              {currentScreen === 'register' && (
                <RegisterScreen
                  onBack={goBack}
                  onRegisterSuccess={(newMerchant) => {
                    setMerchant((prev) => ({ ...prev, ...newMerchant }));
                    navigateTo('dashboard');
                  }}
                  onGoToLogin={() => navigateTo('login')}
                />
              )}

              {currentScreen === 'dashboard' && (
                <DashboardScreen
                  merchant={merchant}
                  onNavigate={(screen) => navigateTo(screen)}
                  onOpenNotifications={() => setIsNotificationOpen(true)}
                />
              )}

              {currentScreen === 'analisis' && (
                <AnalyticsScreen
                  onBack={goBack}
                  onSelectProduct={(p) => {
                    // Quick modal or info
                    setSelectedReceipt({
                      id: 'PROD-' + p.id,
                      item: p.name,
                      category: p.category,
                      date: '16 Okt 2026',
                      time: '14:00',
                      paymentMethod: 'QRIS',
                      amount: p.revenue,
                      status: 'Sukses',
                      referenceNo: 'NMID-PROD-' + p.id,
                    });
                  }}
                />
              )}

              {currentScreen === 'prediksi' && (
                <PredictionScreen
                  onBack={goBack}
                  onOpenRestockModal={(item) => setSelectedRestockItem(item)}
                />
              )}

              {currentScreen === 'keuangan' && (
                <FinancialHealthScreen
                  onBack={goBack}
                  onOpenReport={() => navigateTo('laporan')}
                />
              )}

              {currentScreen === 'advisor' && (
                <AdvisorScreen
                  merchant={merchant}
                  onBack={goBack}
                  onAskMore={() => setIsAiChatOpen(true)}
                  onNavigateToStock={() => navigateTo('prediksi')}
                />
              )}

              {currentScreen === 'riwayat' && (
                <TransactionsScreen
                  onBack={goBack}
                  onSelectTransaction={(trx) => setSelectedReceipt(trx)}
                />
              )}

              {currentScreen === 'laporan' && (
                <ReportsScreen
                  onBack={goBack}
                  onOpenReportModal={(rep) => setSelectedReport(rep)}
                />
              )}

              {currentScreen === 'akun' && (
                <AccountScreen
                  merchant={merchant}
                  onUpdateMerchant={(up) => setMerchant((prev) => ({ ...prev, ...up }))}
                  onLogout={() => navigateTo('login')}
                  onBack={goBack}
                />
              )}
            </div>

            {/* Persistent Mobile Bottom Navigation for main tabs */}
            {showBottomNav && (
              <BottomNav
                currentScreen={currentScreen}
                onNavigate={(screen) => navigateTo(screen)}
              />
            )}
          </div>

          {/* Instruction helper below phone frame */}
          <p className="text-center text-xs text-slate-500 mt-3">
            Gunakan tombol menu atau tombol navigasi di dalam frame untuk berpindah fitur secara langsung.
          </p>
        </section>
      </main>

      {/* Global Interactive Modals */}
      <ReceiptModal
        transaction={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        storeName={merchant.storeName}
      />

      <ReportModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        storeName={merchant.storeName}
      />

      <RestockModal
        item={selectedRestockItem}
        onClose={() => setSelectedRestockItem(null)}
        onOrderSuccess={(name, qty) => {
          alert(`Berhasil mengirim pemesanan ${qty} ${name} ke supplier!`);
        }}
      />

      <AiChatDrawer
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        storeName={merchant.storeName}
        merchantName={merchant.name}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onOpenAdvisor={() => navigateTo('advisor')}
        onOpenTransactions={() => navigateTo('riwayat')}
      />
    </div>
  );
}
