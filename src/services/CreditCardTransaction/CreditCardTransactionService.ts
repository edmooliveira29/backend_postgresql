import { ICreditCardTransactionService } from './Interface/ICreditCardTransactionService';
import { CreditCardsTransactions } from '../../models';
import { ICreditCardTransactionRepository } from '../../repositories/CreditCardTransaction/interface/ICreditCardTransactionRepository';

export class CreditCardTransactionService implements ICreditCardTransactionService  {
  private creditCardTransactionRepository: ICreditCardTransactionRepository

  constructor(creditCardTransactionRepository: ICreditCardTransactionRepository) {
    this.creditCardTransactionRepository = creditCardTransactionRepository
  }

  async create(creditCardTransaction: CreditCardsTransactions): Promise<CreditCardsTransactions> {
    const creditCardTransactionRepository = await this.creditCardTransactionRepository.create(creditCardTransaction)
    return creditCardTransactionRepository
  }

  async read(id: string): Promise<CreditCardsTransactions> {
    const creditCardTransaction = await this.creditCardTransactionRepository.read(id)
    return creditCardTransaction
  }

  async update(creditCardTransaction: CreditCardsTransactions): Promise<CreditCardsTransactions | null> {
    const creditCardTransactionRepository = await this.creditCardTransactionRepository.update(creditCardTransaction)
    return creditCardTransactionRepository
  }

  async delete(id: string): Promise<{ deleted: number } | null> {
    return await this.creditCardTransactionRepository.delete(id)
  }

  async readAll(created_by: string): Promise<CreditCardsTransactions[]> {
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
}
