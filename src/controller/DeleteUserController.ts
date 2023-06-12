import { Request, Response } from "express";
import { DeleteUserService } from "../service/DeleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const  id  = req.params.id as string;
    console.log(id);

    const deleteUserService = new DeleteUserService();
    const result = await deleteUserService.execute( id );

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
