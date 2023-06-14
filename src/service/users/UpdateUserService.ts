import { User } from "models/User";
import { prisma } from "../../database/prismaClient";

export class UpdateUserService {
  async execute(data: User, id: string): Promise<Error | User> {
    

    try {
      const userUpdate = await prisma.user.update({
        where:{
            id
        }, data
      });

      userUpdate.password = undefined;

      return userUpdate;
    } catch (error) {
      console.log(error);
      return new Error("Failed to update user");
    }
  }
}
