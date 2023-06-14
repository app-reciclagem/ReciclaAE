import { Request, Response } from "express";
import { UpdateUserService } from "../../service/users/UpdateUserService";
import { User } from "../../models/User";
import { hash } from "bcrypt"

export class UpdateUserController {

  async handle(request: Request, response: Response) {
    const user =  new User();
    const id = request.userId;
    if(request.body.password){
        user.password = await hash(request.body.password, 10);
    }
    if(request.body.name){
        user.name = request.body.name;
    }
    if(request.body.photo){
        user.photo = request.body.photo;
    }
    if(request.body.email){
        user.email = request.body.email;
    }

    const updateUserService = new UpdateUserService();
    const result = await updateUserService.execute(user, id);

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
