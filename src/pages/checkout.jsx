import React from "react"
import { withAuthenticator } from "@aws-amplify/ui-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../components/CheckoutForm"

const Checkout = () => {
  const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
  return (
    <section className="checkout-wrapper">
      <Elements stripe={stripePromise}>
        <section>
          <h2>Checkout</h2>
          <CheckoutForm />
        </section>
      </Elements>
    </section>
  )
}

export default withAuthenticator(Checkout)
