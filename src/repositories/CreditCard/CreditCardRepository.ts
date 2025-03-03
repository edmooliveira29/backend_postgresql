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
    const creditCard = await this.creditCardRepository.findOne({ 
      where: { id }, 
      relations: ['created_by'],
      select: ['id', "name", "total_spent", "created_by"] });
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

  async readAll(created_by: string): Promise<CreditCards[]> {
    if(created_by === undefined){
      throw new Error('created_by is undefined')
    }
    
    const creditCards = await this.creditCardRepository.find({
      where: {
        created_by: {
          id: created_by
        }
      },
      relations: ['created_by'],
      select: ["created_at", 'updated_at', 'deleted_at', 'id', "limit", 'total_spent', 'name', 'transactions', 'created_by']
    })
    console.log(creditCards)
    return creditCards
  }
}
