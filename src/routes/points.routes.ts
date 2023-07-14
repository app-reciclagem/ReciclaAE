import { Router } from "express";

import { CreatePointController } from "../controller/points/CreatePointController";
import { DeletePointController } from "../controller/points/DeletePointController";
import { ReadPointController } from "../controller/points/ReadPointController";
import { UpdatePointController } from "../controller/points/UpdatePointController";
import { ReadUniquePointController } from "../controller/points/ReadUniquePointController";
import { FindPointController } from "../controller/points/FindPointController";

import { authenticateToken } from "../middlewares/authenticateToken";
import { is } from "../middlewares/permissions";
import { FindPointTermController } from "../controller/points/FindPointTermController";

const pointsRoutes = Router();

pointsRoutes.post(
  "/points",
  authenticateToken(),
  is("Admin"),
  new CreatePointController().handle
);
pointsRoutes.get(
  "/points",
  // authenticateToken(),
  new ReadPointController().handle
);
pointsRoutes.get(
  "/points/:id",
  authenticateToken(),
  new ReadUniquePointController().handle
);
pointsRoutes.get(
  "/points/search/:name",
  authenticateToken(),
  new FindPointController().handle
);
pointsRoutes.get(
  "/points/searchterm/:term",
  authenticateToken(),
  new FindPointTermController().handle
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
