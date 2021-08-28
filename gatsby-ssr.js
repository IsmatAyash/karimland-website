const React = require("react")

const { ProductProvider } = require("./src/context/products")
const { UserProvider } = require("./src/context/users")
const { CartProvider } = require("./src/context/carts")

exports.wrapRootElement = ({ element }) => {
  return (
    <UserProvider>
      <ProductProvider>
        <CartProvider>{element}</CartProvider>
      </ProductProvider>
    </UserProvider>
  )
}
