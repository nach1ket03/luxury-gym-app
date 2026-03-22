import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      planName 
    } = await req.json();

    // 1. Create a HMAC hex digest using your Secret Key to verify the signature
    // This proves the payment wasn't faked by the user
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 2. Connect to DB and Upgrade the User
      await connectDB();
      
      await User.findByIdAndUpdate(token.id, { 
        membershipTier: planName 
      });

      return NextResponse.json({ 
        message: "Payment verified. Welcome to the elite tier." 
      }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Signature verification failed" }, { status: 400 });
    }

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}