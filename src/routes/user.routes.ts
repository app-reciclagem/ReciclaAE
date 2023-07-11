import { Router } from "express";
import { CreateUserController } from "../controller/users/CreateUserController";
import { DeleteUserController } from "../controller/users/DeleteUserController";
import { ReadUserController } from "../controller/users/ReadUserController";
import { UpdateUserController } from "../controller/users/UpdateUserController";
import { authenticateToken } from "../middlewares/authenticateToken";

import { is } from "../middlewares/permissions";

const usersRoutes = Router();

usersRoutes.post("/users", new CreateUserController().handle);
usersRoutes.delete(
  "/users/:id",
  authenticateToken(),
  is("Admin"),
  new DeleteUserController().handle
);
usersRoutes.get(
  "/users/:id",
  authenticateToken(),
  is("Admin"),
  new ReadUserController().handle
);
usersRoutes.patch(
  "/users",
  authenticateToken(),
  is("Admin"),
  new UpdateUserController().handle
);

export default usersRoutes;
