import db from "../db.js";
import { ObjectId } from "bson";


// FUNÇÃO PARA RECUPERAR O CARRINHO DO USUÁRIO --- BASEADO EM SEU ID
export async function getOrders(req, res) {
    const { user } = res.locals; // VARIÁVEL USER VINDO DE MIDDLEWARE GETUSER
    try {
        const cart = await db.collection("cart").find({userId: ObjectId(user._id)}).toArray();
        res.send(cart);
    } catch (e) {
        console.log("Erro ao carregar produtos do carrinho\n", e);
        return res.sendStatus(500);
    }
}


/*FUNÇÃO PARA O USUÁRIO INSERIR PRODUTOS NO CARRINHO --- 
COLOCA NOME, IMAGEM E VALOR NO CARRINHO ATRELADO AO ID DO USUÁRIO*/
export async function closeCart(req, res) {
    const { body } = req.body;
    const { user } = res.locals; // VARIÁVEL USER VINDO DE MIDDLEWARE GETUSER
    const {cartItems, totalPriceWithFee} = body;

    try {
        await db.collection(`cart`).insertOne({
            userId: user._id,
            totalPrice: totalPriceWithFee,
            cartItems
        });

        res.sendStatus(201);
    } catch (e) {
        console.log("Erro ao fazer pedido\n", e);
        return res.sendStatus(500);
    }
}