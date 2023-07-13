import { Request, Response } from "express";
import { ReadUserService } from "../../service/users/ReadUserService";

export class ReadUserController {
  async handle(req: Request, res: Response) {
    const id = req.params.id as string;
    const readUserService = new ReadUserService();

    try {
      const result = await readUserService.execute(id);

      return res.json(result);
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}
