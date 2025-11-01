import jwt from "jsonwebtoken";

const createToken = (res, _id)=>{
  const token = jwt.sign({_id}, process.env.JWT_SECRET);
  res.cookie("jwt", token, {
    httpOnly: true,   
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict", 
    maxAge: 30 * 24 * 60 * 60 * 1000 
  });
}


export default createToken;