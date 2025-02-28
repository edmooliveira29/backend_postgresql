import { Repository } from 'typeorm';
import { conection } from '../../database/data-source';
import { Revenue } from '../../models';
import { IRevenueRepository } from './interface/IRevenueRepository';

export class RevenueRepository implements IRevenueRepository {
  private revenueRepository: Repository<Revenue>;

  constructor() {
    this.revenueRepository = conection.getRepository(Revenue)
  }

  async create(revenue: Revenue): Promise<Revenue> {
    return await this.revenueRepository.save(revenue);
  }

  async read(id: string): Promise<Revenue> {
    const revenue = await this.revenueRepository.findOne({ where: { id } })
    return revenue
  }

  async update(revenue: Revenue): Promise<Revenue[]> {
    const revenueData = await this.revenueRepository.findBy({ id: revenue.id });
    return await this.revenueRepository.save(revenueData);
  }

  async delete(id: string): Promise<void> {
    const revenue = await this.revenueRepository.softDelete({ id })
  }

  async readAll(): Promise<Revenue[]> {
    const revenues = await this.revenueRepository.find()
    return revenues

  }
} 