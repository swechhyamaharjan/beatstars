import express from "express";
import mongoose from "mongoose";
const mongodbURL = process.env.MONGO_URL;

async function connectdb(){
  try {
    await mongoose.connect(mongodbURL);
    console.log(`MongoDb connected`);
  } catch (error) {
    console.log(`Error connecting to database ${error.message}`)
    process.exit(1);
  }
}
export default connectdb;