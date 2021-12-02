import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "./client"
import { UserProvider } from "../context/users"
import { CartProvider } from "../context/carts"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <UserProvider>
      <CartProvider>{element}</CartProvider>
    </UserProvider>
  </ApolloProvider>
)
