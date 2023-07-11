import { Point } from "../../models/Point";
import { prisma } from "../../database/prismaClient";
import { NotFoundError } from "../../helpers/api-erros";

export class ReadUniquePointService {
  async execute(id: string): Promise<Error | Point> {
    try {
      const point = await prisma.point.findUnique({
        where: {
          id,
        },
      });
      return point;
    } catch (error) {
      throw new NotFoundError("Point not found");
    }
  }
}
