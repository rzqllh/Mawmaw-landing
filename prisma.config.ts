import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL || "", // Gunakan DIRECT_URL (5432) untuk CLI (db push / migrate) menghindari pooler hang
  },
  migrations: {
    path: "prisma/migrations",
  },
});
