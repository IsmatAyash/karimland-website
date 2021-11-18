import { ApolloError } from "apollo-server-express"

const myCustomLabels = {
  totalDocs: "productCount",
  docs: "products",
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
    products: async (parent, args, { Product }) => {
      try {
        const prod = await Product.find().populate("seller").exec()
        if (!prod) throw new ApolloError("Unable to query products.")
        return prod
      } catch (err) {
        throw new ApolloError(err.message, 400)
      }
    },
    getProduct: async (_, { id }, { Product }) => {
      return await Product.findById(id).populate("seller")
    },
    productsByPage: async (parent, { page, limit }, { Product }) => {
      try {
        const options = {
          limit: limit || 10,
          page: page || 1,
          sort: { createdAt: 1 },
          populate: "seller",
          customLabels: myCustomLabels,
        }
        const products = await Product.paginate({}, options)
        return products
      } catch (error) {
        console.log(error.message)
        throw new ApolloError(error.message, 400)
      }
    },
  },

  Mutation: {
    createProduct: async (_, { newProduct }, { Product, User, user }) => {
      try {
        let result = await Product.create({ ...newProduct, seller: user.sub })
        if (!result) {
          throw new ApolloError("Unable to create product")
        } else {
          let usr = await User.findById(user.sub)
          usr.sellerProducts.push(result.id)
          await usr.save()
          await result.populate("seller")
          return result
        }
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
    editProductById: async (_, { updatedProduct, id }, { Product, user }) => {
      try {
        let editedProd = await Product.findOneAndUpdate(
          { _id: id, seller: user.sub },
          { ...updatedProduct },
          { new: true }
        )
        if (!editedProd) throw new ApolloError("Unable to update the product")
        await editedProd.populate("seller")
        return editedProd
      } catch (err) {
        throw new ApolloError(err.message, 400)
      }
    },
    delProductById: async (_, { id }, { Product }) => {
      try {
        const deletedProd = await Product.findOneAndDelete(id)
        if (!deletedProd)
          throw new ApolloError("Unable to delete this product.")
        return {
          success: true,
          id: deletedProd.id,
          message: "Product was deleted successfully.",
        }
      } catch (err) {
        throw new ApolloError(err.message, 400)
      }
    },
  },
}
