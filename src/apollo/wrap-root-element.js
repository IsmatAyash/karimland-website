import React from "react"
import { ApolloProvider } from "@apollo/client"
import { UserProvider } from "../context/users"
import { CartProvider } from "../context/carts"
import { ProductProvider } from "../context/products"
import { client } from "./client"

export const wrapRootElement = ({ element }) => {
  const token = localStorage.getItem("token")
  if (token) localStorage.removeItem("token")
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
