import { Request, Response } from "express";
import { CreateUserService } from "../../service/users/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, photo, email, password, role} = request.body;

    const createUserService = new CreateUserService();
    const result = await createUserService.execute({ name, photo, email, password, role });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
