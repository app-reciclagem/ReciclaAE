import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";
import { SessionController } from "../controller/SessionController";
import { DeleteUserController } from "../controller/DeleteUserController";
import { authenticateToken } from "../middlewares/authenticateToken";
import { ReadUserController } from "../controller/ReadUserController";
import { UpdateUserController } from "../controller/UpdateUserController";
import { is } from "../middlewares/permissions";

const routes = Router();

routes.post("/login", new SessionController().handle);
routes.post("/users", new CreateUserController().handle);
routes.delete("/users/:id" , authenticateToken(), is("Admin"),new DeleteUserController().handle);
routes.get("/users/:id" , authenticateToken(), is("Admin"),new ReadUserController().handle);
routes.patch("/users" , authenticateToken(), is("Admin"),new UpdateUserController().handle);

export { routes };

