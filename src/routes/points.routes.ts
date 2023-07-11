import { Router } from "express";

import { CreatePointController } from "../controller/points/CreatePointController";
import { DeletePointController } from "../controller/points/DeletePointController";
import { ReadPointController } from "../controller/points/ReadPointController";
import { UpdatePointController } from "../controller/points/UpdatePointController";
import { ReadUniquePointController } from "../controller/points/ReadUniquePointController";

import { authenticateToken } from "../middlewares/authenticateToken";
import { is } from "../middlewares/permissions";

const pointsRoutes = Router();

pointsRoutes.post(
  "/points",
  authenticateToken(),
  is("Admin"),
  new CreatePointController().handle
);
pointsRoutes.get(
  "/points",
  authenticateToken(),
  new ReadPointController().handle
);
pointsRoutes.get(
  "/points/:id",
  authenticateToken(),
  new ReadUniquePointController().handle
);
pointsRoutes.delete(
  "/points/:id",
  authenticateToken(),
  is("Admin"),
  new DeletePointController().handle
);
pointsRoutes.patch(
  "/points/:id",
  authenticateToken(),
  is("Admin"),
  new UpdatePointController().handle
);

export default pointsRoutes;
