import { Request, Response } from "express";
import { ReadUniquePointService } from "../../service/points/ReadUniquePointService";

export class ReadUniquePointController {
  async handle(req: Request, res: Response) {
    const id = req.params.id as string;

    const readPointService = new ReadUniquePointService();
    const result = await readPointService.execute(id);

    return res.json(result);
  }
}
