import { Repository } from 'typeorm';
import { ICreditCardRepository } from './interface/ICreditCardRepository';
import { conection } from '../../database/data-source';
import { CreditCards } from '../../models';

export class CreditCardsRepository implements ICreditCardRepository {
  private creditCardRepository: Repository<CreditCards>;

  constructor() {
    this.creditCardRepository = conection.getRepository(CreditCards);
  }

  async create(creditCard: CreditCards): Promise<CreditCards> {
    return await this.creditCardRepository.save(creditCard);
  }

  async read(id: string): Promise<CreditCards> {
    const creditCard = await this.creditCardRepository.findOneBy({ id })
    return creditCard
  }

  async update(creditCard: CreditCards): Promise<CreditCards | null> {
    const existingcreditCard = await this.creditCardRepository.findOne({ where: { id: creditCard.id } });
    if (!existingcreditCard || !creditCard.id) {
      return null;
    }

    Object.assign(existingcreditCard, creditCard);

    return await this.creditCardRepository.save(existingcreditCard);
  }


  async delete(id: string): Promise<{ deleted: number } | null> {
    const creditCard = await this.creditCardRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!creditCard || creditCard.deleted_at) {
      return null
    } else {
      return {
        deleted: (await this.creditCardRepository.softDelete({ id })).affected
      }
    }
  }

  async readAll(): Promise<CreditCards[]> {
    const CreditCards = await this.creditCardRepository.find()
    return CreditCards
  }
}
