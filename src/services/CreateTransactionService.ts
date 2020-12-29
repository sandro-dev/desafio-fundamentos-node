import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Omit<Transaction, 'id'>): Transaction {
    const transactionRepository = this.transactionsRepository.create({title, value, type});

    return transactionRepository;
  }
}

export default CreateTransactionService;
