import { Point } from "../../models/Point";
import { prisma } from "../../database/prismaClient";
import { NotFoundError } from "../../helpers/api-erros";

export class FindPointService {
  async execute(name: string): Promise<Error | Point[]> {
    try {
      const points = await prisma.point.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      });
      return points;
    } catch (error) {
      throw new NotFoundError("No points found");
    }
  }
}
