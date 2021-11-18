import { ApolloError, UserInputError } from "apollo-server-express"
import { compare, hash } from "bcrypt"
import { ValidationError } from "yup"
import { issueToken, serializeUser, formatYupError } from "../../functions"
import {
  UserRegistrationRules,
  UserAuthenticationRules,
} from "../../validators/user"

const myCustomLabels = {
  totalDocs: "userCount",
  docs: "users",
  limit: "perPage",
  page: "currentPage",
  nextPage: "next",
  prevPage: "prev",
  totalPages: "pageCount",
  pagingCounter: "slNo",
  meta: "paginator",
}

export default {
  Query: {
    authenticateUser: async (_, { email, password }, { User }) => {
      await UserAuthenticationRules.validate(
        { email, password },
        { abortEarly: false }
      )
      try {
        let user = await User.findOne({ email })
        if (!user) throw new ApolloError("Invalid credentials")

        // check password
        const isMatch = await compare(password, user.password)
        if (!isMatch) throw new ApolloError("Invalid credentials")

        // issue token
        user = user.toObject()
        user.id = user._id
        user = serializeUser(user)
        const token = await issueToken(user)
        return { token, user }
      } catch (error) {
        throw new ApolloError(error.message, 400)
        // console.log(error)
        // console.log(formatYupError(error))
        // throw new Error(formatYupError(error))
      }
    },
    users: async (parent, { page, limit }, { User }) => {
      try {
        const options = {
          limit: limit || 10,
          page: page || 1,
          sort: { name: 1 },
          populate: "sellerProducts",
          customLabels: myCustomLabels,
        }
        const users = await User.paginate({}, options)
        return users
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
    getUser: async (_, { id }, { User }) =>
      await User.findById(id).populate("sellerProducts").exec(),
    sellers: async (_, { page, limit }, { User }) => {
      try {
        const options = {
          limit: limit || 10,
          page: page || 1,
          sort: { name: 1 },
          populate: "sellerProducts",
          customLabels: myCustomLabels,
        }
        const sellers = await User.paginate({ userType: "Seller" }, options)
        return sellers
      } catch (error) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
  },
  Mutation: {
    registerUser: async (_, { newUser }, { User }) => {
      await UserRegistrationRules.validate(newUser, { abortEarly: false })
      try {
        const { email, password } = newUser
        // check email uniqueness in the database
        let user = await User.findOne({ email })
        if (user) throw new ApolloError("Email already registered", "403")

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
      } catch (error) {
        throw new ApolloError(error.message, 400)
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
