import { Point } from "models/Point";
import { prisma } from "../../database/prismaClient";

export class UpdatePointService {
    async execute(data: Point, id: string): Promise<Error | string> {
     console.log(data)
  try {
    const point = await prisma.point.update({
        where:{
            id
        },
        data 
    });

    return "sucess update";
  } catch (error) {
    return new Error("Failed to create collection point");
  }
  }
  }
