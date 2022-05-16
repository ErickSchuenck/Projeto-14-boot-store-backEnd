import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let db = null;
// CRIAR ARQUIVO .env
// MONGO_URL = mongodb://127.0.0.1:27017
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    // NOME DO BANCO DE DADOS NO .env ((no meu caso coloquei "flexStore"))
    db = mongoClient.db('flexStore');
    console.log(chalk.bold.blue("Banco de dados conectado"))
} catch (e) {
    console.log(chalk.bold.red("Erro ao conectar ao banco de dados\n"), e);
}

export default db;