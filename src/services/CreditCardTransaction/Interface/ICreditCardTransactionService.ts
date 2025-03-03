import { CreditCardTransactions } from '../../../models'

export interface ICreditCardsTransactionService {
  create(revenue: CreditCardTransactions): Promise<CreditCardTransactions>
  read(id: string): Promise<CreditCardTransactions>
  update(revenue: CreditCardTransactions): Promise<CreditCardTransactions | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<CreditCardTransactions[]>
}
