import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    authUser: User!
    authenticateUser(email: String!, password: String!): AuthResp!
    users(page: Int, limit: Int): userPaginator!
    getUser(id: ID!): User!
    sellers(page: Int, limit: Int): userPaginator!
  }

  extend type Mutation {
    registerUser(newUser: UserInput): AuthResp!
    editUserById(updatedUser: UserInput, id: ID!): User!
    delUserById(id: ID!): AuthResp
    forgotPassword(id: ID!, email: String!): User
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

  type userPaginator {
    users: [User!]!
    paginator: userLabels
  }

  type userLabels {
    userCount: Int
    perPage: Int!
    pageCount: Int!
    currentPage: Int!
    slNo: Int!
    hasPrevPage: Boolean
    hasNextPage: Boolean
    prev: Int
    next: Int
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
