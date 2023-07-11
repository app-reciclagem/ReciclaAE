import { Request, Response } from "express";
import { DeletePointService } from "../../service/points/DeletePointService";

export class DeletePointController {
  async handle(req: Request, res: Response) {
    const id = req.params.id as string;

    const deletePointService = new DeletePointService();

    const result = await deletePointService.execute(id);

    return res.json(result);
  }
}
