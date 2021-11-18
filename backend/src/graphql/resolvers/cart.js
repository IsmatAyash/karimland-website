import { ApolloError } from "apollo-server-express"

const populateCartItem = async cartItem => {
  return await cartItem.populate([
    "buyer",
    { path: "items.product", select: "title unit price" },
  ])
}

const IncDecCartItem = async (Cart, user, item) => {
  return await Cart.findOneAndUpdate(
    {
      buyer: user.sub,
      "items.product": item.product,
    },
    { $inc: { "items.$.quantity": item.quantity } },
    { new: true }
  )
}

const prodNotDeleted = productId => ({
  id: productId,
  message: `Cart item wasn't found cannot delete!!`,
  success: false,
})

export default {
  Query: {
    carts: async (parent, args, { Cart }) => {
      try {
        const carts = await Cart.find()
          .populate([
            "buyer",
            { path: "items.product", select: "title unit price" },
          ])
          .exec()
        if (!carts) throw new ApolloError("Unable to query carts.")
        return carts
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
    getCart: async (_, { buyer }, { Cart }) =>
      await Cart.findOne({ buyer }).populate("buyer"),
  },
  Mutation: {
    addCartItem: async (_, { newCart, id }, { Cart, user }) => {
      try {
        // add new cart item
        let cartItem = await Cart.findOne({ buyer: user.sub })
        if (!cartItem) {
          cartItem = await Cart.create({
            items: [newCart],
            buyer: user.sub,
          })
        } else {
          // if product exist update update quantity in a carditem
          cartItem = await IncDecCartItem(Cart, user, newCart)

          // add new product to the array of products in cartItem setting quantity to 1
          if (!cartItem)
            cartItem = await Cart.findOneAndUpdate(
              {
                buyer: user.sub,
              },
              { $push: { items: newCart } },
              { new: true }
            )
        }
        return await populateCartItem(cartItem)
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
    updCartItem: async (_, { updCartItem, userId }, { Cart, user }) => {
      try {
        let cartItem = await IncDecCartItem(Cart, user, updCartItem)
        return await populateCartItem(cartItem)
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
    delCartItem: async (_, { productId }, { Cart, user }) => {
      try {
        let cartItem = await Cart.findOneAndUpdate(
          {
            buyer: user.sub,
            "items.product": productId,
          },
          { $pull: { items: { product: productId } } },
          { new: true }
        )

        if (!cartItem) return prodNotDeleted(productId)

        return {
          id: productId,
          message: "Cart item was deleted successfuly.",
          success: true,
        }
      } catch (err) {
        console.log(err.message)
        return prodNotDeleted(productId)
      }
    },
    delCart: async (_, { id }, { Cart, user }) => {
      try {
        const cartItem = await Cart.findByIdAndRemove(id)
        if (!cartItem) throw new ApolloError("Cart wasn't deleted!")
        return {
          id: cartItem.id,
          message: "Cart was deleted successfuly.",
          success: true,
        }
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
  },
}
