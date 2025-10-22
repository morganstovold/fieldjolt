import { db } from "@workspace/db";
import { redis } from "../upstashClient";
import { stripe } from "./client";

export async function syncStripeCustomer(customerId: string) {
	try {
		const subscriptions = await stripe.subscriptions.list({
			customer: customerId,
			limit: 1,
			status: "all",
			expand: ["data.default_payment_method"],
		});

		const entitlements = await stripe.entitlements.activeEntitlements.list({
			customer: customerId,
			limit: 100,
		});
	} catch (error) {
		console.error("Error syncing Stripe data:", error);
		throw error;
	}
}
