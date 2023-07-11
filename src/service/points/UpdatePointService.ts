import { Point } from "models/Point";
import { prisma } from "../../database/prismaClient";

export class UpdatePointService {
  async execute(data: Point, id: string): Promise<Error | string> {
    try {
      const point = await prisma.point.update({
        where: {
          id,
        },
        data,
      });

      return "sucess update";
    } catch (error) {
      throw new Error("Failed to update collection point");
    }
  }
}
