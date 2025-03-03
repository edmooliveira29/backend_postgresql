import { Repository } from 'typeorm';
import { ICreditCardTransactionRepository } from './interface/ICreditCardTransactionRepository';
import { conection } from '../../database/data-source';
import { CreditCardsTransactions } from '../../models';

export class CreditCardsTransactionRepository implements ICreditCardTransactionRepository {
  private creditCardTransactionRepository: Repository<CreditCardsTransactions>;

  constructor() {
    this.creditCardTransactionRepository = conection.getRepository(CreditCardsTransactions);
  }

  async create(creditCard: CreditCardsTransactions): Promise<CreditCardsTransactions> {
    return await this.creditCardTransactionRepository.save(creditCard);
  }

  async read(id: string): Promise<CreditCardsTransactions> {
    const creditCard = await this.creditCardTransactionRepository.findOneBy({ id })
    return creditCard
  }

  async update(creditCard: CreditCardsTransactions): Promise<CreditCardsTransactions | null> {
    const existingcreditCard = await this.creditCardTransactionRepository.findOne({ where: { id: creditCard.id } });
    if (!existingcreditCard || !creditCard.id) {
      return null;
    }

    Object.assign(existingcreditCard, creditCard);

    return await this.creditCardTransactionRepository.save(existingcreditCard);
  }


  async delete(id: string): Promise<{ deleted: number } | null> {
    const creditCard = await this.creditCardTransactionRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!creditCard || creditCard.deleted_at) {
      return null
    } else {
      return {
        deleted: (await this.creditCardTransactionRepository.softDelete({ id })).affected
      }
    }
  }

  async readAll(created_by: string): Promise<CreditCardsTransactions[]> {
    if(created_by === undefined){
      throw new Error('created_by is undefined')
    }
    
    const creditCardsTransactions = await this.creditCardTransactionRepository.find({
      where: {
        created_by: {
          id: created_by
        }
      },
      relations: ['created_by'],
      select: ["created_at", 'updated_at', 'deleted_at', 'id', 'amount', 'transaction_date','description', 'created_by']
    })
    return creditCardsTransactions
  }
}
