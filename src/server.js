import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import productsRouter from "./routes/productsRouter.js";
import adsRouter from "./routes/adsRouter.js";
import cartRouter from "./routes/cartRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// ROTAS
app.use(authRouter);
app.use(adsRouter);
app.use(productsRouter);
app.use(cartRouter);

//PORTA
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(chalk.bold.blue(`Servidor rodando na porta ${port}`)));