import { Router } from "express";
import { loginController } from "../controllers/login/login.ts";

const router = Router();

router.post("/login", loginController);

export default router;