import React, { useReducer, useEffect, useContext, useCallback } from "react"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { ProductContext } from "../../context/products"
import { CartContext } from "../../context/carts"
import { UserContext } from "../../context/users"
import reducer, {
  CARDCOMPLETE,
  PROCESSING,
  BILLDETAILS,
  initialState,
  ERROR,
  ORDERDETAILS,
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
  const { user } = useContext(UserContext)
  const { checkout } = useContext(ProductContext)
  const { cart, total, clearCart } = useContext(CartContext)

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    phone: user?.user?.phone,
    name: user?.user?.name,
    address: user?.user?.shippingAddress,
  })

  const stripe = useStripe()
  const elements = useElements()

  const checkOut = useCallback(async () => {
    try {
      const res = await checkout(state.orderDetails)
      dispatch({ type: PROCESSING, payload: false })
      if (res === "SUCCESS")
        dispatch({
          type: SUCCESS,
          payload: {
            res: true,
            text: "Successful payment - Your Order has been created",
          },
        })

      if (res === "ERROR")
        dispatch({
          type: SUCCESS,
          payload: {
            res: false,
            text: "Error while creating order, please check your billing details",
          },
        })

      if (res === "PROCESS PAYMENT ERROR")
        dispatch({
          type: ERROR,
          payload: "Error processing the payment check details",
        })
      clearCart(cart.id)
    } catch (err) {
      console.log(err.message)
    }
  }, [cart, state.orderDetails, clearCart, checkout])

  useEffect(() => {
    if (!cart) return
    if (!state.orderDetails.token) return

    checkOut()
  }, [state.orderDetails.token, cart, checkOut])

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
          total: parseFloat(total),
          cart,
        },
      })
    }
  }

  const handleChange = e => {
    const { id, value } = e.target
    dispatch({ type: BILLDETAILS, payload: { id, value } })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {user && (
        <>
          <Fieldset>
            <FormField
              label="Name"
              id="name"
              type="text"
              disabled={true}
              // required
              autoComplete="name"
              value={user.user.name}
              onChange={e => handleChange(e)}
            />
            <FormField
              label="Phone"
              id="phone"
              type="tel"
              disabled={true}
              // required
              // autoComplete="tel"
              value={user.user.phone}
              onChange={e => handleChange(e)}
            />
            <FormField
              label="Address"
              id="address"
              type="text"
              required
              // autoComplete="address"
              value={user.user.shippingAddress}
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
        </>
      )}
    </Form>
  )
}

export default CheckoutForm
