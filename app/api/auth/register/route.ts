import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    // Extract the data sent from the frontend
    const { name, email, password } = await req.json();

    // 1. Strict Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Please provide all required fields." }, 
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." }, 
        { status: 400 }
      );
    }

    // 2. Establish Database Connection
    await connectDB();

    // 3. Prevent Duplicate Accounts
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "An elite profile with this email already exists." }, 
        { status: 409 }
      );
    }

    // 4. Cryptographic Hashing
    // A salt round of 12 is the industry standard for balancing speed and security
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create the Member Profile
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6. Return a successful, brand-aligned response
    return NextResponse.json(
      { message: "Welcome to AURA. Your legacy begins now." }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." }, 
      { status: 500 }
    );
  }
}