import React, { useState } from 'react';
import {
  ScreenType,
  Transaction,
  ReportItem,
  StockRecommendation,
  MerchantProfile,
} from './types';
import { initialMerchant } from './data/mockData';
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

export default function App() {
  // Application starts directly on the Splash Screen
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [history, setHistory] = useState<ScreenType[]>(['splash']);

  // Merchant Profile State
  const [merchant, setMerchant] = useState<MerchantProfile>(initialMerchant);

  // Interactive Modals State
  const [selectedReceipt, setSelectedReceipt] = useState<Transaction | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [selectedRestockItem, setSelectedRestockItem] = useState<StockRecommendation | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Navigation handlers
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

  // Bottom Navigation is displayed on main in-app screens
  const showBottomNav =
    currentScreen !== 'splash' &&
    currentScreen !== 'onboarding' &&
    currentScreen !== 'login' &&
    currentScreen !== 'register';

  return (
    <div className="min-h-screen bg-slate-900/5 sm:bg-slate-950 flex flex-col items-center justify-center sm:p-4 text-slate-800 font-sans selection:bg-[#108981]/20 selection:text-[#108981]">
      {/* Mobile Smartphone Frame Container */}
      <div className="w-full sm:max-w-[412px] h-screen sm:h-[844px] sm:max-h-[96vh] sm:rounded-[48px] sm:shadow-2xl sm:border-[8px] sm:border-slate-900 bg-white overflow-hidden relative flex flex-col">
        {/* Dynamic Island / Notch on desktop frame */}
        <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 w-28 h-4.5 bg-black rounded-full z-40 pointer-events-none" />

        {/* Screen Routing */}
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
              onBack={() => navigateTo('onboarding')}
              onLoginSuccess={() => navigateTo('dashboard')}
              onGoToRegister={() => navigateTo('register')}
            />
          )}

          {currentScreen === 'register' && (
            <RegisterScreen
              onBack={() => navigateTo('login')}
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

        {/* Bottom Navigation for in-app screens */}
        {showBottomNav && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => navigateTo(screen)}
          />
        )}
      </div>

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
          alert(`Pemesanan ${qty} ${name} berhasil dikirim ke supplier.`);
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
