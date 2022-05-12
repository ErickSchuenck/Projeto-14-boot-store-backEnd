import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// ROTAS
app.use(authRouter);
app.use(productsRouter);

//PORTA
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(chalk.bold.blue(`Servidor rodando na porta ${port}`)));