import { ApolloError } from "apollo-server-express"

const myCustomLabels = {
  totalDocs: "orderCount",
  docs: "orders",
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
    orders: async (parent, { page, limit }, { Order }) => {
      try {
        const options = {
          limit: limit || 10,
          page: page || 1,
          sort: { createdAt: -1 },
          populate: "buyer",
          customLabels: myCustomLabels,
        }
        const orders = await Order.Paginate({}, options)
        if (!orders) throw new ApolloError("Unable to query orders.")
        return orders
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
    getOrder: async (_, { id }, { Order }) =>
      await Order.findById(id).populate("buyer"),
  },
  Mutation: {
    addOrder: async (_, { newOrder }, { Order, user }) => {
      try {
        // add new order
        const order = await Order.create({
          details: [...newOrder],
          buyer: user.sub,
        })
        return await order.populate("buyer")
      } catch (err) {
        console.log(err.message)
        throw new ApolloError(err.message, 400)
      }
    },
    shipit: async (_, args, { Order, user }) => {
      return null
    },
  },
}
