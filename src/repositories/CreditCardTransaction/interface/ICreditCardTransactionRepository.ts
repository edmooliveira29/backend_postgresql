import { CreditCardsTransactions } from '../../../models';

export interface ICreditCardTransactionRepository {
  create(creditCard: Partial<CreditCardsTransactions>): Promise<CreditCardsTransactions>
  read(id: string): Promise<CreditCardsTransactions>
  update(creditCard: CreditCardsTransactions): Promise<CreditCardsTransactions | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<CreditCardsTransactions[]>
}