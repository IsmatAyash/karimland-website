import React from "react"
import { ApolloProvider } from "@apollo/client"
import { UserProvider } from "../context/users"
import { CartProvider } from "../context/carts"
import { ProductProvider } from "../context/products"
import { client } from "./client"

export const wrapRootElement = ({ element }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ProductProvider>
          <CartProvider>{element}</CartProvider>
        </ProductProvider>
      </UserProvider>
    </ApolloProvider>
  )
}
