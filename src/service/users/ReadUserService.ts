import { User } from "models/User";
import { prisma } from "../../database/prismaClient";
import { NotFoundError } from "../../helpers/api-erros";

export class ReadUserService {
  async execute(id: string): Promise<Error | User> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      user.password = undefined;
      return user;
    } catch (error) {
      throw new NotFoundError("User not found");
    }
  }
}
