import { Router } from "express";

import { signUp, signIn, signOut, deleteAccount, editAccount } from "../controllers/authController.js";
import { validateSignIn, validateSignUp } from "../middlewares/authMiddleware.js";
import { getUser } from "../middlewares/userMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/sign-in", validateSignIn, signIn);
authRouter.get("/sign-out", signOut);
authRouter.delete("/sign-up", getUser, deleteAccount);
authRouter.put("/sign-up", getUser, editAccount);

export default authRouter;