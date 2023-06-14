import { Request, Response } from "express";
import { ReadUniquePointService } from "../../service/points/ReadUniquePointService";

export class ReadUniquePointController {
  async handle(req: Request, res: Response) {
    const  id  = req.params.id as string;
    console.log(id);

    const readPointService = new ReadUniquePointService();
    const result = await readPointService.execute( id );

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}