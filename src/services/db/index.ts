import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

// neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

const prismaClient = () => {
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClient>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClient();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
