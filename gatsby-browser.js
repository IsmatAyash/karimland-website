import React from "react"
import { ProductProvider } from "./src/context/products"
import { UserProvider } from "./src/context/users"
import { CartProvider } from "./src/context/carts"

import Amplify from "aws-amplify"
import awsconfig from "./src/aws-exports"
import { SavedCartProvider } from "./src/context/cart"
Amplify.configure(awsconfig)

export const wrapRootElement = ({ element }) => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <SavedCartProvider>{element}</SavedCartProvider>
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  )
}
