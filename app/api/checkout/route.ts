import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getToken } from "next-auth/jwt";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const { planName, price } = await req.json();

    // Razorpay requires amount in smallest currency sub-unit (paise for INR)
    // Assuming 'price' is in INR. If price was 2490, amount is 249000
    const amountInPaise = price * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: token.id as string,
        tier: planName,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ 
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      planName 
    });

  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}