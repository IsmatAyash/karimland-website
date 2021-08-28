import React, { useContext } from "react"
import { CartContext } from "../context/carts"
import { FiChevronUp, FiChevronDown } from "react-icons/fi"
import { Layout } from "../components/Layout"
import { navigate } from "gatsby"

const Cart = () => {
  const { cart, total, increaseAmount, decreaseAmount } =
    useContext(CartContext)

  if (!cart.length) return <h3>Empty Cart</h3>
  return (
    <main className="page">
      <section className="cart-section">
        <header>
          <h2>My Cart</h2>
        </header>
        <div className="cart-wrapper">
          {cart.map(({ id, title, price, image, amount }) => (
            <article key={id} className="cart-item">
              <div className="image">
                <img src={image} alt="cart item" />
              </div>
              <div className="details">
                <p>{title}</p>
                <p>$ {price}</p>
              </div>
              <div className="amount">
                <button onClick={() => increaseAmount(id)}>
                  <FiChevronUp />
                </button>
                <p>{amount}</p>
                <button onClick={() => decreaseAmount(id, amount)}>
                  <FiChevronDown />
                </button>
              </div>
            </article>
          ))}
        </div>
        <div>
          <h3>Total: $ {total}</h3>
        </div>
        <div>
          <button className="btn" onClick={() => navigate("/checkout")}>
            Checkout
          </button>
        </div>
      </section>
    </main>
  )
}

export default Cart
