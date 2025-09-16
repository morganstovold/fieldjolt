import { createCallerFactory, createTRPCRouter } from "@workspace/trpc/trpc";
import { organizationsRouter } from "./routers/organizations";

export const appRouter = createTRPCRouter({
	organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
