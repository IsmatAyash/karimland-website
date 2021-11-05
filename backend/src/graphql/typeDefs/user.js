import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    authUser: User!
    authenticateUser(email: String!, password: String!): AuthResp!
    users: [User!]
    getUser(id: ID!): User!
    sellers: [User!]
  }

  extend type Mutation {
    registerUser(newUser: UserInput): AuthResp!
    editUserById(updatedUser: UserInput, id: ID!): User!
    delUserById(id: ID!): AuthResp
  }

  type User {
    id: ID!
    email: String!
    name: String!
    billingAddress: [String!]
    shippingingAddress: [String!]
    country: String
    userType: UserType
    password: String!
    avatar: String
    role: String
    permissions: [String!]
    sellerProducts: [Product!]
    cartProducts: [Product!]
  }

  input UserInput {
    email: String!
    name: String!
    password: String!
    billingAddress: [String!]
    shippingingAddress: [String!]
    country: String
    userType: UserType
    avatar: String
    role: Role
    permissions: [String!]
  }

  type AuthResp {
    user: User!
    token: String!
  }

  enum UserType {
    Buyer
    Seller
  }

  enum Role {
    buyer
    seller
    admin
  }
`
