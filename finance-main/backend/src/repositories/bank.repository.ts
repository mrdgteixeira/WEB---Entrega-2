export type Bank = {
  id: string;
  name: string;
};

const banks: Bank[] = [];

export const BankRepository = {
  findAll: () => banks,
  create: (bank: Bank) => {
    banks.push(bank);
    return bank;
  },
};