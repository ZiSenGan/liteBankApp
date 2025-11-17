import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  customerName: string | null;
  setCustomerName: (customerName: string) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  setToken: token => set({ token }),
  clearToken: () => set({ token: null }),
  customerName: null,
  setCustomerName: customerName => set({ customerName }),
}));
