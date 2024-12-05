import { PrismaClient } from "@prisma/client";

const prismaClient = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClient>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClient();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
