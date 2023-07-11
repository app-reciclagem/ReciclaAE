import { Request, Response } from "express";
import { UpdateUserService } from "../../service/users/UpdateUserService";
import { User } from "../../models/User";
import { hash } from "bcrypt";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const updateUser = new User();
    const id = request.userId;

    updateUser.email = request.body.email;
    updateUser.name = request.body.name;
    updateUser.password = request.body.password;
    updateUser.photo = request.body.photo;
    updateUser.role = request.body.role;

    const updateUserService = new UpdateUserService();
    const result = await updateUserService.execute(updateUser, id);

    return response.json(result);
  }
}
