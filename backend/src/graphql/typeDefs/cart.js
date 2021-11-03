import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    carts: [Cart!]!
    getCart(id: ID!): Cart!
  }

  extend type Mutation {
    delCartItem(userId: ID!, productId: ID!): CartNotification!
    addCartItem(newCart: CartInput): Cart!
    updCartItem(updatedCartItem: CartInput, userId: ID!, productId: ID!): Cart!
    delCart(id: ID!): CartNotification!
  }

  type Cart {
    id: ID!
    items: [CartItem!]!
    buyer: User!
  }

  type CartItem {
    productId: ID!
    quantity: Int
  }

  input CartInput {
    productId: ID!
    quantity: Int
  }

  type CartNotification {
    id: ID!
    message: String!
    success: Boolean
  }
`
