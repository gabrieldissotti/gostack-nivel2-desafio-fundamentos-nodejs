import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,type,value}: Omit<Transaction, 'id'>): Transaction {
    if (!(['income', 'outcome'].includes(type))) {
      throw new Error('Value of transaction type should be income or outcome');
    }

    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total < value) {
      throw new Error('Insufficient balance');
    }

    const transaction = this.transactionsRepository.create({ title, type, value });

    return transaction;
  }
}

export default CreateTransactionService;
