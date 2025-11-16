export interface Account {
  name: string;
  balance: number;
  accountNumber: string;
}

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  date: string;
}

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Transfer: undefined;
}

export interface FromAccountList {
  label: string;
  value: string;
}