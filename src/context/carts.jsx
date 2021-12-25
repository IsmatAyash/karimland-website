import React, { useState, createContext } from "react"
import { useMutation, useLazyQuery } from "@apollo/client"

import {
  ADD_CART_ITEM,
  UPDATE_CART_ITEM,
  DEL_CART_ITEM,
  DEL_CART,
} from "../graphql/mutations"
import { GET_CART } from "../graphql/queries"

const CartContext = createContext()

const TAXRATE = 0.15
const SHIPPING = 0.05

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const [total, setTotal] = useState(0)

  const [addNewCart] = useMutation(ADD_CART_ITEM)
  const [updCartItemQty] = useMutation(UPDATE_CART_ITEM)
  const [delCartItemProd] = useMutation(DEL_CART_ITEM)
  const [delUserCart] = useMutation(DEL_CART, {
    onCompleted: () => setCart(null),
  })

  const [getUserCart] = useLazyQuery(GET_CART, {
    fetchPolicy: "cache-and-network",
    onCompleted: cart => {
      if (cart.getCart) {
        setCart(cart.getCart)
        const total = cart.getCart.items.reduce((total, item) => {
          return (total += item.quantity * item.product.price)
        }, 0)
        setTotal(parseFloat(total).toFixed(2))
      }
    },
  })

  const getCart = async buyer => await getUserCart({ variables: { buyer } })

  // useEffect(() => {
  //   if (cart) {
  //     const total = cart.items.reduce((total, item) => {
  //       return (total += item.quantity * item.product.price)
  //     }, 0)
  //     setTotal(parseFloat(total).toFixed(2))
  //   }
  // }, [cart])

  const addToCart = async newCart => {
    const { data } = await addNewCart({ variables: { newCart: newCart } })
    setCart(data.addCartItem)
  }

  const updCartItem = async (updatedCartItem, buyer) => {
    const { data } = await updCartItemQty({
      variables: { updatedCartItem },
      refetchQueries: [{ query: GET_CART, variables: { buyer } }],
      awaitRefetchQueries: true,
    })
    // setCart(data.updCartItem)
  }

  // const increaseAmount = id => {
  //   const updatedCart = [...cart].map(item => {
  //     return item.id === id ? { ...item, amount: item.amount + 1 } : item
  //   })
  //   setCart(updatedCart)
  // }

  // const decreaseAmount = (id, amount) => {
  //   let updatedCart = []
  //   if (amount === 1) {
  //     updatedCart = [...cart].filter(item => item.id !== id)
  //   } else {
  //     updatedCart = [...cart].map(item => {
  //       return item.id === id ? { ...item, amount: item.amount - 1 } : item
  //     })
  //   }
  //   setCart(updatedCart)
  // }

  // const addToCart = product => {
  //   const { id, title, price, image, amount } = product
  //   const cartItem = [...cart].find(item => item.id === id)
  //   if (cartItem) {
  //     increaseAmount(id)
  //   } else {
  //     const cartItems = [...cart, { id, title, image, price, amount }]
  //     setCart(cartItems)
  //   }
  // }

  const delCartItem = async (productId, buyer) => {
    const { data } = await delCartItemProd({
      variables: { productId },
      refetchQueries: [{ query: GET_CART, variables: { buyer } }],
      awaitRefetchQueries: true,
    })
    // setCart(data.delCartItem)
  }
  // const delCartItem = id => setCart([...cart].filter(c => c.id !== id))
  // const updCart = cart => setCart(cart)

  const clearCart = async id => await delUserCart({ variables: { id } })

  return (
    <CartContext.Provider
      value={{
        cart,
        total: (
          parseFloat(total) +
          parseFloat(total * TAXRATE) +
          parseFloat(total * SHIPPING)
        ).toFixed(2),
        tax: parseFloat(total * TAXRATE),
        shipping: parseFloat(total * SHIPPING),
        getCart,
        addToCart,
        updCartItem,
        delCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }
