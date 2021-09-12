export const CARDCOMPLETE = "CARDCOMPLETE"
export const PROCESSING = "PROCESSING"
export const SUCCESS = "SUCCESS"
export const ERROR = "ERROR"
export const ORDERDETAILS = "ORDERDETAILS"
export const RESET = "RESET"
export const BILLDETAILS = "BILLDETAILS"

export const initialState = {
  cardComplete: false,
  processing: false,
  error: null,
  success: { res: false, text: null },
  orderDetails: {
    total: 0,
    cart: [],
    name: "",
    phone: "",
    address: "",
    token: null,
  },
}

export default function reducer(state, { type, payload }) {
  switch (type) {
    case CARDCOMPLETE:
      return { ...state, error: payload.err, cardComplete: payload.complete }
    case PROCESSING:
      return { ...state, processing: payload }
    case SUCCESS:
      return { ...state, success: { res: payload.res, text: payload.text } }
    case BILLDETAILS:
      return {
        ...state,
        orderDetails: { ...state.orderDetails, [payload.id]: payload.value },
      }
    case ORDERDETAILS:
      return {
        ...state,
        error: null,
        orderDetails: {
          ...state.orderDetails,
          token: payload.token,
          total: payload.total,
          cart: payload.cart,
        },
      }
    case RESET:
      return initialState
    case ERROR:
      return { ...state, error: payload }
    default:
      return state
  }
}
