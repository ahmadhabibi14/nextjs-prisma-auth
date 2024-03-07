import { PrismaClient } from "@prisma/client";
import { currentUser } from "./extensions/current-user";

const prisma = new PrismaClient().$extends(currentUser());
const globalForPrisma = global as unknown as { prisma: typeof prisma };
export const db = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default db;