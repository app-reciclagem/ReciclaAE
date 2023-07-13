import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../database/prismaClient";
import { NotFoundError, UnauthorizedError } from "../helpers/api-erros";
import { UserLogin } from "../models/UserLogin";

export class SessionService {
  async execute({ email, password }: UserLogin) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundError("User or Password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError("User or Password incorrect");
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
    });

    user.password = undefined;

    return { user, token };
  }
}
