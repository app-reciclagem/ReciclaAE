import { Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import { SessionService } from "../service/SessionService";
import { UserLogin } from "../models/UserLogin";
import { BadRequestError } from "../helpers/api-erros";

export class SessionController {
  async handle(request: Request, response: Response) {
    const sessionService = new SessionService();
    const userLogin = new UserLogin();

    userLogin.email = request.body.email;
    userLogin.password = request.body.password;

    const validations: ValidationError[] = await validate(userLogin);

    if (validations.length) {
      const errors = validations.reduce<string[]>((acc, curr) => {
        if (curr.constraints) {
          return [...acc, ...Object.values(curr.constraints)];
        }
        return acc;
      }, []);

      return response
        .status(400)
        .json({ error: "validation error", messages: errors });
    }

    try {
      const result = await sessionService.execute(userLogin);
      return response.json(result);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}
