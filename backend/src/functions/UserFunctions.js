import { sign } from "jsonwebtoken"
import { SECRET } from "../config"
import { pick } from "lodash"

export const issueToken = async user => {
  let token = await sign(
    {
      userInfo: { ...user },
    },
    SECRET,
    {
      algorithm: "HS256",
      subject: user.id.toString(),
      expiresIn: "1d",
    }
  )
  return `Bearer ${token}`
}

export const serializeUser = user =>
  pick(user, [
    "id",
    "email",
    "name",
    "avatar",
    "role",
    "permissions",
    "userType",
    "billingAddress",
    "shippingAddress",
    "country",
  ])
