export type Transaction = {
  id: string;
  descricao: string;
  tipo: 'Crédito' | 'Débito';
  valor: number;
  banco: string;
  data: string;
  parcelas: string;
  categoria: string;
};

const transactions: Transaction[] = [];

export const TransactionRepository = {
  findAll: () => transactions,
  create: (transaction: Transaction) => {
    transactions.push(transaction);
    return transaction;
  },
};