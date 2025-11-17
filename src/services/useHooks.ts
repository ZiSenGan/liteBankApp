import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import api from './axios';
import { Account, LoginRequestParam, LoginResponse, TransactionResponse, TransferRequestParam, TransferResponse } from '../mocks/types';
import { AxiosResponse } from 'axios';

export function useLogin(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<LoginResponse>,
      any,
      LoginRequestParam
    >,
    "mutationFn"
  >
) {
  return useMutation({
    ...options,
    mutationKey: ['login'],
    mutationFn: (payload) => {
      return api.post('/login', payload);
    },
  });
}

export function useTransactions(page: number, pageSize = 10) {
  return useQuery({
    queryKey: ['transactions', page],
    queryFn: async () => {
      const res: AxiosResponse<TransactionResponse> = await api.get('/transactions', {
        params: { page, pageSize },
      });
      console.log('Response: ', res.data);
      return res.data;
    },
    placeholderData: prev => prev,
  });
};

export const useFromAccounts = () => {
  return useQuery<Account[]>({
    queryKey: ['fromAccounts'],
    queryFn: async () => {
      const res: AxiosResponse<Account[]> = await api.get('/accounts/from');
      return res.data;
    },
  });
};

export function useAccount() {
  return useQuery<Account>({
    queryKey: ['account'],
    queryFn: async () => {
      const res: AxiosResponse<Account> = await api.get('/account');
      return res.data;
    },
  });
};

export function useTransfer(
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<TransferResponse>,
      any,
      TransferRequestParam
    >,
    "mutationFn"
  >
) {
  return useMutation({
    ...options,
    mutationKey: ['transfer'],
    mutationFn: (payload) => {
      return api.post('/transfer', payload);
    },
  });
}