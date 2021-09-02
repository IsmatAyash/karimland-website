import React, { useContext } from "react"
import { CartContext } from "../context/carts"

const Cart = () => {
  const { cart, total, increaseAmount, decreaseAmount } =
    useContext(CartContext)

  if (!cart.length) return <h3>Empty Cart</h3>
  return (
    <main className="page">
      <section className="cart-section"></section>
    </main>
  )
}

export default Cart
