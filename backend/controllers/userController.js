import User from "../models/user.js"
import createToken from "../utils/generateToken.js";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

const signup = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const user = await User.findOne({ email })
  if (user) {
    return res.status(400).send("User already exists!!")
  }
  if (!password) {
    return res.status(400).send("Password is required for local signup");
  }
  const newUser = await User.create({
    name,
    email,
    password,
    isAdmin,
    provider: "local",
    emailVerified: false
  })
  res.send({
    message: "User created successfully", User:
    {
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    }
  });
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User doesn't exist of this email");
  }
  
  // Check if user has a password set
  if (!user.password) {
    return res.status(400).send({ error: "No password set for this account. Please set a password first." });
  }
  
  if (!(await user.matchPassword(password))) {
    return res.status(400).send({ error: "Invalid Password!!" })
  }
  
  if (!user.emailVerified) {
    return res.status(403).send("Email not verified");
  }
  
  createToken(res, user._id);
  res.status(200).send({
    message: "User logged in success!!", User: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  });
}

// Google-first signup flow: create or update a user, send verification email
const googleSignup = async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).send("Email required");

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name: name || email.split("@")[0],
      email,
      provider: "google",
      emailVerified: false
    });
  } else {
    if (user.emailVerified && user.provider === "local") {
      return res.status(400).send("User already exists and is verified");
    }
    user.provider = "google";
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.verificationToken = token;
  user.verificationExpires = new Date(Date.now() + 1000 * 60 * 60);
  await user.save();

  const baseUrl = process.env.APP_BASE_URL || "http://localhost:5173/";
  const verifyUrl = `${baseUrl}#/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `<p>Verify your email to continue signup.</p>
           <p><a href="${verifyUrl}">Click here to verify</a></p>
           <p>This link expires in 1 hour.</p>`
  });

  res.status(200).send({ message: "Verification email sent" });
};

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).send("Token required");
  const user = await User.findOne({
    verificationToken: token,
    verificationExpires: { $gt: new Date() }
  });
  if (!user) return res.status(400).send("Invalid or expired token");

  user.emailVerified = true;
  await user.save();

  res.status(200).send({ message: "Email verified. You can now set your password.", token });
};

const setPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).send("Token and password required");

  const user = await User.findOne({
    verificationToken: token,
    verificationExpires: { $gt: new Date() },
    emailVerified: true
  });
  if (!user) return res.status(400).send("Invalid or expired token");

  user.password = password;
  // Update provider to local since user now has a password-based account
  user.provider = "local";
  user.verificationToken = undefined;
  user.verificationExpires = undefined;
  await user.save();

  createToken(res, user._id);

  res.status(200).send({ message: "Password set. Signup complete. You can now login with your email and password." });
};

export { signup, login, googleSignup, verifyEmail, setPassword };

// Forgot password: request reset link
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email required");
  const user = await User.findOne({ email });
  if (!user) {
    // Do not reveal if email exists
    return res.status(200).send({ message: "If that email exists, a reset link has been sent." });
  }
  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes
  await user.save();

  const baseUrl = process.env.APP_BASE_URL || "http://localhost:5173/";
  const resetUrl = `${baseUrl}#/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your password",
    html: `<p>You requested a password reset.</p>
           <p><a href="${resetUrl}">Click here to reset your password</a></p>
           <p>This link expires in 30 minutes.</p>`
  });

  res.status(200).send({ message: "If that email exists, a reset link has been sent." });
};

// Reset password using token
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).send("Token and password required");
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() }
  });
  if (!user) return res.status(400).send("Invalid or expired token");
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.status(200).send({ message: "Password has been reset." });
};

