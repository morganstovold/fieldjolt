import { z } from "zod";

export const createOrganizationSchema = z.object({
	name: z.string().min(1),
	logo: z.optional(z.string()),
	businessType: z.optional(z.string()),
	phone: z.optional(z.string()),
	address: z.optional(z.string()),
	city: z.optional(z.string()),
	state: z.optional(z.string()),
	zip: z.optional(z.string()),
	referralSource: z.optional(z.string()),
});
