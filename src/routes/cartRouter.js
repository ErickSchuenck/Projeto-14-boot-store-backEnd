import { Router } from "express";
import { getOrders, closeCart } from "../controllers/cartController.js";
import { getUser } from "../middlewares/userMiddleware.js";


const cartRouter = Router();
cartRouter.use(getUser)

// ROTAS DO CARRINHO
cartRouter.get("/cart", getOrders);
cartRouter.post("/cart", closeCart);

export default cartRouter;