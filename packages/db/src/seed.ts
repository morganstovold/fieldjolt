import { hashPassword } from "better-auth/crypto";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.$transaction(async (tx) => {
		console.log("Starting seed");
		let user = await tx.user.findFirst();

		if (!user) {
			user = await tx.user.create({
				data: {
					id: Math.random().toString(36).substring(2, 9),
					name: "Test User",
					email: "test@fieldjolt.com",
				},
			});

			await tx.account.create({
				data: {
					id: Math.random().toString(36).substring(2, 9),
					accountId: Math.random().toString(36).substring(2, 9),
					providerId: "local",
					userId: user.id,
					password: await hashPassword("password"),
				},
			});
		}

		console.log("User: ", user.id);

		let org = await tx.organization.findFirst({
			where: {
				OrganizationMember: {
					some: {
						userId: user.id,
					},
				},
			},
		});

		if (!org) {
			org = await tx.organization.create({
				data: {
					id: Math.random().toString(36).substring(2, 9),
					name: "Test Organization",
					slug: "test-organization",
					OrganizationMember: {
						create: {
							userId: user.id,
						},
					},
				},
			});
		}

		console.log("Organization: ", org.id);

		let loc = await tx.location.findFirst({
			where: {
				organizationId: org.id,
			},
		});

		if (!loc) {
			loc = await tx.location.create({
				data: {
					id: Math.random().toString(36).substring(2, 9),
					name: "Test Location",
					slug: "test-location",
					type: "field",
					organizationId: org.id,
				},
			});
		}

		const entityType = await tx.crmEntityType.create({
			data: {
				name: "Customers",
				label: "Customers",
				labelSingular: "Customer",
				primaryNamePlaceholder: "Name",
				icon: "users",
				color: "#3BB2F6",
				displayOrder: 1,
				location: {
					connect: {
						id: loc.id,
					},
				},
			},
		});

		console.log("Entity Type: ", entityType.id);

		await tx.crmEntityColumnDefinitions.createMany({
			data: [
				{
					locationId: loc.id,
					entityTypeId: entityType.id,
					fieldName: "email",
					label: "Email",
					fieldType: "email",
					dataType: "string",
					isRequired: true,
					displayOrder: 1,
					createdBy: user.id,
				},
				{
					locationId: loc.id,
					entityTypeId: entityType.id,
					fieldName: "phone",
					label: "Phone",
					fieldType: "phone",
					dataType: "string",
					displayOrder: 2,
					createdBy: user.id,
				},
				{
					locationId: loc.id,
					entityTypeId: entityType.id,
					fieldName: "annual_revenue",
					label: "Annual Revenue",
					fieldType: "currency",
					dataType: "number",
					formatting: { prefix: "$", decimals: 2 },
					displayOrder: 3,
					createdBy: user.id,
				},
			],
		});

		await tx.crmEntry.create({
			data: {
				entityType: {
					connect: {
						id: entityType.id,
					},
				},
				location: {
					connect: {
						id: loc.id,
					},
				},
				primaryName: "Acme Corporation",
				status: "active",
				customFields: {
					email: "contact@acme.com",
					phone: "555-555-5555",
					annual_revenue: 100000,
				},
				createdBy: {
					connect: {
						id: user.id,
					},
				},
			},
		});
	});
}

main()
	.then(async () => {
		console.log("Seeding complete");
		await prisma.$disconnect();
	})
	.catch(async () => {
		console.log("Seeding failed");
		await prisma.$disconnect();
		process.exit(1);
	});
