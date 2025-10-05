import { createTRPCRouter, protectedProcedure } from "../trpc";

export const organizationsRouter = createTRPCRouter({
	list: protectedProcedure.query(() => {}),
});
