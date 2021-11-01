const { Product } = require("./product")
const { Seller } = require("./seller")

const resolvers = {
  Query: {
    hello: () => "Hello from gql",
    getProducts: async parent => {
      console.log(parent)
      return await Product.find()
    },
    getSellers: async () => await Seller.find(),
  },
  Mutation: {
    createSeller: (parent, { name, address, country }, context, info) => {
      const seller = new Seller({ name, address, country })
      return seller.save()
    },
    createProduct: (_, args) => {
      const {
        title,
        image,
        unit,
        price,
        inventory,
        oldPrice,
        featured,
        category,
        description,
        tags,
        sellerId,
      } = args.product
      const product = new Product({
        title,
        image,
        unit,
        price,
        inventory,
        oldPrice,
        featured,
        category,
        description,
        tags,
        sellerId,
      })
      return product.save()
    },
  },
}

module.exports = resolvers
