import { CreditCardsTransactions } from '../../../models'

export interface ICreditCardTransactionService {
  create(revenue: CreditCardsTransactions): Promise<CreditCardsTransactions>
  read(id: string): Promise<CreditCardsTransactions>
  update(revenue: CreditCardsTransactions): Promise<CreditCardsTransactions | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<CreditCardsTransactions[]>
}
