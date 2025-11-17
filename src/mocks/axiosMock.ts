import MockAdapter from "axios-mock-adapter";
import api from "../services/axios";
import { Transaction } from "../types";

const mock = new MockAdapter(api, { delayResponse: 500 });

// Mock: POST /login
mock.onPost("/login").reply(config => {
  const body = JSON.parse(config.data);

  if (body.username === "admin" && body.password === "123") {
    return [200, { token: "mock-token-123" }];
  }

  return [401, { message: "Invalid credentials" }];
});


mock.onGet("/profile").reply(200, {
  id: 1,
  name: "Mock User",
  email: "mock@example.com",
});

const transactions = Array.from({ length: 45 }).map((_, index) => ({
  id: index + 1,
  title: `Transaction #${index + 1}`,
  amount: (Math.random() * 100).toFixed(2),
  date: Date.now(),
}));

mock.onGet("/transactions").reply((config) => {
  // page & pageSize from your frontend request
  const page = Number(config.params?.page ?? 1);
  const pageSize = Number(config.params?.pageSize ?? 10);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return [
    200,
    {
      page,
      pageSize,
      total: transactions.length,
      data: transactions.slice(start, end),
      hasMore: end < transactions.length,
    },
  ];
});


export default mock;
