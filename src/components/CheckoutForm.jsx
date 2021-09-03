import React, { useState, useEffect, useContext } from "react"
import { navigate } from "gatsby"
import { ProductContext } from "../context/products"
import { CartContext } from "../context/carts"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
}

const CheckoutForm = () => {
  const { cart, total, clearCart } = useContext(CartContext)
  const { checkout } = useContext(ProductContext)
  const [orderDetails, setOrderDetails] = useState({
    cart,
    total,
    address: null,
    token: null,
  })
  const [error, setError] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (orderDetails.token) {
      checkout(orderDetails)
      clearCart()
      navigate("/")
    }
  }, [orderDetails])

  // Handle real-time validation errors from the card Element.
  const handleChange = event => {
    if (event.error) {
      setError(event.error.message)
    } else {
      setError(null)
    }
  }

  // Handle form submission.
  const handleSubmit = async event => {
    event.preventDefault()
    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message)
    } else {
      setError(null)
      // Send the token to your server.
      const token = result.token
      const grandTotal = total * 1.25 + total * 0.05
      setOrderDetails({ ...orderDetails, token: token.id, total: grandTotal })
    }
  }

  return (
    <div style={cardStyles}>
      <form onSubmit={handleSubmit}>
        <div className="checkout-form">
          <p>SubTotal: KD {total.toFixed(2)}</p>
          <p>Taxes: KD {(total * 0.25).toFixed(2)}</p>
          <p>Shipping: KD {(total * 0.05).toFixed(2)}</p>
          <p>Total: KD {(total * 1.25 + total * 0.05).toFixed(2)}</p>
          <label htmlFor="checkout-address">Shipping Address</label>
          <input
            id="checkout-address"
            type="text"
            onChange={e =>
              setOrderDetails({ ...orderDetails, address: e.target.value })
            }
          />
          <div className="stripe-section">
            <label htmlFor="stripe-element"> Credit or debit card </label>
            <CardElement
              id="stripe-element"
              options={CARD_ELEMENT_OPTIONS}
              onChange={handleChange}
            />
          </div>
          <div className="card-errors" role="alert">
            {error}
          </div>
        </div>
        <button type="submit" className="btn btn-bgfg-colors small block">
          Submit Payment
        </button>
      </form>
    </div>
  )
}

const cardStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "5px 5px 25px 0 rgba(46,61,73,.2)",
  backgroundColor: "#fff",
  borderRadius: "6px",
  maxWidth: "600px",
}

export default CheckoutForm
