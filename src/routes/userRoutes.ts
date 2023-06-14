import { Router } from "express";
import { CreateUserController } from "../controller/users/CreateUserController";
import { SessionController } from "../controller/SessionController";
import { DeleteUserController } from "../controller/users/DeleteUserController";
import { authenticateToken } from "../middlewares/authenticateToken";
import { ReadUserController } from "../controller/users/ReadUserController";
import { UpdateUserController } from "../controller/users/UpdateUserController";
import { is } from "../middlewares/permissions";
import { CreatePointController } from "../controller/points/CreatePointController";

const routes = Router();

routes.post("/login", new SessionController().handle);
routes.post("/users", new CreateUserController().handle);
routes.delete("/users/:id" , authenticateToken(), is("Admin"),new DeleteUserController().handle);
routes.get("/users/:id" , authenticateToken(), is("Admin"),new ReadUserController().handle);
routes.patch("/users" , authenticateToken(), is("Admin"),new UpdateUserController().handle);

routes.post("/points",authenticateToken(), is("Admin"), new CreatePointController().handle );

export { routes };

