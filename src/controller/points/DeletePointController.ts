import { Request, Response } from "express";
import { DeletePointService } from "../../service/points/DeletePointService";

export class DeletePointController {
  async handle(req: Request, res: Response) {
    const  id  = req.params.id as string;
    console.log(id);

    const deletePointService = new DeletePointService();
    const result = await deletePointService.execute( id );

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}