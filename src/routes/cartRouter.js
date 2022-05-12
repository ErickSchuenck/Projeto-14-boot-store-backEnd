import { Router } from "express";
import { getCart, putOnCart, deleteItem } from "../controllers/cartController.js";
import { getUser } from "../middlewares/userMiddleware.js";


const cartRouter = Router();
cartRouter.use(getUser)

// ROTAS DO CARRINHO
cartRouter.get("/cart", getCart);
cartRouter.post("/cart", putOnCart);
cartRouter.delete("/cart", deleteItem);

export default cartRouter;