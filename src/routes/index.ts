import express, { Express } from 'express';
import users from "./user";

export default (app: Express) => {
  app.use(express.json());
  app.use(users);
};