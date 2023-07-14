import { Request, Response } from "express";
import { FindPointTermService } from "../../service/points/FindPointTermService";

export class FindPointTermController {
  async handle(req: Request, res: Response) {
    const searchTerm = req.params.term as string;

    const findPointTermService = new FindPointTermService();
    const result = await findPointTermService.execute(searchTerm);

    return res.json(result);
  }
}
