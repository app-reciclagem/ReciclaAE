import { Router } from "express";
import { SessionController } from "../controller/SessionController";

const routes = Router();

routes.post("/login", new SessionController().handle);

export { routes };
