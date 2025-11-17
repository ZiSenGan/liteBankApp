import { Account, FromAccountList, Transaction } from "../mocks/types";

export const account: Account = {
  id: 1,
  name: "Zi Sen",
  balance: 4321.75,
  accountNo: "123-456-789",
};

export const transactions: Transaction[] = [
  { id: 1, title: "GrabPay Topup", amount: -20, date: "2025-02-20" },
  { id: 2, title: "Salary Credit", amount: 4500, date: "2025-02-18" },
  { id: 3, title: "Shopee Purchase", amount: -65.5, date: "2025-02-17" },
  { id: 4, title: "Transfer to Mum", amount: -200, date: "2025-02-15" },
  { id: 5, title: "GrabPay Topup", amount: -20, date: "2025-02-20" },
  { id: 6, title: "Salary Credit", amount: 4500, date: "2025-02-18" },
  { id: 7, title: "Shopee Purchase", amount: -65.5, date: "2025-02-17" },
  { id: 8, title: "Transfer to Mum", amount: -200, date: "2025-02-15" },
  { id: 9, title: "GrabPay Topup", amount: -20, date: "2025-02-20" },
  { id: 10, title: "Salary Credit", amount: 4500, date: "2025-02-18" },
  { id: 11, title: "Shopee Purchase", amount: -65.5, date: "2025-02-17" },
  { id: 12, title: "Transfer to Mum", amount: -200, date: "2025-02-15" },
  { id: 13, title: "GrabPay Topup", amount: -20, date: "2025-02-20" },
  { id: 14, title: "Salary Credit", amount: 4500, date: "2025-02-18" },
  { id: 15, title: "Shopee Purchase", amount: -65.5, date: "2025-02-17" },
  { id: 16, title: "Transfer to Mum", amount: -200, date: "2025-02-15" },
];

export const fromAccountList: FromAccountList[] = [
  { label: "Saving Account 1", value: "123456789" },
  { label: "Current Account 1", value: "987654321" },
];