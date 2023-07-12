import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../database/prismaClient";
import { UserLogin } from "../models/UserLogin";
import { User } from "../models/User";
import { ConflictError, UnauthorizedError } from "../helpers/api-erros";

type SessionServiceResult = [User, string];

export class SessionService {
  async execute({ email, password }: UserLogin) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return new ConflictError("User or Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new UnauthorizedError("User or Password incorrect");
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
    });

    user.password = undefined;

    return { user, token };
  }
}
