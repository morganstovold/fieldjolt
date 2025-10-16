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
				onboardingCompleted: true,
				Location: {
					where: {
						isActive: true,
						OR: [
							{
								organization: {
									OrganizationMember: {
										some: {
											userId: ctx.session.user.id,
											locationAccessType: "all",
										},
									},
								},
							},
							{
								LocationAccess: {
									some: {
										member: {
											userId: ctx.session.user.id,
										},
									},
								},
							},
						],
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
