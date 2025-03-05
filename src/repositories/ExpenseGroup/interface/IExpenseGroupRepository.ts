import { ExpenseGroups } from '../../../models';

export interface IExpenseGroupRepository {
  create(expenseGroup: Partial<ExpenseGroups>): Promise<ExpenseGroups>
  read(id: string): Promise<ExpenseGroups>
  update(expenseGroup: ExpenseGroups): Promise<ExpenseGroups | null>
  delete(id: string): Promise<{ deleted: number } | null>
  readAll(created_by: string): Promise<ExpenseGroups[]>
}