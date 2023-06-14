import { Request, Response } from "express";
import { CreatePointService } from "../../service/points/CreatePointService";
import { Point } from "../../models/Point";

export class CreatePointController {
  async handle(request: Request, response: Response) {
    
    const createPoint = new Point()
    createPoint.name = request.body.name
    createPoint.latitude = request.body.latitude
    createPoint.longitude = request.body.longitude
    createPoint.tipoLixo = request.body.tipoLixo
    createPoint.city = request.body.city
    createPoint.state = request.body.state
    createPoint.photo = request.body.photo
   

const creatPointService = new CreatePointService();

const result = await creatPointService.execute(createPoint);

if (result instanceof Error) {
  return response.status(400).json(result.message);
}

return response.json(result);
}
}
