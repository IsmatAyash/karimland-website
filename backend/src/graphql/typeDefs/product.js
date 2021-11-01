import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    products: [Product!]!
    getProduct(id: ID!): Product!
  }

  extend type Mutation {
    delProductById(id: ID!): ProdNotification!
    createProduct(newProduct: ProductInput): Product!
    editProductById(updatedProduct: ProductInput, id: ID!): Product!
  }

  type Product {
    id: ID!
    title: String!
    unit: String!
    price: Float
    image: String!
  }

  input ProductInput {
    title: String!
    unit: String!
    price: Float
    image: String!
  }

  type ProdNotification {
    id: ID!
    message: String!
    success: Boolean
  }
`
