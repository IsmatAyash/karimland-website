import React, { useState, useEffect, createContext } from "react"
import { createCart } from "../api/mutations"

const SavedCartContext = createContext()

const SavedCartProvider = ({ children }) => {
  const [savedCart, setSavedCart] = useState([])
  const [savedCartTotal, setSavedCartTotal] = useState(0)

  const addToCart = product => {
    const { id, title, price, image, quantity } = product
    // try {
    //   await API.graphql(graphqlOperation(createCart, { input: payload }))
    // } catch (error) {
    //   console.log(error)
    // }
    // const cartItem = [...cart].find(item => item.id === id)
    // if (cartItem) {
    //   increaseAmount(id)
    // } else {
    //   const cartItems = [...cart, { id, title, image, price, amount }]
    //   setCart(cartItems)
    // }
  }

  return (
    <SavedCartContext.Provider
      value={{
        savedCart,
        savedCartTotal,
        addToCart,
        updateCart: product => setSavedCart(product),
      }}
    >
      {children}
    </SavedCartContext.Provider>
  )
}

export { SavedCartContext, SavedCartProvider }
