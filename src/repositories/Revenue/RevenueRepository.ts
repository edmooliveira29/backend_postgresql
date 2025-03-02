import { Repository } from 'typeorm';
import { conection } from '../../database/data-source';
import { Revenues } from '../../models';
import { IRevenueRepository } from './interface/IRevenueRepository';

export class RevenueRepository implements IRevenueRepository {
  private revenueRepository: Repository<Revenues>;

  constructor() {
    this.revenueRepository = conection.getRepository(Revenues)
  }

  async create(revenue: Revenues): Promise<Revenues> {
    return await this.revenueRepository.save(revenue);
  }

  async read(id: string): Promise<Revenues> {
    const revenue = await this.revenueRepository.findOneBy({ id })
    return revenue
  }

  async update(revenue: Revenues): Promise<Revenues | null> {
    const existingRevenue = await this.revenueRepository.findOne({ where: { id: revenue.id } });
    if (!existingRevenue || !revenue.id) {
      return null;
    }

    Object.assign(existingRevenue, revenue);

    return await this.revenueRepository.save(existingRevenue);
  }


  async delete(id: string): Promise<{ deleted: number } | null> {
    const revenue = await this.revenueRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!revenue || revenue.deleted_at) {
      return null
    } else {
      return {
        deleted: (await this.revenueRepository.softDelete({ id })).affected
      }
    }
  }

  async readAll(created_by: string): Promise<Revenues[]> {
    const revenues = await this.revenueRepository.find({
      where: {
        created_by: {
          id: created_by
        }
      },
      relations: ['created_by'], 
      select: ["created_at", 'updated_at', 'deleted_at', 'id', 'description', 'value', 'date', 'created_by']
    })
    return revenues
  }
} 