import { Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import { SessionService } from "../service/SessionService";
import { UserLogin } from "../models/UserLogin";
import { BadRequestError } from "../helpers/api-erros";

export class SessionController {
  async handle(request: Request, response: Response) {
    const userLogin = new UserLogin();

    userLogin.email = request.body.email;
    userLogin.password = request.body.password;

    const validations: ValidationError[] = await validate(userLogin);

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

    const sessionService = new SessionService();

    const result = await sessionService.execute(userLogin);

    return response.json(result);
  }
}
