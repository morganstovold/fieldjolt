import { organizationsRouter } from "./routers/organization.router";
import { usersRouter } from "./routers/user.router";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
	users: usersRouter,
	organizations: organizationsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
