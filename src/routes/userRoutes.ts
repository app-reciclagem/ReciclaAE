import { Router } from "express";
import { CreateUserController } from "../controller/users/CreateUserController";
import { SessionController } from "../controller/SessionController";
import { DeleteUserController } from "../controller/users/DeleteUserController";
import { authenticateToken } from "../middlewares/authenticateToken";
import { ReadUserController } from "../controller/users/ReadUserController";
import { UpdateUserController } from "../controller/users/UpdateUserController";

import { is } from "../middlewares/permissions";

import { CreatePointController } from "../controller/points/CreatePointController";
import { DeletePointController } from "../controller/points/DeletePointController";
import {ReadPointController} from "../controller/points/ReadPointController"
import { UpdatePointController } from "../controller/points/UpdatePointController";
import { ReadUniquePointController } from "../controller/points/ReadUniquePointController";


const routes = Router();

routes.post("/login", new SessionController().handle);
routes.post("/users", new CreateUserController().handle);
routes.delete("/users/:id" , authenticateToken(), is("Admin"),new DeleteUserController().handle);
routes.get("/users/:id" , authenticateToken(), is("Admin"),new ReadUserController().handle);
routes.patch("/users" , authenticateToken(), is("Admin"),new UpdateUserController().handle);

routes.post("/points",authenticateToken(), is("Admin"), new CreatePointController().handle );
routes.delete("/points/:id" , authenticateToken(), is("Admin"), new DeletePointController().handle);
routes.get("/points",authenticateToken(), new ReadPointController().handle);
routes.get("/points/:id", authenticateToken(),new ReadUniquePointController().handle);
routes.patch("/points/:id", authenticateToken(), is("Admin"),new UpdatePointController().handle)


export { routes };

