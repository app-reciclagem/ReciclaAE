import { hash } from "bcrypt";
import { User } from "models/User";
import { prisma } from "../database/prismaClient";

export class DeleteUserService {
  async execute(id : string): Promise<Error | Boolean> {
    try {
      const user = await prisma.user.delete({
        where:{
            id
        }
      });

      return true;
    } catch (error) {
      console.log(error);
      return new Error("Failed to delete user");
    }
  }
}
