import { Request, Response } from "express";
import { ValidationError, validate } from "class-validator";

import { Point } from "../../models/Point";
import { BadRequestError } from "../../helpers/api-erros";
import { CreatePointService } from "../../service/points/CreatePointService";

import upload from "../../middlewares/uploadImage";

export class CreatePointController {
  async handle(request: Request, response: Response) {
    await new Promise<void>((resolve, reject) => {
      upload.single('photo')(request, response, (err: any) => {
        if (err) {
          reject(new BadRequestError("Erro ao fazer upload da imagem"));
        } else {
          resolve();
        }
      });
    });

    const createPoint = new Point();

    createPoint.name = request.body.name;
    createPoint.latitude = request.body.latitude;
    createPoint.longitude = request.body.longitude;
    createPoint.tipoLixo = request.body.tipoLixo;
    createPoint.city = request.body.city;
    createPoint.state = request.body.state;
    createPoint.photo = request.file ? request.file.filename : null;
    createPoint.createdById = request.userId;

    const validations: ValidationError[] = await validate(createPoint);

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

    const creatPointService = new CreatePointService();

    const result = await creatPointService.execute(createPoint);

    return response.json(result);
  }
}
