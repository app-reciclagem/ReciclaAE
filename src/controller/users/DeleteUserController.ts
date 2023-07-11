import { Request, Response } from "express";
import { DeleteUserService } from "../../service/users/DeleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const id = req.params.id as string;

    const deleteUserService = new DeleteUserService();
    const result = await deleteUserService.execute(id);

    return res.json(result);
  }
}
