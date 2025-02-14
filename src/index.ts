import routes from "./routes";
import express from "express";

export const app = express();

routes(app);

