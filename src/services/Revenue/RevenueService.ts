import bcrypt from "bcrypt";
import { IRevenueService } from './Interface/IRepositoryService';
import { IRevenueRepository } from '../../repositories/Revenue/interface/IRevenueRepository';
import { Revenue } from '../../models';

export class RevenueService implements IRevenueService {
  private revenueRepository: IRevenueRepository

  constructor(revenueRepository: IRevenueRepository) {
    this.revenueRepository = revenueRepository
  }

  async create(revenue: Revenue): Promise<Revenue> {
    const revenueRepository = await this.revenueRepository.create(revenue)
    return revenueRepository
  }

  async read(id: string): Promise<Revenue> {
    const revenue = await this.revenueRepository.read(id)
    return revenue
  }

  async update(revenue: Revenue): Promise<Revenue[]> {
    const revenueRepository = await this.revenueRepository.update(revenue)
    return revenueRepository
  }

  async delete(id: string): Promise<{ message: string }> {
    await this.revenueRepository.delete(id)
    return {
      message: "Receita deletada com sucesso!"
    }
  }

  async readAll(): Promise<Revenue[]> {
    const revenues = await this.revenueRepository.readAll()
    return revenues
  }
}
