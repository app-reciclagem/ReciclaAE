import { Request, Response } from "express";
import { ReadUserService } from "../service/ReadUserService";

export class ReadUserController {
  async handle(req: Request, res: Response) {
    const  id  = req.params.id as string;
    console.log(id);

    const readUserService = new ReadUserService();
    const result = await readUserService.execute( id );

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
