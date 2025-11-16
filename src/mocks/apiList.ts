import { http, HttpResponse } from 'msw'
import { LoginRequestParam } from './types';
import api from '../services/axios';

export const loginMock = [
  http.post(`${api}/login`, async ({ request }) => {
    const body = await request.json() as LoginRequestParam;

    if (body.username === 'admin' && body.password === '1234') {
      return HttpResponse.json(
        { token: 'mock-jwt-token-123' },
        { status: 200 }
      )
    }

    return HttpResponse.json(
      { message: 'Invalid username or password' },
      { status: 401 }
    )
  })
]