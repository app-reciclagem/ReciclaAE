import { Request, Response } from "express";
import { FindPointService } from "../../service/points/FindPointService";

export class FindPointController {
  async handle(req: Request, res: Response) {
    const id = req.params.id as string;

    const findPointService = new FindPointService();
    const result = await findPointService.execute(id);

    return res.json(result);
  }
}
