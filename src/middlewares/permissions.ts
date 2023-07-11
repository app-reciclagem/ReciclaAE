import { prisma } from "../database/prismaClient";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/api-erros";

export function is(rolesRoutes: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (rolesRoutes !== user.role || user.id !== userId) {
      throw new UnauthorizedError("Access denied");
    }

    next();
  };
}
