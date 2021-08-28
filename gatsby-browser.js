import React from "react"
import { ProductProvider } from "./src/context/products"
import { UserProvider } from "./src/context/users"
import { CartProvider } from "./src/context/carts"

import Amplify from "aws-amplify"
import awsconfig from "./src/aws-exports"
Amplify.configure(awsconfig)

export const wrapRootElement = ({ element }) => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>{element}</CartProvider>
      </ProductProvider>
    </UserProvider>
  )
}
