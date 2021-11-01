export default {
  Query: {
    products: async (parent, args, { Product }) => await Product.find(),
    getProduct: async (_, { id }, { Product }) => await Product.findById(id),
  },
  Mutation: {
    createProduct: async (_, { newProduct }, { Product }) => {
      return await Product.create(newProduct)
    },
    editProductById: async (_, { updatedProduct, id }, { Product }) => {
      return await Product.findByIdAndUpdate(
        id,
        { ...updatedProduct },
        { new: true }
      )
    },
    delProductById: async (_, { id }, { Product }) => {
      const deletedProd = await Product.findByIdAndDelete(id)
      return {
        success: true,
        id: deletedProd.id,
        message: "Product was deleted successfully.",
      }
    },
  },
}
