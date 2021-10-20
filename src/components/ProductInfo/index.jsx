import React, { useState, useContext } from "react"
import styled from "styled-components"

import { CartContext } from "../../context/carts"
import { UserContext } from "../../context/users"
import WeightSelector from "./WeightSelector"
import QuantitySelector from "./QuantitySelector"
import RatingStars from "../Reviews/RatingStars"
import Cart from "./Cart"
import { navigate } from "gatsby"

const ProductInfo = ({ prod, setUnitPrice, unitPrice, qty, setQty }) => {
  const [showCart, setShowCart] = useState(false)
  const { id, title, image, avgRating, ratings, quantity, prices, oldPrice } =
    prod
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(UserContext)

  const onAddCart = () => {
    if (!user) navigate("/signin")
    else {
      addToCart({ id, title, image, price: unitPrice, amount: qty })
      setShowCart(true)
    }
  }

  return (
    <>
      {showCart && <Cart closeCart={setShowCart} />}
      <h2>{title}</h2>
      <RatingStars avgRating={avgRating} ratings={ratings} />
      <div>Seller: Karim Land</div>
      <div>Availability: {quantity !== 0 ? "In Stock" : "Out of stock"}</div>
      <PriceCtr>
        Unit Price: KD {unitPrice} <OldPrice>KD {oldPrice}</OldPrice>
      </PriceCtr>
      <WeightSelector prices={prices} setUnitPrice={setUnitPrice} />
      <QuantitySelector
        qty={qty}
        setQty={setQty}
        qtyInStock={quantity}
        unitPrice={unitPrice}
      />
      <button
        className="btn btn-bgfg-colors"
        style={{ marginTop: "10px" }}
        onClick={onAddCart}
      >
        Add to Cart
      </button>
    </>
  )
}

const PriceCtr = styled.div`
  font-size: 16px;
  font-weight: bolder;
  margin-top: 10px;
`

const OldPrice = styled.span`
  text-decoration: line-through;
  font-size: 12px;
  color: var(--red-dark);
  margin-left: 5px;
  font-style: italic;
`
export default ProductInfo
