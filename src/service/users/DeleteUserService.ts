import { prisma } from "../../database/prismaClient";

export class DeleteUserService {
  async execute(id: string): Promise<Error | string> {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });

      if (user) {
        return "User successfully deleted";
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      throw new Error("An error occurred while deleting the user");
    }
  }
}
