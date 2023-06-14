import { prisma } from "../../database/prismaClient";
import { Point } from "models/Point";

export class ReadPointService {

    async execute () : Promise<Error | Point[]> {
        
        try { 
            const result = await prisma.point.findMany()
            console.log(result)
            return result
        } 
        catch (error) {
            return new Error("Failed to find collection point");
        }
    }
}
