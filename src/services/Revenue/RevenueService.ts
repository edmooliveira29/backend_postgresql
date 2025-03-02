import { IRevenueService } from './Interface/IRevenueService';
import { Revenues } from '../../models';
import { IRevenueRepository } from '../../repositories/Revenue/interface/IRevenueRepository';

export class RevenueService implements IRevenueService {
  private revenueRepository: IRevenueRepository

  constructor(revenueRepository: IRevenueRepository) {
    this.revenueRepository = revenueRepository
  }

  async create(revenue: Revenues): Promise<Revenues> {
    const revenueRepository = await this.revenueRepository.create(revenue)
    return revenueRepository
  }

  async read(id: string): Promise<Revenues> {
    const revenue = await this.revenueRepository.read(id)
    return revenue
  }

  async update(revenue: Revenues): Promise<Revenues | null> {
    const revenueRepository = await this.revenueRepository.update(revenue)
    return revenueRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    return await this.revenueRepository.delete(id)
  }

  async readAll(created_by: string): Promise<Revenues[]> {
    const revenues = await this.revenueRepository.readAll(created_by)
    revenues.forEach(revenue => {
      if (revenue.created_by) {
        delete revenue.created_by.password
        delete revenue.created_by.created_at
        delete revenue.created_by.updated_at
        delete revenue.created_by.deleted_at
      }
    })
    return revenues
  }
}
