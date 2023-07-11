import { Router } from "express";
import { SessionController } from "../controller/SessionController";

const authRoutes = Router();

authRoutes.post("/auth/user", new SessionController().handle);

export default authRoutes;
