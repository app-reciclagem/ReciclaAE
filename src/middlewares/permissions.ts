import { prisma } from "../database/prismaClient";
import { Request, Response, NextFunction } from "express";

export function is(rolesRoutes: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    if (rolesRoutes !== user.role || user.id !== userId) { 
      return res.status(401).json({
        message: "User not authorized",
      });
    }

    next();
  };
}
