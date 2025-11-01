import jwt from "jsonwebtoken"
import User from "../models/user.js"

const checkAuth = async(req, res, next)=>{
  const token = req.cookies.jwt;
  if(!token){
    return res.status(401).send({error: "You are not an authorised user!!"});
  }
  try {
    const {_id} = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    if(!user){
    return res.status(404).send({error: "User not found!!"});
    }
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  } catch (error) {
    return res.status(401).send({ error: "Invalid token!" });
  }
  next();
}

export default checkAuth;