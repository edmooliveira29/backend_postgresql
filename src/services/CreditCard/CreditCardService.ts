import { ICreditCardService } from './Interface/ICreditCardService';
import { CreditCards } from '../../models';
import { ICreditCardRepository } from '../../repositories/CreditCard/interface/ICreditCardRepository';

export class CreditCardService implements ICreditCardService {
  private creditCardRepository: ICreditCardRepository

  constructor(CreditCardRepository: ICreditCardRepository) {
    this.creditCardRepository = CreditCardRepository
  }

  async create(CreditCard: CreditCards): Promise<CreditCards> {
    const CreditCardRepository = await this.creditCardRepository.create(CreditCard)
    return CreditCardRepository
  }

  async read(id: string): Promise<CreditCards> {
    const CreditCard = await this.creditCardRepository.read(id)
    return CreditCard
  }

  async update(CreditCard: CreditCards): Promise<CreditCards | null> {
    const CreditCardRepository = await this.creditCardRepository.update(CreditCard)
    return CreditCardRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    return await this.creditCardRepository.delete(id)
  }

  async readAll(): Promise<CreditCards[]> {
    const CreditCards = await this.creditCardRepository.readAll()
    return CreditCards
  }
}
