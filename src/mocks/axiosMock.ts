import MockAdapter from 'axios-mock-adapter';
import api from '../services/axios';
import {
  Account,
  LoginResponse,
  Transaction,
  TransactionResponse,
  TransferRequestParam,
} from './types';

const mock = new MockAdapter(api, { delayResponse: 500 });

// Mock: POST /login
mock.onPost('/login').reply(config => {
  const body = JSON.parse(config.data);

  if (body.username === 'admin' && body.password === '123') {
    const response: LoginResponse = {
      token: 'mocked-token-123',
      customerName: 'John Doe',
    };

    return [200, response];
  }

  return [401, { message: 'Invalid credentials' }];
});

mock.onGet('/profile').reply(200, {
  id: 1,
  name: 'Mock User',
  email: 'mock@example.com',
});

const account: Account = {
  id: 1,
  name: 'Saving Account',
  balance: 1250.75,
  accountNo: '123456789',
};

// Mock GET /account
mock.onGet('/account').reply(200, account);

// Mock GET /accounts/from
mock.onGet('/accounts/from').reply(200, [account]);

const transactions: Transaction[] = Array.from({ length: 45 }).map(
  (_, index) => {
    const amount = (Math.random() * 100).toFixed(2);
    const sign = Math.random() < 0.5 ? -1 : 1;
    return {
      id: index + 1,
      title: `Transaction #${index + 1}`,
      amount: Number(amount) * sign, // apply sign
      date: Date.now().toString(),
    };
  },
);

mock.onGet('/transactions').reply(config => {
  const page = Number(config.params?.page ?? 1);
  const pageSize = Number(config.params?.pageSize ?? 10);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const response: TransactionResponse = {
    page,
    pageSize,
    total: transactions.length,
    data: transactions.slice(start, end),
    hasMore: end < transactions.length,
  };

  return [200, response];
});

mock.onPost('/transfer').reply(config => {
  try {
    const data: TransferRequestParam = JSON.parse(config.data);

    // Basic validation
    if (!data.fromAccount || !data.recipient || !data.amount) {
      return [400, { message: 'Missing required fields' }];
    }

    // Optional: simulate success/failure randomly
    if (Number(data.amount) <= 0) {
      return [400, { message: 'Amount must be greater than 0' }];
    }

    return [
      200,
      {
        status: 'success',
        message: `Transferred ${data.amount} from ${data.fromAccount} to ${data.recipient}`,
        transaction: {
          id: Date.now(),
          ...data,
          date: new Date().toISOString(),
        },
      },
    ];
  } catch (error) {
    return [500, { message: 'Invalid request data' }];
  }
});

export default mock;
