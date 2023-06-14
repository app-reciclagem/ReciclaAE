import { prisma } from "../../database/prismaClient";

export class DeletePointService {
  async execute(id : string): Promise<Error | String> {
    try {
      const point = await prisma.point.delete({
        where:{
            id
        }
      });
      
      return "point sucess delete";
    } catch (error) {
      console.log(error);
      return new Error("Failed to delete point");
    }
  }
}