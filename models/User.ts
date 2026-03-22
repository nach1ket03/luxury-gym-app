import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"] 
    },
    email: { 
      type: String, 
      unique: true, 
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },
    password: { 
      type: String, 
      required: [true, "Password is required"],
      select: false // Ensures password isn't accidentally sent back in queries
    },
    membershipTier: { 
      type: String, 
      enum: ["None", "Foundation", "Pro", "Elite"], 
      default: "None" 
    },
    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },
  },
  { 
    timestamps: true 
  }
);

// Prevent mongoose from compiling the model multiple times in Next.js
const User = models.User || model("User", UserSchema);

export default User;