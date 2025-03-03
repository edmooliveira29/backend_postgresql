import { Router } from "express";
import { verifyToken } from '../utils/access-token';
import { CreditCardTransactionController } from '../controllers/CreditCardControllerTransaction';
import { CreditCardsTransactionRepository } from '../repositories/CreditCardTransaction/CreditCardTransactionRepository';
import { CreditCardsTransactionService } from '../services/CreditCardTransaction/CreditCardTransactionService';

const creditCardTransaction: Router = Router();

const creditCardTransactionRepository = new CreditCardsTransactionRepository()
const creditCardsTransactionService = new CreditCardsTransactionService(creditCardTransactionRepository)
const creditCardTransactionController = new CreditCardTransactionController(creditCardsTransactionService)

creditCardTransaction.post("/credit-card-transaction", verifyToken,(req, res) => creditCardTransactionController.create(req, res));
creditCardTransaction.get("/credit-card-transaction/:id", verifyToken, (req, res) => creditCardTransactionController.read(req, res));
creditCardTransaction.put("/credit-card-transaction", verifyToken, (req, res) => creditCardTransactionController.update(req, res));
creditCardTransaction.delete("/credit-card-transaction/:id", verifyToken, (req, res) => creditCardTransactionController.delete(req, res));
creditCardTransaction.get("/credit-card-transactions/:created_by", verifyToken, (req, res) => creditCardTransactionController.readAll(req, res));

export default creditCardTransaction;
