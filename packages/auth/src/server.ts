import { db } from "@workspace/db";
import { resend } from "@workspace/lib/resendClient";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { lastLoginMethod, magicLink } from "better-auth/plugins";

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: "postgresql",
	}),
	emailAndPassword: {
		enabled: true,
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
					html: `<p>Click <a href="${url}">here</a> to login to your account.</p>`,
				});
			},
		}),
	],
});

export { getSessionCookie } from "better-auth/cookies";
export { toNextJsHandler } from "better-auth/next-js";
