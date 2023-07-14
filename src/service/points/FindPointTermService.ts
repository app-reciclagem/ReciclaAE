import { Point } from "../../models/Point";
import { prisma } from "../../database/prismaClient";
import { NotFoundError } from "../../helpers/api-erros";

export class FindPointTermService {
  async execute(searchTerm: string): Promise<Error | Point[]> {
    try {
      const points = await prisma.point.findMany({
        where: {
          tipoLixo: {
            has: searchTerm,
          },
        },
      });
      console.log(points);

      return points;
    } catch (error) {
      throw new NotFoundError("No points found");
    }
  }
}
