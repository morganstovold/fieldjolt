import { createTRPCRouter } from "../trpc";
import { crmRouter } from "./features/crm.router";

export const locationsRouter = createTRPCRouter({
	crm: crmRouter,
});
