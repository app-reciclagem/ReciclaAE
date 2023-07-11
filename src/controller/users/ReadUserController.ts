import { Request, Response } from "express";
import { ReadUserService } from "../../service/users/ReadUserService";

export class ReadUserController {
  async handle(req: Request, res: Response) {
    const id = req.params.id as string;

    const readUserService = new ReadUserService();
    const result = await readUserService.execute(id);

    return res.json(result);
  }
}
