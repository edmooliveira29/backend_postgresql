import { Expenses } from '../../../models'

export interface IExpenseService {
  create(expense: Expenses): Promise<Expenses>
  read(id: string): Promise<Expenses>
  update(expense: Expenses): Promise<Expenses | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<Expenses[]>
}
