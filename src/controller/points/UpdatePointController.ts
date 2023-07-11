import { Request, Response } from "express";
import { UpdatePointService } from "../../service/points/UpdatePointService";
import { Point } from "../../models/Point";
import { ValidationError, validate } from "class-validator";
import { BadRequestError } from "../../helpers/api-erros";

export class UpdatePointController {
  async handle(request: Request, response: Response) {
    const updatePoint = new Point();
    const id = request.params.id;

    updatePoint.name = request.body.name;
    updatePoint.latitude = request.body.latitude;
    updatePoint.longitude = request.body.longitude;
    updatePoint.tipoLixo = request.body.tipoLixo;
    updatePoint.city = request.body.city;
    updatePoint.state = request.body.state;
    updatePoint.photo = request.body.photo;
    updatePoint.createdById = request.userId;

    const validations: ValidationError[] = await validate(updatePoint);

    if (validations.length) {
      const errors: string[] = [];

      validations.forEach((validationError: ValidationError) => {
        Object.values(validationError.constraints).forEach(
          (message: string) => {
            errors.push(message);
          }
        );
      });

      throw new BadRequestError(errors.join(", "));
    }

    const updatePointService = new UpdatePointService();

    const result = await updatePointService.execute(updatePoint, id);

    return response.json(result);
  }
}
