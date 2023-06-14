import { Request, Response } from "express";
import { UpdatePointService } from "../../service/points/UpdatePointService";
import { Point } from "../../models/Point";

export class UpdatePointController {
  async handle(request: Request, response: Response) {
    
    const updatePoint = new Point()
   const id = request.params.id

    if(request.body.name) {
    updatePoint.name = request.body.name
    }

  if(request.body.name) {
    updatePoint.name = request.body.name
    }
  if(request.body.latitude) {
    updatePoint.latitude = request.body.latitude
    }
  if(request.body.longitude) {
    updatePoint.longitude = request.body.longitude
    }

  if(request.body.tipoLixo) {
    updatePoint.tipoLixo = request.body.tipoLixo
    }

  if(request.body.city) {
    updatePoint.city = request.body.city
    }
  if(request.body.state) {
    updatePoint.state = request.body.state
    }
  if(request.body.photo) {
    updatePoint.photo = request.body.photo
    }
        

const updatePointService = new UpdatePointService();

const result = await updatePointService.execute(updatePoint, id);

if (result instanceof Error) {
  return response.status(400).json(result.message);
}

return response.json(result);
}
}
