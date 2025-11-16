// src/mocks/axiosMock.ts
import axios, { AxiosRequestConfig } from "axios";

// Define your mocked endpoints
type MockResponse = {
  status: number;
  data: any;
};

type MockRoute = {
  matcher: (config: AxiosRequestConfig) => boolean;
  response: MockResponse | ((config: AxiosRequestConfig) => MockResponse | Promise<MockResponse>);
};

// Example routes
const routes: MockRoute[] = [
  {
    matcher: config => (config.url?.endsWith("/login") ?? false) && config.method === "post",
    response: async config => ({
      status: 200,
      data: { token: "mocked_token_123", user: { name: "John Doe" } },
    }),
  },
  {
    matcher: config => (config.url?.endsWith("/accounts") ?? false) && config.method === "get",
    response: {
      status: 200,
      data: [
        { id: 1, name: "Main Account" },
        { id: 2, name: "Savings Account" },
      ],
    },
  },
  {
    matcher: config => (config.url?.endsWith("/transactions") ?? false) && config.method === "get",
    response: {
      status: 200,
      data: [
        { id: 101, amount: 100, type: "debit" },
        { id: 102, amount: 50, type: "credit" },
      ],
    },
  },
];

// Setup interceptor
export const setupAxiosMock = () => {
  axios.interceptors.request.use(async config => {
    const route = routes.find(r => r.matcher(config));

    if (route) {
      const res = typeof route.response === "function" ? await route.response(config) : route.response;

      return {
        ...config,
        adapter: async () => ({
          data: res.data,
          status: res.status,
          statusText: "OK",
          headers: {},
          config,
        }),
      };
    }

    return config;
  });
};
