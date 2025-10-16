import { TRPCError } from "@trpc/server";
import { completeOnboardingSchema } from "@workspace/lib/schemas/completeOnboardingSchema";
import { createOrganizationSchema } from "@workspace/lib/schemas/createOrganizationSchema";
import z from "zod";
import {
	createTRPCRouter,
	organizationProcedure,
	protectedProcedure,
} from "../trpc";
import { locationsRouter } from "./location.router";

export const organizationsRouter = createTRPCRouter({
	locations: locationsRouter,
	getOrganizationContext: organizationProcedure.query(async ({ ctx }) => {
		const org = await ctx.db.organization.findUnique({
			where: {
				slug: ctx.organization,
				OrganizationMember: { some: { userId: ctx.session.user.id } },
			},
			select: {
				onboardingCompleted: true,
				OrganizationMember: {
					where: { userId: ctx.session.user.id },
					select: { locationAccessType: true },
				},
				Location: {
					where: {
						isActive: true,
						OR: [
							// User has "all" access - no additional filtering needed
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
							// User has "some" access - check specific location access
							{
								LocationAccess: {
									some: {
										member: { userId: ctx.session.user.id },
									},
								},
							},
						],
					},
					orderBy: { name: "asc" },
					take: 2,
					select: {
						id: true,
						slug: true,
					},
				},
			},
		});

		if (!org || org.Location.length === 0) {
			throw new TRPCError({
				code: "FORBIDDEN",
			});
		}

		return {
			onboardingCompleted: org.onboardingCompleted,
			locations: org.Location,
		};
	}),
	hasAccess: protectedProcedure
		.input(z.object({ slug: z.string(), locationSlug: z.string() }))
		.query(async ({ ctx, input }) => {
			const location = await ctx.db.location.findFirst({
				where: {
					slug: input.locationSlug,
					isActive: true,
					organization: {
						slug: input.slug,
						OrganizationMember: {
							some: {
								userId: ctx.session.user.id,
								OR: [
									{ locationAccessType: "all" },
									{
										locationAccessType: "some",
										LocationAccess: {
											some: {
												location: { slug: input.locationSlug },
											},
										},
									},
								],
							},
						},
					},
				},
				select: {
					id: true,
				},
			});

			if (!location) {
				throw new TRPCError({
					code: "FORBIDDEN",
				});
			}

			return location.id;
		}),
	create: protectedProcedure
		.input(createOrganizationSchema)
		.mutation(async ({ ctx, input }) => {
			const slug = input.name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-+|-+$/g, "")
				.replace(/_/g, "");

			const existing = await ctx.db.organization.findUnique({
				where: { slug },
			});

			const finalSlug = existing
				? `${slug}-${Math.random().toString(36).substring(2, 6)}`
				: slug;

			return ctx.db.$transaction(async (tx) => {
				const org = await tx.organization.create({
					data: {
						name: input.name,
						slug: finalSlug,
						businessType: input.businessType,
						referralSource: input.referralSource,
					},
				});

				await tx.organizationMember.create({
					data: {
						organizationId: org.id,
						userId: ctx.session.user.id,
						locationAccessType: "all",
					},
				});

				return {
					slug: org.slug,
				};
			});
		}),
	completeOnboarding: protectedProcedure
		.input(completeOnboardingSchema)
		.mutation(async ({ ctx, input }) => {
			const org = await ctx.db.organization.findUnique({
				where: { slug: input.slug },
				select: {
					id: true,
					OrganizationMember: {
						where: { userId: ctx.session.user.id },
					},
				},
			});

			if (!org || org.OrganizationMember.length === 0) {
				throw new TRPCError({
					code: "FORBIDDEN",
				});
			}

			return ctx.db.$transaction(async (tx) => {
				await tx.organization.update({
					where: { id: org.id },
					data: {
						onboardingCompleted: true,
					},
				});

				const location = await tx.location.create({
					data: {
						name: input.locationName,
						type: input.locationType,
						slug: input.locationName
							.toLowerCase()
							.replace(/[^a-z0-9]+/g, "-")
							.replace(/^-+|-+$/g, "")
							.replace(/_/g, ""),
						organization: {
							connect: {
								id: org.id,
							},
						},
					},
				});

				return {
					slug: input.slug,
					locationSlug: location.slug,
				};
			});
		}),
});
