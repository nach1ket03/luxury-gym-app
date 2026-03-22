import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        await connectDB();

        // Find the user and explicitly select the password field (since we hid it in the schema)
        const user = await User.findOne({ email: credentials.email }).select("+password");
        
        if (!user) {
          throw new Error("No elite profile found with this email");
        }

        // Compare the cryptographically hashed password
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordMatch) {
          throw new Error("Incorrect password");
        }

        // Return the secure user object (NEVER return the password here)
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          membershipTier: user.membershipTier,
        };
      }
    })
  ],
  callbacks: {
    // Attach custom data to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.membershipTier = (user as any).membershipTier;
      }
      return token;
    },
    // Pass the token data into the active session
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).membershipTier = token.membershipTier;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth", // Points to our custom cinematic auth page
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };