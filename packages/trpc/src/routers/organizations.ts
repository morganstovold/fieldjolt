import { TRPCError } from "@trpc/server";
import { getTimezoneFromState } from "@workspace/lib/getTimezoneFromState";
import { createOrganizationSchema } from "@workspace/lib/schemas/createOrganizationSchema";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const organizationsRouter = createTRPCRouter({
	list: protectedProcedure.query(async ({ ctx }) => {
		return ctx.db.organizationMember.findMany({
			where: { userId: ctx.session.user.id },
			include: {
				organization: {
					select: {
						id: true,
						name: true,
						slug: true,
						logo: true,
					},
				},
			},
		});
	}),
	getWithLocations: protectedProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			const org = await ctx.db.organizations.findUnique({
				where: { slug: input.slug },
				include: {
					Location: {
						where: { isActive: true },
						orderBy: { name: "asc" },
					},
					OrganizationMember: {
						where: { userId: ctx.session.user.id },
						select: {
							locationIds: true,
						},
					},
				},
			});

			if (!org || org.OrganizationMember.length === 0) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Organization not found or no access",
				});
			}

			const member = org.OrganizationMember[0];

			const accessibleLocations =
				member?.locationIds.length === 0
					? org.Location
					: org.Location.filter((loc) => member?.locationIds.includes(loc.id));

			return {
				id: org.id,
				name: org.name,
				slug: org.slug,
				logo: org.logo,
				locations: accessibleLocations,
			};
		}),
	getLocationContext: protectedProcedure
		.input(z.object({ slug: z.string(), locationSlug: z.string() }))
		.query(async ({ ctx, input }) => {
			const org = await ctx.db.organizations.findUnique({
				where: { slug: input.slug },
				include: {
					Location: {
						where: { isActive: true },
					},
					OrganizationMember: {
						where: { userId: ctx.session.user.id },
						select: {
							locationIds: true,
						},
					},
				},
			});

			if (!org || org.OrganizationMember.length === 0) {
				throw new TRPCError({
					code: "FORBIDDEN",
				});
			}

			const member = org.OrganizationMember[0];

			const accessibleLocations =
				member?.locationIds.length === 0
					? org.Location
					: org.Location.filter((loc) => member?.locationIds.includes(loc.id));

			if (!input.locationSlug) {
				return {
					organization: org,
					location: accessibleLocations[0] || null,
					viewMode: accessibleLocations.length === 1 ? "single" : "all",
				};
			}

			const location = accessibleLocations.find(
				(loc) => loc.slug === input.locationSlug,
			);

			if (!location) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			return {
				organization: org,
				location,
				viewMode: "specific" as const,
			};
		}),
	create: protectedProcedure
		.input(createOrganizationSchema)
		.mutation(async ({ ctx, input }) => {
			const slug = input.name
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-+|-+$/g, "")
				.replace(/_/g, "");

			const existing = await ctx.db.organizations.findUnique({
				where: { slug },
			});

			const finalSlug = existing
				? `${slug}-${Math.random().toString(36).substring(2, 6)}`
				: slug;

			return ctx.db.$transaction(async (tx) => {
				const org = await tx.organizations.create({
					data: {
						name: input.name,
						slug: finalSlug,
						businessType: input.businessType,
						phone: input.phone,
						referralSource: input.referralSource,
					},
				});

				const hasAddress = !!(input.address || input.city);

				const locationSlug = hasAddress ? "main-office" : `location-1`;
				const locationName = hasAddress
					? `${input.name} - Main office`
					: `${input.name} - Location 1`;

				await tx.location.create({
					data: {
						organizationId: org.id,
						name: locationName,
						slug: locationSlug,
						address: input.address,
						city: input.city,
						state: input.state,
						zip: input.zip,
						phone: input.phone,
						timezone: getTimezoneFromState(input.state),
					},
				});

				await tx.organizationMember.create({
					data: {
						organizationId: org.id,
						userId: ctx.session.user.id,
						locationIds: [],
					},
				});

				return {
					slug: org.slug,
				};
			});
		}),
});
