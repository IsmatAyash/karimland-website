import React, { useReducer, useEffect, useContext } from "react"
// import { navigate } from "gatsby"
import { ProductContext } from "../../context/products"
import { CartContext } from "../../context/carts"
// import { UserContext } from "../../context/users"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import reducer, {
  CARDCOMPLETE,
  PROCESSING,
  BILLDETAILS,
  initialState,
  ERROR,
  ORDERDETAILS,
  RESET,
  SUCCESS,
} from "./reducer"
import { Form, Fieldset, FormRow, StripeElement } from "./CheckoutElements"
import FormField from "./FormField"
import ErrorMessage from "./ErrorMessage"
import SubmitButton from "./SubmitButton"

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#645cff",
      //   color: "#70747c",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "14px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "grey",
      },
      "::placeholder": {
        color: "grey",
      },
    },
    invalid: {
      iconColor: "red",
      color: "#ffc7ee",
    },
  },
}

const CheckoutForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { checkout } = useContext(ProductContext)
  const { cart, total, clearCart } = useContext(CartContext)
  // const { user } = useContext(UserContext)

  const stripe = useStripe()
  const elements = useElements()

  const checkOut = async () => {
    if (!state.orderDetails.token) return

    const res = await checkout(state.orderDetails)
    dispatch({ type: PROCESSING, payload: false })
    if (res.statusCode === "SUCCESS")
      dispatch({
        type: SUCCESS,
        payload: {
          res: true,
          text: "Successful payment - Your Order has been created",
        },
      })
    else
      dispatch({
        type: SUCCESS,
        payload: {
          res: false,
          text: "Error while creating order, please check your billing details",
        },
      })
    clearCart()
  }

  useEffect(() => {
    checkOut()
  }, [state.orderDetails])

  const handleSubmit = async event => {
    event.preventDefault()

    if (!stripe || !elements) return

    if (state.error) {
      elements.getElement("card").focus()
      return
    }

    if (state.cardComplete) {
      dispatch({ type: PROCESSING, payload: true })
    }

    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)

    if (result.error) dispatch({ type: ERROR, payload: result.error.message })
    else {
      dispatch({
        type: ORDERDETAILS,
        payload: {
          token: result.token.id,
          total,
          cart,
        },
      })
    }
  }

  const handleChange = e => {
    const { id, value } = e.target
    console.log("handlechange", id, value)
    dispatch({ type: BILLDETAILS, payload: { id, value } })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Fieldset>
        <FormField
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={state.orderDetails.name}
          onChange={e => handleChange(e)}
        />
        <FormField
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 5555 55555"
          required
          autoComplete="tel"
          value={state.orderDetails.phone}
          onChange={e => handleChange(e)}
        />
        <FormField
          label="Address"
          id="address"
          type="text"
          placeholder="shipping address"
          required
          autoComplete="address"
          value={state.orderDetails.address}
          onChange={e => handleChange(e)}
        />
      </Fieldset>
      <Fieldset>
        <FormRow>
          <StripeElement
            options={CARD_OPTIONS}
            onChange={e =>
              dispatch({
                type: CARDCOMPLETE,
                payload: { err: e.error, complete: e.complete },
              })
            }
          />
        </FormRow>
      </Fieldset>
      {state.error && <ErrorMessage>{state.error.message}</ErrorMessage>}
      {state.success && <ErrorMessage>{state.success.text}</ErrorMessage>}
      <SubmitButton
        processing={state.processing}
        error={state.error}
        disabled={!stripe}
        success={state.success.res}
      >
        Pay KD{total}
      </SubmitButton>
    </Form>
  )
}

export default CheckoutForm
