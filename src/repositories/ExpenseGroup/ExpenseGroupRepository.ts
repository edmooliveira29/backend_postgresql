import { Repository } from 'typeorm';
import { IExpenseGroupRepository } from './interface/IExpenseGroupRepository';
import { conection } from '../../database/data-source';
import { ExpenseGroups } from '../../models';

export class ExpenseGroupRepository implements IExpenseGroupRepository {
  private expenseGroupRepository: Repository<ExpenseGroups>;

  constructor() {
    this.expenseGroupRepository = conection.getRepository(ExpenseGroups);
  }

  async create(expenseGroup: ExpenseGroups): Promise<ExpenseGroups> {
    return await this.expenseGroupRepository.save(expenseGroup);
  }

  async read(id: string): Promise<ExpenseGroups> {
    const expenseGroup = await this.expenseGroupRepository.findOne({
      where: { id },
      relations: ['created_by'],
      select: ['id', 'expenses','name','total_spent', "created_by"]
    });
    return expenseGroup
  }

  async update(expenseGroup: ExpenseGroups): Promise<ExpenseGroups | null> {
    const existingexpenseGroup = await this.expenseGroupRepository.findOne({ where: { id: expenseGroup.id } });
    if (!existingexpenseGroup || !expenseGroup.id) {
      return null;
    }

    Object.assign(existingexpenseGroup, expenseGroup);

    return await this.expenseGroupRepository.save(existingexpenseGroup);
  }


  async delete(id: string): Promise<{ deleted: number } | null> {
    const expenseGroup = await this.expenseGroupRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!expenseGroup || expenseGroup.deleted_at) {
      return null
    } else {
      return {
        deleted: (await this.expenseGroupRepository.softDelete({ id })).affected
      }
    }
  }

  async readAll(created_by: string): Promise<ExpenseGroups[]> {
    if (created_by === undefined) {
      throw new Error('created_by is undefined')
    }

    const expenseGroups = await this.expenseGroupRepository.find({
      where: {
        created_by: {
          id: created_by
        }
      },
      relations: ['created_by'],
      select: ['id', 'expenses','name','total_spent', "created_by"]
    })
    return expenseGroups
  }
}
