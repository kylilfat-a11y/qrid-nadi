export type ScreenType =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'analisis'
  | 'prediksi'
  | 'keuangan'
  | 'advisor'
  | 'riwayat'
  | 'laporan'
  | 'akun';

export interface Transaction {
  id: string;
  item: string;
  category: string;
  date: string;
  time: string;
  paymentMethod: 'QRIS' | 'Tunai' | 'Transfer';
  amount: number;
  status: 'Sukses' | 'Menunggu' | 'Gagal';
  customerName?: string;
  referenceNo: string;
}

export interface BestsellerProduct {
  id: string;
  name: string;
  percentage: number;
  transactions: number;
  revenue: number;
  category: string;
  avatarColor: string;
}

export interface StockRecommendation {
  id: string;
  name: string;
  currentStock: number;
  unit: string;
  recommendedOrder: number;
  reason: string;
  estimatedCost: number;
  supplier: string;
  urgency: 'Tinggi' | 'Sedang' | 'Rendah';
}

export interface ReportItem {
  id: string;
  title: string;
  dateRange: string;
  summary: string;
  type: 'penjualan' | 'stok' | 'keuangan' | 'rekonsiliasi';
  fileSize: string;
  details: {
    totalRevenue?: number;
    totalExpense?: number;
    netProfit?: number;
    totalOrders?: number;
    topItem?: string;
  };
}

export interface MerchantProfile {
  name: string;
  storeName: string;
  phone: string;
  businessType: string;
  address: string;
  qrisId: string;
  bankAccount: string;
  bankName: string;
  settlementSchedule: string;
}
