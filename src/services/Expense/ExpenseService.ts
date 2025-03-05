import { IExpenseService } from './Interface/IExpenseService';
import { Expenses } from '../../models';
import { IExpenseRepository } from '../../repositories/Expense/interface/IExpenseRepository';
import { IExpenseGroupRepository } from '../../repositories/ExpenseGroup/interface/IExpenseGroupRepository';

export class ExpenseService implements IExpenseService {
  private expenseRepository: IExpenseRepository
  private expenseGroupRepository: IExpenseGroupRepository

  constructor(expenseRepository: IExpenseRepository, expenseGroupRepository: IExpenseGroupRepository) {
    this.expenseRepository = expenseRepository
    this.expenseGroupRepository = expenseGroupRepository
  }

  async create(expense: Expenses): Promise<Expenses> {
    const expenseRepository = await this.expenseRepository.create(expense)
    await this.addValueInExpenseGroup(expense.expense_group_id.id, expense.value)
    return expenseRepository
  }

  async read(id: string): Promise<Expenses> {
    const expense = await this.expenseRepository.read(id)
    const expenseUpdated = await this.expenseRepository.update(expense)
    delete expenseUpdated.created_by.password
    delete expenseUpdated.created_by.created_at
    delete expenseUpdated.created_by.updated_at
    delete expenseUpdated.created_by.deleted_at
    return expenseUpdated
  }

  async update(expense: Expenses): Promise<Expenses | null> {
    const expenseRepository = await this.expenseRepository.update(expense)
    return expenseRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    const expense = await this.read(id)
    console.log(expense)
    await this.removeValueInExpenseGroup(expense.expense_group_id.id, expense.value)
    return await this.expenseRepository.delete(id)
  }

  async readAll(created_by: string): Promise<Expenses[]> {
    const expensesGroups = await this.expenseRepository.readAll(created_by)
    expensesGroups.forEach(expenses => {
      if (expenses.created_by) {
        delete expenses.created_by.password
        delete expenses.created_by.created_at
        delete expenses.created_by.updated_at
        delete expenses.created_by.deleted_at
      }
    })
    return expensesGroups
  }

  async addValueInExpenseGroup(expense_group_id: string, value: number): Promise<void> {
    const expenseGroup = await this.expenseGroupRepository.read(expense_group_id)
    expenseGroup.total_spent = expenseGroup.total_spent + value
    await this.expenseGroupRepository.update(expenseGroup)
  }

  async removeValueInExpenseGroup(expense_group_id: string, value: number): Promise<void> {
    const expenseGroup = await this.expenseGroupRepository.read(expense_group_id)
    expenseGroup.total_spent = expenseGroup.total_spent - value
    await this.expenseGroupRepository.update(expenseGroup)
  }
}
