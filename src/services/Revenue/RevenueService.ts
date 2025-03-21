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

  async readAll(): Promise<Revenues[]> {
    const revenues = await this.revenueRepository.readAll()
    return revenues
  }
}
