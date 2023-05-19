import { hash } from "bcrypt";
import { UserRequest } from "../models/UserRequest";
import { User } from "models/User";
import { prisma } from "../database/prismaClient";

export class CreateUserService {
  async execute({ password, email, role }: UserRequest): Promise<Error | User> {
    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      return new Error("User already exists");
    }

    const passwordHash = await hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: passwordHash,
          role,
        },
      });

      user.password = undefined;

      return user;
    } catch (error) {
      return new Error("Failed to create user");
    }
  }
}
