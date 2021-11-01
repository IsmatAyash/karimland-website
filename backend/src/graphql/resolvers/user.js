import { ApolloError } from "apollo-server-errors"
import { compare, hash } from "bcrypt"
import { issueToken, serializeUser } from "../../functions"
import { sign } from "jsonwebtoken"

export default {
  Query: {
    authenticateUser: async (_, { email, password }, { User }) => {
      try {
        let user = await User.findOne({ email })
        if (!user) throw new Error("Invalid credentials")
        // check password
        const isMatch = await compare(password, user.password)
        if (!isMatch) throw new Error("Invalid credentials")
        // issue token
        user = user.toObject()
        user.id = user._id
        user = serializeUser(user)
        const token = await issueToken(user)
        return { token, user }
      } catch (err) {
        throw new ApolloError(err.message)
      }
    },
    users: async (parent, args, { User }) => await User.find(),
    getUser: async (_, { id }, { User }) => await User.findById(id),
    sellers: async (_, args, { User }) =>
      await User.find({ userType: "Seller" }),
  },
  Mutation: {
    registerUser: async (_, { newUser }, { User }) => {
      try {
        const { email, password } = newUser
        // check email uniqueness in the database
        let user = await User.findOne({ email })
        if (user) throw Error("Email already exist")

        // Create new user
        user = new User(newUser)
        // hash the password
        user.password = await hash(password, 12)
        // save user to the database
        let res = await user.save()
        res = res.toObject()
        res.id = res._id
        res = serializeUser(res)
        // Issue the access token
        const token = await issueToken(res)
        return { token, user: res }
      } catch (err) {
        throw new ApolloError(err.message)
      }
    },
    editUserById: async (_, { updatedUser, id }, { User }) => {
      return await User.findByIdAndUpdate(id, { ...updatedUser }, { new: true })
    },
    delUserById: async (_, { id }, { User }) => {
      const deletedUser = await User.findByIdAndDelete(id)
      return {
        success: true,
        id: deletedUser.id,
        message: "User was deleted successfully.",
      }
    },
  },
}
