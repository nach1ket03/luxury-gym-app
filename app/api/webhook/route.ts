import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

// This secret verifies that the event actually came from Stripe
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  // Stripe requires the raw body to verify the cryptographic signature
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!signature || !endpointSecret) {
      throw new Error("Missing Stripe signature or webhook secret.");
    }
    // Verify the event
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Listen specifically for successful checkouts
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Extract the exact user and tier we attached in Step 11
    const userId = session.metadata?.userId;
    const tier = session.metadata?.tier;

    if (userId && tier) {
      try {
        await connectDB();
        
        // Upgrade the member in the database
        await User.findByIdAndUpdate(userId, { membershipTier: tier });
        
        console.log(`✅ Success: User ${userId} upgraded to ${tier} tier.`);
      } catch (dbError) {
        console.error("Database update failed:", dbError);
        return NextResponse.json({ error: "Database update failed" }, { status: 500 });
      }
    }
  }

  // Acknowledge receipt of the event
  return NextResponse.json({ received: true }, { status: 200 });
}