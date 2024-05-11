import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `${process.env.DATABASE_URL}?statement_cache_size=0`,
    },
  },
});
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
