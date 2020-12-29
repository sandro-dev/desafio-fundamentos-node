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

    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, currentArray) => total + currentArray.value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, currentArray) => total + currentArray.value, 0);

      const total = income - outcome;

      return { income, outcome, total };
  }

  public create({title, value, type}: Omit<Transaction, 'id'>): Transaction {

    if(type === 'outcome') {
      const balance = this.getBalance().total;

      if(balance < value) {
        throw Error('balance insufficient');
      }

    }

    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
