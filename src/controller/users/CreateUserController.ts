import { Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import { CreateUserService } from "../../service/users/CreateUserService";
import { BadRequestError } from "../../helpers/api-erros";
import { User } from "../../models/User";
import upload from "../../middlewares/uploadImage";

export class CreateUserController {
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

    const newUser = new User();

    newUser.email = request.body.email;
    newUser.name = request.body.name;
    newUser.password = request.body.password;
    newUser.photo = request.file ? request.file.filename : null;
    // newUser.photo = request.body.photo;
    newUser.role = request.body.role;

    const validations: ValidationError[] = await validate(newUser);

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

    const createUserService = new CreateUserService();

    const result = await createUserService.execute(newUser);

    return response.json(result);
  }
}
