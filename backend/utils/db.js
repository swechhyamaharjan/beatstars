import express from "express";
import mongoose from "mongoose";
const mongodbURL = "mongodb://localhost:27017/beatstars";

async function connectdb(){
  try {
    const connection = await mongoose.connect(mongodbURL);
    console.log(`Connected at ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to database ${error.message}`)
    process.exit(1);
  }
}
export default connectdb;