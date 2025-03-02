import { CreditCards } from '../../../models'

export interface ICreditCardService {
  create(revenue: CreditCards): Promise<CreditCards>
  read(id: string): Promise<CreditCards>
  update(revenue: CreditCards): Promise<CreditCards | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<CreditCards[]>
}
