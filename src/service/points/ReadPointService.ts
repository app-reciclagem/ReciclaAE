import { Point } from "models/Point";
import { prisma } from "../../database/prismaClient";
import { NotFoundError } from "../../helpers/api-erros";

export class ReadPointService {
  async execute(): Promise<Error | Point[]> {
    try {
      const result = await prisma.point.findMany();

      return result;
    } catch (error) {
      throw new NotFoundError("Failed to find collection point");
    }
  }
}
