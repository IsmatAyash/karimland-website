import { verify } from "jsonwebtoken"
import { SECRET } from "../config"
import { User } from "../models"

const AuthMiddleware = async (req, res, next) => {
  let decodedToken
  const headers = req.get("Authorization")
  console.log("HEADERS", headers)
  if (!headers) {
    req.isAuth = false
    return next()
  }

  // extract token
  const token = headers.split(" ")[1]
  if (!token || token === "") {
    req.isAuth = false
    return next()
  }

  // decode token using verify
  try {
    console.log("TOKEN", token)
    decodedToken = await verify(token, SECRET)
    console.log("DECODED TOKEN", decodedToken)
  } catch (err) {
    console.log("ERROR ", err)
    req.isAuth = false
    return next()
  }

  // Find user in the database
  const authUser = await User.findById(decodedToken.id)
  console.log("AUTHUSER", authUser)
  if (!authUser) {
    req.isAuth = false
    return next()
  }

  req.isAuth = true
  req.user = authUser
  return next()
}

export default AuthMiddleware
