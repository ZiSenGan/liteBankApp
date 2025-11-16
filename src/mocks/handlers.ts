// mocks/handlers.ts
import { http, HttpResponse } from "msw";
import { LoginRequestParam } from "./types";

export const handlers = [
  http.get("https://api.example.com/accounts", () => {
    return HttpResponse.json([
      { id: 1, label: "Savings", value: "1234567890" },
      { id: 2, label: "Current", value: "8888888888" },
    ]);
  }),

  http.post("https://api.example.com/login", async ({ request }) => {

    const body = (await request.json()) as LoginRequestParam;

    return HttpResponse.json({
      status: "success",
      token: "mock-token-123",
      user: body.username,
    });
  }),
];
