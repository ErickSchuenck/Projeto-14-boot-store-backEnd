import { Router } from "express";

import { getAds } from "../controllers/adsController.js";

const adsRouter = Router();

// ROTAS DE PRODUTOS
adsRouter.get("/ads", getAds);

export default adsRouter;