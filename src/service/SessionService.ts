import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../database/prismaClient";
import { UserRequest } from "../models/UserRequest"
import { User } from "../models/User";

export class SessionService {
  async execute({ email, password }: UserRequest) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new Error("User does not exists!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("User or Password incorrect");
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
    });

    return token;
  }
}
