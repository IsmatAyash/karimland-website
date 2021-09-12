import React, { useContext } from "react"
import { withAuthenticator } from "@aws-amplify/ui-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../components/CheckoutForm"
import { UserContext } from "../context/users"
import { CartContext } from "../context/carts"
import styled from "styled-components"

const Checkout = () => {
  const { user } = useContext(UserContext)
  const { cart, total, tax, shipping } = useContext(CartContext)
  const stripePromise = loadStripe(
    "pk_test_51HRNBKE41CMIaPCOspVA8HNH9z6mLgmSIh60NeR6WIdz3Zt3GR3HyMNOY6KJG8TdEYDX9Rz8EKb2MyydfRzHCQoH00geFUH06W"
  )
  return (
    <main className="page">
      <section className="contact-page">
        <div className="cart-wrapper">
          {cart.map(({ id, title, price, image, amount }) => (
            <article key={id} className="cart-item">
              <div className="image">
                <img src={image} alt="cart item" />
              </div>
              <div className="details">
                <span>{title}</span>
                <span>
                  Price X Qty: KD{price} X {amount}
                </span>
                <span style={{ fontWeight: "bold" }}>
                  Total: KD {(price * amount).toFixed(2)}
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
              {user && <h5>{user}</h5>}
              <CheckoutForm />
            </section>
          </Elements>
        </article>
      </section>
    </main>
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
export default withAuthenticator(Checkout)
