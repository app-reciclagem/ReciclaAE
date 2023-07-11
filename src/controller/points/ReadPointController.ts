import { Request, Response } from "express";
import { ReadPointService } from "../../service/points/ReadPointService";

export class ReadPointController {
  async handle(req: Request, res: Response) {
    const readPointService = new ReadPointService();
    const result = await readPointService.execute();

    return res.json(result);
  }
}
