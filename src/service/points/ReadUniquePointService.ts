import { Point } from "../../models/Point";
import { prisma } from "../../database/prismaClient";

export class ReadUniquePointService {
  async execute(id : string): Promise<Error | Point> {
    try {
      const point = await prisma.point.findUnique({
        where:{
            id
        }
      });
      return point;
    } catch (error) {
      console.log(error);
      return new Error("Point not found");
    }
  }
}
