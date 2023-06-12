import { User } from "models/User";
import { prisma } from "../database/prismaClient";

export class ReadUserService {
  async execute(id : string): Promise<Error | User> {
    try {
      const user = await prisma.user.findUnique({
        where:{
            id
        }
      });
      user.password = undefined;
      return user;
    } catch (error) {
      console.log(error);
      return new Error("User not found");
    }
  }
}
