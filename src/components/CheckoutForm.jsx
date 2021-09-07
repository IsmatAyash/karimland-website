import React, { useState, useEffect, useContext } from "react"
import { navigate } from "gatsby"
import { ProductContext } from "../context/products"
import { CartContext } from "../context/carts"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { FaCheckCircle } from "react-icons/fa"
import styled, { keyframes } from "styled-components"

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
  const [loading, setLoading] = useState(false)
  const { cart, total, clearCart } = useContext(CartContext)
  const { checkout } = useContext(ProductContext)
  const [orderDetails, setOrderDetails] = useState({
    cart,
    total,
    address: null,
    token: null,
  })
  const [error, setError] = useState(null)
  const [resp, setResp] = useState({})
  const stripe = useStripe()
  const elements = useElements()

  const checkOut = async () => {
    const res = await checkout(orderDetails)
    if (res.statusCode === "SUCCESS") {
      setLoading(false)
      setResp(res)
    } else {
      setResp(res)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderDetails.token) checkOut()
  }, [orderDetails])

  // Handle real-time validation errors from the card Element.
  const handleChange = event => {
    if (event.error) {
      setError(event.error.message)
      setLoading(false)
    } else {
      setError(null)
    }
  }

  // Handle form submission.
  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)
    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message)
      setLoading(false)
    } else {
      setError(null)
      // Send the token to your server.
      const token = result.token
      const grandTotal = total * 1.25 + total * 0.05
      setOrderDetails({ ...orderDetails, token: token.id, total: grandTotal })
    }
  }

  const respStyle = {
    color: resp.statusCode === "SUCCESS" ? "var(--green-dark)" : "red",
    marginTop: 15,
  }

  return (
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button disabled={resp.statusCode === "SUCCESS"}>
          {loading ? (
            <Circle />
          ) : resp.statusCode !== "SUCCESS" ? (
            <ButtonText loading={loading}>Submit</ButtonText>
          ) : (
            <FaCheckCircle
              style={{ fontSize: "25px" }}
              className="react-icons"
            />
          )}
        </Button>
        <Button onClick={() => navigate("/")}>Close</Button>
      </div>
      {resp && <p style={respStyle}>{resp.msg}</p>}
    </form>
  )
}

const breatheAnimation = keyframes`
  80% {
    border: 2px solid transparent;
    border-left: 2px solid var(--grey-100);
  }
  100% {
    transform: rotate(1080deg);
    border: 2px solid var(--grey-100);
  }
`
const Circle = styled.div`
  height: 30px;
  width: 30px;
  border: 1px solid var(--grey-100);
  border-radius: 50%;
  animation-name: ${breatheAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 45px;
  min-width: 150px;
  background-color: var(--primary-500);
  color: var(--grey-100);

  &:hover {
    width: 150px;
    background-color: var(--primary-700);
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--primary-200);
    color: var(--grey-300);
  }
`

const ButtonText = styled.span`
  visibility: ${({ loading }) => (loading ? "hidden" : "visible")};
`

// const Button = styled.button`
//   position: relative;
//   opacity: ${({ success }) => (success ? "0.3" : "1")};
//   cursor: ${({ success }) => (success ? "not-allowed" : "pointer")};
//   appearance: none;
//   color: var(--white);
//   background: var(--primary-500);
//   border: none;
//   border-radius: var(--borderRadius);
//   letter-spacing: var(--letterSpacing);
//   padding: 0.375rem 0.75rem;
//   box-shadow: var(--shadow-1);
//   transition: var(--transition);
//   text-transform: capitalize;
//   :hover {
//     color: var(--white);
//     background: var(--primary-900);
//     box-shadow: var(--shadow-2);
//   }
//   :disabled {
//     cursor: not-allowed;
//   }
//   &:after {
//     content: "";
//     position: absolute;
//     width: 25px;
//     height: 25px;
//     top: 0;
//     bottom: 0;
//     right: 0;
//     left: 0;
//     margin: auto;
//     border: 4px solid transparent;
//     border-top-color: var(--white);
//     border-radius: 50%;
//     animation: ${spin} 1s ease infinite;
//   }
// `

// const spin = keyframes`
// from { transform: rotate(0deg); }
// to { transform: rotate(360deg); }
// `

export default CheckoutForm
