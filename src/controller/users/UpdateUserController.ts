import { Request, Response } from "express";
import { UpdateUserService } from "../../service/users/UpdateUserService";
import { User } from "../../models/User";
import { hash } from "bcrypt";
import upload from "../../middlewares/uploadImage";
import { BadRequestError } from "../../helpers/api-erros";
import { ValidationError, validate } from "class-validator";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const updateUserService = new UpdateUserService();

    await new Promise<void>((resolve, reject) => {
      upload.single("photo")(request, response, (err: any) => {
        if (err) {
          reject(new BadRequestError("Erro ao fazer upload da imagem"));
        } else {
          resolve();
        }
      });
    });
    const updateUser = new User();
    const id = request.userId;

    updateUser.email = request.body.email;
    updateUser.name = request.body.name;
    updateUser.password = request.body.password;
    updateUser.photo = request.file ? request.file.filename : null;
    updateUser.role = request.body.role;

    const validations: ValidationError[] = await validate(updateUser);

    if (validations.length) {
      const errors: string[] = [];

      validations.forEach((validationError: ValidationError) => {
        Object.values(validationError.constraints).forEach(
          (message: string) => {
            errors.push(message);
          }
        );
      });

      return response
        .status(400)
        .json({ error: "validation error", messages: errors });
    }

    try {
      const result = await updateUserService.execute(updateUser, id);

      return response.json(result);
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}
