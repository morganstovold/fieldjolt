import { z } from "zod";

export const createOrganizationSchema = z.object({
	name: z.string().min(1),
	businessType: z.string().optional(),
	phone: z.string().optional(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),
	referralSource: z.string().optional(),
});
