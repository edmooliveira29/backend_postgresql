import { ICreditCardService } from './Interface/ICreditCardService';
import { CreditCards } from '../../models';
import { ICreditCardRepository } from '../../repositories/CreditCard/interface/ICreditCardRepository';

export class CreditCardService implements ICreditCardService {
  private creditCardRepository: ICreditCardRepository

  constructor(creditCardRepository: ICreditCardRepository) {
    this.creditCardRepository = creditCardRepository
  }

  async create(CreditCard: CreditCards): Promise<CreditCards> {
    const creditCardRepository = await this.creditCardRepository.create(CreditCard)
    return creditCardRepository
  }

  async read(id: string): Promise<CreditCards> {
    const creditCard = await this.creditCardRepository.read(id)
    return creditCard
  }

  async update(CreditCard: CreditCards): Promise<CreditCards | null> {
    const creditCardRepository = await this.creditCardRepository.update(CreditCard)
    return creditCardRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    return await this.creditCardRepository.delete(id)
  }

  async readAll(created_by: string): Promise<CreditCards[]> {
    const creditCards = await this.creditCardRepository.readAll(created_by)
    creditCards.forEach(revenue => {
      if (revenue.created_by) {
        delete revenue.created_by.password
        delete revenue.created_by.created_at
        delete revenue.created_by.updated_at
        delete revenue.created_by.deleted_at
      }
    })
    return creditCards
  }
}
