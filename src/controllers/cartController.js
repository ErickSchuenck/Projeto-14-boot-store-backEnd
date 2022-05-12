import db from "../db.js";
import { ObjectId } from "bson";


// FUNÇÃO PARA RECUPERAR O CARRINHO DO USUÁRIO --- BASEADO EM SEU ID
export async function getCart(req, res) {
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
export async function putOnCart(req, res) {
    const { _id} = req.body;
    const { user } = res.locals; // VARIÁVEL USER VINDO DE MIDDLEWARE GETUSER

    try {
        const product = await db.collection("products").findOne({_id: ObjectId(_id)});
        console.log(product);
        if (!product) return res.sendStatus(404); // ITEM NAO ENCONTRADO 

        await db.collection("cart").insertOne({
            name: product.name,
            image: product.image,
            value:product.value,
            userId: user._id
        });

        res.sendStatus(201);
    } catch (e) {
        console.log("Erro ao adicionar o produto no carrinho\n", e);
        return res.sendStatus(500);
    }
}


// DELETA ITEM DO CARRINHO 
export async function deleteItem (req, res){
    const { user } = res.locals;
    const { _id} = req.body;
    try {
        const product = await db.collection("cart").findOne({_id: ObjectId(_id), userId: user._id});
        console.log(product);
        if (!product) return res.sendStatus(404); // ITEM NAO ENCONTRADO NO CARRINHO

        await db.collection("cart").deleteOne(product);

        res.sendStatus(200);
    } catch (e) {
        console.log("Erro ao retirar o produto no carrinho\n", e);
        return res.sendStatus(500);
    }
}