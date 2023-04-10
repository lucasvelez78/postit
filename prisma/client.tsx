import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

//add prisma to the NodeJS global type
interface CustmoNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

//prevent multuple instances of prisma client in development
declare const global: CustmoNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
