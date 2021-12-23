import React, { useContext } from "react"
import { CartContext } from "../context/carts"

const Cart = () => {
  const { cart } = useContext(CartContext)

  if (!cart.items.length) return <h3>Empty Cart</h3>
  return (
    <main className="page">
      <section className="cart-section"></section>
    </main>
  )
}

export default Cart
