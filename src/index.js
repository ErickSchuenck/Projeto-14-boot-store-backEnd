import express, {json} from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

// ROTAS
app.use(authRouter);

//PORTA
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(chalk.bold.blue(`Servidor rodando na porta ${port}`)));