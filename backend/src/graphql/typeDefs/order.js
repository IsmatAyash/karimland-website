import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    orders(page: Int, limit: Int): orderPaginator!
    getOrder(id: ID!): Order!
  }

  extend type Mutation {
    addOrder(newOrder: [OrderInput]): Order!
    shipit(id: ID!, shipDet: ShipInput!): Order!
  }

  type Order {
    id: ID!
    buyer: User!
    details: [OrderDetail!]!
    orderStatus: String
    shippedAt: String
    fromAddress: String
    toAddress: String
    trackingNo: String
  }

  type OrderDetail {
    id: ID!
    title: String!
    unit: String!
    price: Float!
    quantity: Int!
    image: String!
  }

  type orderPaginator {
    orders: [Order!]!
    paginator: OrderLabels
  }

  type OrderLabels {
    orderCount: Int
    perPage: Int!
    pageCount: Int!
    currentPage: Int!
    slNo: Int!
    hasPrevPage: Boolean
    hasNextPage: Boolean
    prev: Int
    next: Int
  }

  input OrderInput {
    title: String!
    unit: String!
    price: Float!
    quantity: Int!
    image: String!
  }

  input ShipInput {
    fromAddress: String
    toAddress: String
    shippedAt: String
    orderStatus: OrderStatus
    trackingNo: String
  }

  enum OrderStatus {
    Pending
    Shipped
    Delivered
  }
`
