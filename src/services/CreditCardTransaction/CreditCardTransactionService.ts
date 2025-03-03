import { CreditCardTransactions } from '../../models';
import { ICreditCardTransactionRepository } from '../../repositories/CreditCardTransaction/interface/ICreditCardTransactionRepository';
import { ICreditCardsTransactionService } from './Interface/ICreditCardTransactionService';

export class CreditCardsTransactionService implements ICreditCardsTransactionService  {
  private creditCardTransactionRepository: ICreditCardTransactionRepository

  constructor(creditCardTransactionRepository: ICreditCardTransactionRepository) {
    this.creditCardTransactionRepository = creditCardTransactionRepository
  }

  async create(creditCardTransaction: CreditCardTransactions): Promise<CreditCardTransactions> {
    const creditCardTransactionRepository = await this.creditCardTransactionRepository.create(creditCardTransaction)
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
    return await this.creditCardTransactionRepository.delete(id)
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
}
