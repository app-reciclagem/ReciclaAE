import { hash } from "bcrypt";
import { User } from "models/User";
import { prisma } from "../database/prismaClient";

export class CreateUserService {
  async execute({ name, photo, password, email, role }: User): Promise<Error | User> {
   const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      return new Error("User already exists");
    }

    const passwordHash = await hash(password, 10);
    console.log(passwordHash);
    try {
      const user = await prisma.user.create({
        data: {
          name,
          photo,
          email,
          password: passwordHash,
          role,
        },
      });

      user.password = undefined;

      return user;
    } catch (error) {
      console.log(error);
      return new Error("Failed to create user");
    }
  }
}
