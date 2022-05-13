import { Router } from "express";

import { getProducts, postProduct } from "../controllers/productsController.js";

import { getUser } from "../middlewares/userMiddleware.js";

const productsRouter = Router();

//CHECA TOKEN DO USUÁRIO
// productsRouter.use(getUser);


// ROTAS DE PRODUTOS
productsRouter.get("/products", getProducts);
productsRouter.post("/product", getUser, postProduct);

export default productsRouter;