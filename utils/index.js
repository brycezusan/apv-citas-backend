import jwt from "jsonwebtoken"
export const generarID = ()=>{
  return Date.now().toString(16) + Math.random().toString(16).substring(2)
}

export const generateJWT = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{
    expiresIn:"30d"
  })
}