import db from "../db.js";

import productSchema from "../schemas/productSchema.js";

export async function getProducts(req, res) {
    // const { user } = res.locals; // VARIÁVEL USER VINDO DE MIDDLEWARE GETUSER
    try {
        const products = await db.collection("products").find().toArray();
        res.send(products);
    } catch (e) {
        console.log("Erro ao carregar produtos\n", e);
        return res.sendStatus(500);
    }
}


//FUNÇÃO PARA O USUÁRIO INSERIR PRODUTOS NA LOJA --- AINDA SEM O NOME DO VENDEDOR, POIS SERÁ A ULTIMA ETAPA
export async function postProduct(req, res) {
    const { body } = req;

    const { error } = productSchema.validate(body);
    if (error) return res.status(422).send(error.details.map(detail => detail.message)); // FORMATO ERRADO

    // const { user } = res.locals; // VARIÁVEL USER VINDO DE MIDDLEWARE GETUSER
    try {
        const { name, image, value } = req.body;
        await db.collection("products").insertOne({
            name,
            image,
            value,
            timesItWasBought: 0
            // seller: user._id
            // DAY.JS PARA RESGATAR PRODUTOS MAIS RECENTES
        });

        res.sendStatus(201);
    } catch (e) {
        console.log("Erro ao adicionar o produto\n", e);
        return res.sendStatus(500);
    }
}