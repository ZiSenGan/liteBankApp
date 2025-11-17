import { useQuery } from "@tanstack/react-query";
import api from "./axios";
import { TransactionResponse } from "../mocks/types";

export function useTransactions(page: number, pageSize = 10) {
  return useQuery({
    queryKey: ["transactions", page],
    queryFn: async () => {
      const res = await api.get("/transactions", {
        params: { page, pageSize }
      });
      console.log("Response: ", res.data);
      return res.data as TransactionResponse;
    },
    placeholderData: (prev) => prev,
  });
}