import { Router } from "express";
import { CreditCardsRepository } from '../repositories/CreditCard/CreditCardRepository';
import { verifyToken } from '../utils/access-token';
import { CreditCardService } from '../services/CreditCard/CreditCardService';
import { CreditCardController } from '../controllers/CreditCardController';

const creditCard: Router = Router();

const creditCardRepository = new CreditCardsRepository()
const creditCardService = new CreditCardService(creditCardRepository)
const creditCardController = new CreditCardController(creditCardService)

creditCard.post("/credit-card", verifyToken,(req, res) => creditCardController.create(req, res));
creditCard.get("/credit-card/:id", verifyToken, (req, res) => creditCardController.read(req, res));
creditCard.put("/credit-card", verifyToken, (req, res) => creditCardController.update(req, res));
creditCard.delete("/credit-card/:id", verifyToken, (req, res) => creditCardController.delete(req, res));
creditCard.get("/credit-cards/:created_by", verifyToken, (req, res) => creditCardController.readAll(req, res));

export default creditCard;
