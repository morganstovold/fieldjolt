import { initTRPC, TRPCError } from "@trpc/server";
import { getSession } from "@workspace/auth";
import { db } from "@workspace/db";
import superjson from "superjson";
import { ZodError } from "zod";

export const createTRPCContext = async (opts: { headers: Headers }) => {
	const session = await getSession({
		headers: opts.headers,
	});

	return {
		db,
		session,
		...opts,
	};
};

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
	if (!ctx.session?.user) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			session: { ...ctx.session, user: ctx.session.user },
		},
	});
});

export const organizationProcedure = protectedProcedure.use(
	async ({ ctx, next }) => {
		const orgSlug = ctx.headers.get("x-org");

		if (!orgSlug) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const hasAccess = await ctx.db.organizationMember.count({
			where: {
				organization: {
					slug: orgSlug,
				},
				userId: ctx.session.user.id,
			},
		});

		if (hasAccess === 0) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		return next({
			ctx: {
				...ctx,
				organization: orgSlug,
			},
		});
	},
);

export const locationProcedure = protectedProcedure.use(
	async ({ ctx, next }) => {
		const orgSlug = ctx.headers.get("x-org");
		const locationSlug = ctx.headers.get("x-location");

		if (!orgSlug || !locationSlug) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		const hasAccess = await ctx.db.location.count({
			where: {
				slug: locationSlug,
				organization: {
					slug: orgSlug,
					OrganizationMember: {
						some: {
							userId: ctx.session.user.id,
						},
					},
				},
			},
		});

		if (hasAccess === 0) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}

		return next({
			ctx: {
				...ctx,
				location: locationSlug,
			},
		});
	},
);

export { fetchRequestHandler } from "@trpc/server/adapters/fetch";
