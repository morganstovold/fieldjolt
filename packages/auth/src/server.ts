import { db } from "@workspace/db";
import { resend } from "@workspace/lib/resendClient";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod, magicLink } from "better-auth/plugins";
import { headers } from "next/headers";
import { cache } from "react";

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			onboardingCompleted: {
				type: "boolean",
				default: false,
				input: false,
			},
		},
	},
	plugins: [
		nextCookies(),
		lastLoginMethod(),
		magicLink({
			sendMagicLink: async ({ email, url }) => {
				await resend.emails.send({
					from: "FieldJolt <onboarding@noreply.fieldjolt.com>",
					to: email,
					subject: "Login to your account",
					html: `<p>Click <a href="${url}">here</a> to login to your account.`,
				});
			},
		}),
	],
});

export const getSession = cache(async (opts?: { headers?: Headers }) => {
	return await auth.api.getSession({
		headers: opts?.headers || (await headers()),
	});
});

export type Session = Awaited<ReturnType<typeof getSession>>;

export type ValidSession = NonNullable<Session>;

export { toNextJsHandler } from "better-auth/next-js";
