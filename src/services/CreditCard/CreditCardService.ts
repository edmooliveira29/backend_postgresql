import { ICreditCardService } from './Interface/ICreditCardService';
import { CreditCards } from '../../models';
import { ICreditCardRepository } from '../../repositories/CreditCard/interface/ICreditCardRepository';
import { ICreditCardTransactionRepository } from '../../repositories/CreditCardTransaction/interface/ICreditCardTransactionRepository';

export class CreditCardService implements ICreditCardService {
  private creditCardRepository: ICreditCardRepository
  private creditCardTransactionRepository: ICreditCardTransactionRepository

  constructor(creditCardRepository: ICreditCardRepository, creditCardTransactionRepository: ICreditCardTransactionRepository) {
    this.creditCardRepository = creditCardRepository
    this.creditCardTransactionRepository = creditCardTransactionRepository
  }

  async create(CreditCard: CreditCards): Promise<CreditCards> {
    const creditCardRepository = await this.creditCardRepository.create(CreditCard)
    return creditCardRepository
  }

  async read(id: string): Promise<CreditCards> {
    const creditCard = await this.creditCardRepository.read(id)
    const transactions = await this.creditCardTransactionRepository.readAllByCreditCard(creditCard.id)
    creditCard.total_spent = transactions.reduce((total, transaction) => total + transaction.amount, 0)
    const creditCardUpdated = await this.creditCardRepository.update(creditCard)
    delete creditCardUpdated.created_by.password
    delete creditCardUpdated.created_by.created_at
    delete creditCardUpdated.created_by.updated_at
    delete creditCardUpdated.created_by.deleted_at
    return creditCardUpdated
  }

  async update(CreditCard: CreditCards): Promise<CreditCards | null> {
    const creditCardRepository = await this.creditCardRepository.update(CreditCard)
    return creditCardRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    const transaction = await this.creditCardTransactionRepository.readAllByCreditCard(id)
    transaction.forEach(async transaction => {
      await this.creditCardTransactionRepository.delete(transaction.id)
    })
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
