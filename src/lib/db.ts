import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function getPrismaClient() {
  let connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    config({ path: ".env.local" });
    connectionString = process.env.DATABASE_URL;
  }
  if (!connectionString) {
    // Return empty client if no URL (e.g. during build)
    return new PrismaClient();
  }
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? getPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
