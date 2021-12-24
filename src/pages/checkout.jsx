import React, { useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import styled from "styled-components"

import CheckoutForm from "../components/CheckoutForm"
import Layout from "../components/Layout"
import { UserContext } from "../context/users"
import { CartContext } from "../context/carts"

const Checkout = () => {
  const { user } = useContext(UserContext)
  const { cart, total, tax, shipping } = useContext(CartContext)
  const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

  return (
    <Layout>
      <main className="page">
        <section className="contact-page">
          <div className="cart-wrapper">
            {cart?.items.map(({ product, quantity }) => (
              <article key={product.id} className="cart-item">
                <div className="image">
                  <img src={product.image} alt="cart item" />
                </div>
                <div className="details">
                  <span>{product.title}</span>
                  <span>
                    Price X Qty: KD{product.price} X {quantity}
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    Total: KD {(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </article>
            ))}
            <SubTotal>SubTotal : KD{total}</SubTotal>
            <SubTotal>Taxes : KD{tax}</SubTotal>
            <SubTotal>Shipping : KD{shipping}</SubTotal>
            <Total>Total : KD{total}</Total>
          </div>
          <article>
            <Elements stripe={stripePromise}>
              <section>
                <h4>Shippment and Billing Details</h4>
                {user && <h5>{user.user.name}</h5>}
                <CheckoutForm />
              </section>
            </Elements>
          </article>
        </section>
      </main>
    </Layout>
  )
}

const Total = styled.span`
  border-top: 1px solid var(--grey-500);
  font-weight: bold;
  margin-left: 9rem;
  color: var(--grey-1000);
`

const SubTotal = styled.span`
  font-style: italic;
  margin-left: 9rem;
  color: var(--grey-1000);
  font-size: 0.9rem;
`
export default Checkout
