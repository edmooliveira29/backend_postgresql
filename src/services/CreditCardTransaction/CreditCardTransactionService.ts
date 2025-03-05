import { CreditCardTransactions } from '../../models';
import { ICreditCardRepository } from '../../repositories/CreditCard/interface/ICreditCardRepository';
import { ICreditCardTransactionRepository } from '../../repositories/CreditCardTransaction/interface/ICreditCardTransactionRepository';
import { ICreditCardsTransactionService } from './Interface/ICreditCardTransactionService';

export class CreditCardsTransactionService implements ICreditCardsTransactionService {
  private creditCardTransactionRepository: ICreditCardTransactionRepository
  private creditCardRepository: ICreditCardRepository
  constructor(creditCardTransactionRepository: ICreditCardTransactionRepository, creditCardRepository: ICreditCardRepository) {
    this.creditCardTransactionRepository = creditCardTransactionRepository
    this.creditCardRepository = creditCardRepository
  }

  async create(creditCardTransaction: CreditCardTransactions): Promise<CreditCardTransactions> {
    const creditCardTransactionRepository = await this.creditCardTransactionRepository.create(creditCardTransaction)
    await this.addCreditCardTransactionAmount(creditCardTransaction.credit_card_id.id, creditCardTransaction.amount)
    return creditCardTransactionRepository
  }

  async read(id: string): Promise<CreditCardTransactions> {
    const creditCardTransaction = await this.creditCardTransactionRepository.read(id)
    return creditCardTransaction
  }

  async update(creditCardTransaction: CreditCardTransactions): Promise<CreditCardTransactions | null> {
    const creditCardTransactionRepository = await this.creditCardTransactionRepository.update(creditCardTransaction)
    return creditCardTransactionRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    const creditCardTransaction = await this.read(id)
    await this.removeCreditCardTransactionAmount(creditCardTransaction.credit_card_id.id, creditCardTransaction.amount)
    const creditCardTransactionDeleted = await this.creditCardTransactionRepository.delete(id)
    return creditCardTransactionDeleted
  }

  async readAll(created_by: string): Promise<CreditCardTransactions[]> {
    const CreditCardsTransactions = await this.creditCardTransactionRepository.readAll(created_by)
    CreditCardsTransactions.forEach(creditCardTransaction => {
      if (creditCardTransaction.created_by) {
        delete creditCardTransaction.created_by.password
        delete creditCardTransaction.created_by.created_at
        delete creditCardTransaction.created_by.updated_at
        delete creditCardTransaction.created_by.deleted_at
      }
    })
    return CreditCardsTransactions
  }

  private async addCreditCardTransactionAmount(credit_card: string, amount: number): Promise<void> {
    const creditCard = await this.creditCardRepository.read(credit_card)
    creditCard.total_spent = creditCard.total_spent + amount
    await this.creditCardRepository.update(creditCard)
  }

  private async removeCreditCardTransactionAmount(credit_card: string, amount: number): Promise<void> {
    const creditCard = await this.creditCardRepository.read(credit_card)
    creditCard.total_spent = creditCard.total_spent - amount
    await this.creditCardRepository.update(creditCard)
  }
}
