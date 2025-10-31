import express from "express";
import User from "../models/user.js"

const signup = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const user = await User.findOne({ email })
  if (user) {
    return res.status(400).send("User already exists!!")
  }
  const newUser = await User.create({
    name,
    email,
    password,
    isAdmin
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
  if (await user.matchPassword(password)) {
    res.status(200).send({
      message: "User logged in success!!", User: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  }
  else {
    res.status(400).send({ error: "Invalid Password!!" })
  }
}

export { signup, login };

