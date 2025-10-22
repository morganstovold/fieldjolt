import { stripe } from "@workspace/lib/stripe/client";
import { NextResponse } from "next/server";
import { env } from "@/env";

export async function POST(request: Request) {
	const signature = request.headers.get("stripe-signature");
	const payload = await request.text();

	if (!signature || !payload) {
		return NextResponse.json({
			status: 400,
		});
	}

	const event = stripe.webhooks.constructEvent(
		payload,
		signature,
		env.STRIPE_WEBHOOK_SECRET,
	);

	switch (event.type) {
		case "payment_intent.succeeded":
			console.log("PaymentIntent Succeeded", event.data.object);
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
			break;
	}

	return NextResponse.json({ received: true });
}
