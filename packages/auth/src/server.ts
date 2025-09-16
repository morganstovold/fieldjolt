import { db } from "@workspace/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod } from "better-auth/plugins";

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: "mysql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [nextCookies(), lastLoginMethod()],
});

export { getSessionCookie } from "better-auth/cookies";
export { toNextJsHandler } from "better-auth/next-js";
