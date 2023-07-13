import { User } from "models/User";
import { prisma } from "../../database/prismaClient";
import { NotFoundError } from "../../helpers/api-erros";

export class ReadUserService {
  async execute(id: string): Promise<Error | User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    user.password = undefined;
    return user;
  }
}
