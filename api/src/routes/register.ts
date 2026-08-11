import { Router } from "express";
import { registerController } from "../controllers/register.ts";

const router = Router();

router.post("/register", registerController);

export default router;