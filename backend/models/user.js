import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { z } from "zod";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return this.provider === "local";
    },
    validate: {
      validator: function(value) {
        // If password exists, it must be at least 6 characters
        if (value && value.length < 6) {
          return false;
        }
        return true;
      },
      message: "Password must be at least 6 characters long"
    }
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
})

userSchema.pre("save", async function(next){
  if(!this.isModified("password") || !this.password){
    return next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
   if (!this.password) return false;
   return await bcrypt.compare(enteredPassword, this.password);
}

export const userAddSchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false)
})

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const User = mongoose.model("User", userSchema)

export default User;