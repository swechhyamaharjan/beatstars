import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import {z} from "zod";

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
    required: true,
    minlength: 6
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true
})

userSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword){
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
 
const User = mongoose.model ("User", userSchema)

export default User;