import { hash } from "bcrypt";
import { User } from "models/User";
import { prisma } from "../../database/prismaClient";
import { ConflictError } from "../../helpers/api-erros";
import { SessionService } from "../SessionService";

export class CreateUserService {
  async execute({ name, photo, password, email, role }: User) {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new ConflictError("User already exists");
    }

    const passwordHash = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        photo,
        email,
        password: passwordHash,
        role,
      },
    });

    if (!user) {
      throw new Error("An error occurred while creating the user");
    }

    const sessionService = new SessionService();
    const result = sessionService.execute({ email, password });

    return result;
  }
}
