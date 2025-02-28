import express, { Express } from 'express';
import users from "./user";
import login from "./login";
import revenue from './revenue';

export default (app: Express) => {
  app.use(express.json());
  app.use(users);
  app.use(login)
  app.use(revenue)
};