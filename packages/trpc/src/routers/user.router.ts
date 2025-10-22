import { PermissionScope } from "@workspace/db";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
	me: protectedProcedure.query(async ({ ctx }) => {
		const organizations = await ctx.db.organization.findMany({
			where: {
				OrganizationMember: {
					some: { userId: ctx.session.user.id },
				},
			},
			select: {
				name: true,
				slug: true,
				Team: {
					where: {
						
					},
					orderBy: { name: "asc" },
					select: {
						id: true,
						name: true,
						slug: true,
					},
				},
			},
		});

		return {
			...ctx.session.user,
			organizations,
		};
	}),
});
