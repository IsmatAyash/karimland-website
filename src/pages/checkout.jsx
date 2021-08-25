import React from "react"
import { AmplifyAuthenticator } from "@aws-amplify/ui-react"
// import { loadStripe } from "@stripe/stripe-js"
// import { Elements } from "@stripe/react-stripe-js"
// import CheckoutForm from "../components/CheckoutForm"

const Checkout = () => {
  // const stripePromise = loadStripe(
  //   "pk_test_51HRNBKE41CMIaPCOspVA8HNH9z6mLgmSIh60NeR6WIdz3Zt3GR3HyMNOY6KJG8TdEYDX9Rz8EKb2MyydfRzHCQoH00geFUH06W"
  // )
  return (
    <section className="checkout-wrapper">
      <AmplifyAuthenticator>
        <p>Replace with stripe element</p>
        {/* <Elements stripe={stripePromise}>
          <section>
            <h2>Time to Checkout?</h2>
            <CheckoutForm />
          </section>
        </Elements> */}
      </AmplifyAuthenticator>
    </section>
  )
}

export default Checkout
