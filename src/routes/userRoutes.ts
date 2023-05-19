import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";
import { SessionController } from "../controller/SessionController";
const routes = Router();

routes.post("/login", new SessionController().handle);
routes.post("/users", new CreateUserController().handle);

export { routes };

