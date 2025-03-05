import { ExpenseGroups } from '../../models';
import { IExpenseRepository } from '../../repositories/Expense/interface/IExpenseRepository';
import { IExpenseGroupRepository } from '../../repositories/ExpenseGroup/interface/IExpenseGroupRepository';
import { IExpenseGroupService } from './Interface/IExpenseGroupService';

export class ExpensesGroupService implements IExpenseGroupService {
  private expenseRepository: IExpenseRepository
  private expenseGroupRepository: IExpenseGroupRepository

  constructor(expenseRepository: IExpenseRepository, expenseGroupGroupRepository: IExpenseGroupRepository) {
    this.expenseRepository = expenseRepository
    this.expenseGroupRepository = expenseGroupGroupRepository
  }

  async create(expenseGroup: ExpenseGroups): Promise<ExpenseGroups> {
    const expenseGroupRepository = await this.expenseGroupRepository.create(expenseGroup)
    return expenseGroupRepository
  }

  async read(id: string): Promise<ExpenseGroups> {
    const expenseGroup = await this.expenseGroupRepository.read(id)
    const expenses = await this.expenseRepository.readAllByExpensesGroup(expenseGroup.id)
    expenseGroup.total_spent = expenses.reduce((total, expense) => total + expense.value, 0)
    const expenseGroupUpdated = await this.expenseGroupRepository.update(expenseGroup)
    delete expenseGroupUpdated.created_by.password
    delete expenseGroupUpdated.created_by.created_at
    delete expenseGroupUpdated.created_by.updated_at
    delete expenseGroupUpdated.created_by.deleted_at
    return expenseGroupUpdated
  }

  async update(expenseGroup: ExpenseGroups): Promise<ExpenseGroups | null> {
    const expenseGroupRepository = await this.expenseGroupRepository.update(expenseGroup)
    return expenseGroupRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    const expenses = await this.expenseRepository.readAllByExpensesGroup(id)
    expenses.forEach(async expense => {
      await this.expenseRepository.delete(expense.id)
    })
    return await this.expenseGroupRepository.delete(id)
  }

  async readAll(created_by: string): Promise<ExpenseGroups[]> {
    const expenseGroups = await this.expenseGroupRepository.readAll(created_by)
    expenseGroups.forEach(expenseGroups => {
      if (expenseGroups.created_by) {
        delete expenseGroups.created_by.password
        delete expenseGroups.created_by.created_at
        delete expenseGroups.created_by.updated_at
        delete expenseGroups.created_by.deleted_at
      }
    })
    return expenseGroups
  }
}
