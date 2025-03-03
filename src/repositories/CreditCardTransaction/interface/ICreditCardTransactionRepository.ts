import { CreditCardTransactions } from '../../../models';

export interface ICreditCardTransactionRepository {
  create(creditCard: Partial<CreditCardTransactions>): Promise<CreditCardTransactions>
  read(id: string): Promise<CreditCardTransactions>
  update(creditCard: CreditCardTransactions): Promise<CreditCardTransactions | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<CreditCardTransactions[]>
}