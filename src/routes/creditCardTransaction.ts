import { Router } from "express";
import { verifyToken } from '../utils/access-token';
import { CreditCardTransactionService } from '../services/CreditCardTransaction/CreditCardTransactionService';
import { CreditCardTransactionController } from '../controllers/CreditCardControllerTransaction';
import { CreditCardsTransactionRepository } from '../repositories/CreditCardTransaction/CreditCardTransactionRepository';

const creditCardTransaction: Router = Router();

const creditCardTransactionRepository = new CreditCardsTransactionRepository()
const creditCardTransactionService = new CreditCardTransactionService(creditCardTransactionRepository)
const creditCardTransactionController = new CreditCardTransactionController(creditCardTransactionService)

creditCardTransaction.post("/credit-card-transaction", verifyToken,(req, res) => creditCardTransactionController.create(req, res));
creditCardTransaction.get("/credit-card-transaction/:id", verifyToken, (req, res) => creditCardTransactionController.read(req, res));
creditCardTransaction.put("/credit-card-transaction", verifyToken, (req, res) => creditCardTransactionController.update(req, res));
creditCardTransaction.delete("/credit-card-transaction/:id", verifyToken, (req, res) => creditCardTransactionController.delete(req, res));
creditCardTransaction.get("/credit-card-transactions/:created_by", verifyToken, (req, res) => creditCardTransactionController.readAll(req, res));

export default creditCardTransaction;
