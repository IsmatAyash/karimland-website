import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    otherFields: Boolean
  }
  extend type Mutation {
    imageUploader(file: Upload!): File!
  }

  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`
