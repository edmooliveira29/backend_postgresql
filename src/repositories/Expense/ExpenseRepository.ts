import { Repository } from 'typeorm';
import { IExpenseRepository } from './interface/IExpenseRepository';
import { conection } from '../../database/data-source';
import { Expenses } from '../../models';

export class ExpensesRepository implements IExpenseRepository {
  private expenseRepository: Repository<Expenses>;

  constructor() {
    this.expenseRepository = conection.getRepository(Expenses);
  }

  async create(expense: Expenses): Promise<Expenses> {
    return await this.expenseRepository.save(expense);
  }

  async read(id: string): Promise<Expenses> {
    const expense = await this.expenseRepository.findOne({
      where: { id },
      relations: ['created_by', "expense_group_id"],
      select: ['id', 'description', 'due_date', 'limit', 'remaining_balance', 'spending_status', "created_by", "expense_group_id"]
    });
    return expense
  }

  async update(expense: Expenses): Promise<Expenses | null> {
    const existingexpense = await this.expenseRepository.findOne({ where: { id: expense.id } });
    if (!existingexpense || !expense.id) {
      return null;
    }

    Object.assign(existingexpense, expense);

    return await this.expenseRepository.save(existingexpense);
  }


  async delete(id: string): Promise<{ deleted: number } | null> {
    const expense = await this.expenseRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!expense || expense.deleted_at) {
      return null
    } else {
      return {
        deleted: (await this.expenseRepository.softDelete({ id })).affected
      }
    }
  }

  async readAll(created_by: string): Promise<Expenses[]> {
    if (created_by === undefined) {
      throw new Error('created_by is undefined')
    }

    const expenses = await this.expenseRepository.find({
      where: {
        created_by: {
          id: created_by
        }
      },
      relations: ['created_by'],
      select: ['id', 'description', 'due_date', 'limit', 'remaining_balance', 'spending_status', "created_by"]
    })
    return expenses
  }
  async readAllByExpensesGroup(expense_group_id: string): Promise<Expenses[]> {
    const expenses = await this.expenseRepository.find({
      where: {
        expense_group_id: {
          id: expense_group_id
        }
      },
      relations: ['created_by'],
      select: ['id', 'description', 'due_date', 'limit', 'remaining_balance', 'spending_status', "created_by"]
    })
    return expenses
  }
}
