export interface FromAccountList {
  label: string;
  value: string;
}
export interface Transaction {
  id: number;
  title: string;
  amount: number;
  date: string;
}

export type LoginRequestParam = {
  username: string; 
  password: string;
}

export interface LoginResponse {
  token: string;
  customerName: string;
}

export type Account = {
  id: number;
  name: string;
  balance: number;
  accountNo: string;
};

export interface TransactionResponse {
  page: number;
  pageSize: number;
  total: number;
  data: Transaction[];
  hasMore: boolean;
}

export type TransferRequestParam = {
  fromAccount: string;
  recipient: string;
  amount: string;
  note?: string;
};

export type TransferResponse = {
  id: number;
  fromAccount: string;
  recipient: string;
  amount: string;
  note?: string;
  date: string;
}