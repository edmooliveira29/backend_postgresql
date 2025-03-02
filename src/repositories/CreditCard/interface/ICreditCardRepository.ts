import { CreditCards } from '../../../models';

export interface ICreditCardRepository {
  create(creditCard: Partial<CreditCards>): Promise<CreditCards>
  read(id: string): Promise<CreditCards>
  update(creditCard: CreditCards): Promise<CreditCards | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(): Promise<CreditCards[]>
}