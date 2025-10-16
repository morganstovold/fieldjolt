import { z } from "zod";

export const completeOnboardingSchema = z.object({
	slug: z.string(),
	locationName: z.string(),
	locationType: z.enum(["office", "mobile", "warehouse"]),
	phone: z.string().optional(),
	website: z.string().optional(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	zip: z.string().optional(),

	teamSize: z.number().optional(),
	monthlyJobs: z.string().optional(),
	biggestChallenge: z.string().optional(),
});

export type CompleteOnboardingInput = z.infer<typeof completeOnboardingSchema>;
