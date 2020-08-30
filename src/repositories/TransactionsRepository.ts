import { uuid } from 'uuidv4';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce<Balance>((acumulative, { type, value }) => ({
      ...acumulative,
      ...(type === 'income' && {
        income: acumulative.income + value,
      }),
      ...(type === 'outcome' && {
        outcome: acumulative.outcome + value,
      }),
    }), {
      income: 0,
      outcome: 0,
      total: 0
    })

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ value, type, title }: Omit<Transaction, 'id'>): Transaction {
    const id = uuid();

    const transaction = { id, value, type, title };

    this.transactions.push({ id, value, type, title });

    return transaction;
  }
}

export default TransactionsRepository;
