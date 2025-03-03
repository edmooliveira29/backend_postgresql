import { Repository } from 'typeorm';
import { ICreditCardTransactionRepository } from './interface/ICreditCardTransactionRepository';
import { conection } from '../../database/data-source';
import { CreditCardTransactions } from '../../models';

export class CreditCardsTransactionRepository implements ICreditCardTransactionRepository {
  private creditCardTransactionRepository: Repository<CreditCardTransactions>;

  constructor() {
    this.creditCardTransactionRepository = conection.getRepository(CreditCardTransactions);
  }

  async create(creditCard: CreditCardTransactions): Promise<CreditCardTransactions> {
    return await this.creditCardTransactionRepository.save(creditCard);
  }

  async read(id: string): Promise<CreditCardTransactions> {
    const creditCard = await this.creditCardTransactionRepository.findOneBy({ id })
    return creditCard
  }

  async update(creditCard: CreditCardTransactions): Promise<CreditCardTransactions | null> {
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

  async readAll(created_by: string): Promise<CreditCardTransactions[]> {
    if (created_by === undefined) {
      throw new Error('created_by is undefined')
    }

    const CreditCardsTransactions = await this.creditCardTransactionRepository.find({
      where: {
        created_by: {
          id: created_by
        }
      },
      relations: ['created_by'],
      select: ["created_at", 'updated_at', 'deleted_at', 'id', 'amount', 'transaction_date', 'description', 'created_by']
    })
    return CreditCardsTransactions
  }

  readAllByCreditCard(credit_card_id: string): Promise<CreditCardTransactions[]> {
    return this.creditCardTransactionRepository.find({
      where: { credit_card_id: {id: credit_card_id} },
      relations: ["credit_card_id"],
    });
  }
}
