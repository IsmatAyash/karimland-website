import { flatten } from "../../utils/flattenObj"

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
    details: [],
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
          details: payload.cart.items.map(item => {
            const { id, title, unit, price, image, seller } = item.product
            return {
              productId: id,
              quantity: item.quantity,
              unit,
              title,
              price,
              image,
              sellerId: seller.id,
              sellerName: seller.name,
            }
          }),
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

//   "newOrder": [{
//     "productId":"619621d5fa36d2d13ef59a27",
//     "quantity": 2,
//     "unit": "kg",
//     "price": 10,
//     "image": "http",
//     "title": "Organic Salad",
//     "sellerId": "618776703dc2e3c7bc8386e1",
//     "sellerName": "Alexy Ayash"
//   },
