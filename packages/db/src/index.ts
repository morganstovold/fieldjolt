import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env";
import { PrismaClient } from "./generated/client";

const createPrismaClient = () =>
	new PrismaClient({
		adapter: new PrismaPg({
			connectionString: env.DATABASE_URL,
		}),
	});

const globalForPrisma = globalThis as unknown as {
	prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export type { PrismaClient } from "./generated/client";

export { PermissionScope } from "./generated/client";
