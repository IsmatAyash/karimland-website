import { ApolloError } from "apollo-server-express"

export default {
  Query: {
    carts: async (parent, args, { Cart }) => {
      try {
        const carts = await Cart.find().populate("buyer").exec()
        if (!carts) throw new ApolloError("Unable to query carts.")
        return carts
      } catch (err) {
        throw new ApolloError(err.message, 400)
      }
    },
    getCart: async (_, { buyer }, { Cart }) =>
      await Cart.findOne({ buyer }).populate("buyer"),
  },
  Mutation: {
    addCartItem: async (_, { newCart, id }, { Cart, Product, User, user }) => {
      console.log("NEW_CART", newCart)
      try {
        const cartItem = await Cart.create({
          items: [newCart],
          buyer: user.sub,
        })
        await cartItem.populate("buyer")
        console.log("CARTITEM", cartItem)

        // let result = await Cart.create({ ...newCart, buyer: user.sub })
        // if (!result) {
        //   throw new ApolloError("Unable to create cart")
        // } else {
        //   let usr = await User.findById(user.sub)
        //   usr.sellerProducts.push(result.id)
        //   await usr.save()
        //   await result.populate("seller")
        //   return result
        // }
        return cartItem
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
    updCartItem: async (_, { updatedProduct, id }, { Product, user }) => {},
    delCartItem: async (_, { id }, { Product }) => {},
  },
}
