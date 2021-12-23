import React from "react"
import { ApolloProvider } from "@apollo/client"
import { client } from "./client"
import { UserProvider } from "../context/users"
import { CartProvider } from "../context/carts"
import { ProductProvider } from "../context/products"

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <UserProvider>
      <ProductProvider>
        <CartProvider>{element}</CartProvider>
      </ProductProvider>
    </UserProvider>
  </ApolloProvider>
)
