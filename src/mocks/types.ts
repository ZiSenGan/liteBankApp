import { Transaction } from "../types";

export type LoginRequestParam = {
  username: string; 
  password: string;
}

export interface TransactionResponse {
  page: number;
  pageSize: number;
  total: number;
  data: Transaction[];
  hasMore: boolean;
}