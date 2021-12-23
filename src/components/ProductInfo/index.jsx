import React, { useState, useContext } from "react"
import styled from "styled-components"

import { CartContext } from "../../context/carts"
import { UserContext } from "../../context/users"
import WeightSelector from "./WeightSelector"
import QuantitySelector from "./QuantitySelector"
import RatingStars from "../Reviews/RatingStars"
import Cart from "./Cart"
import { navigate } from "gatsby"

const ProductInfo = ({ prod, qty, setQty }) => {
  const [showCart, setShowCart] = useState(false)
  const {
    id,
    title,
    image,
    avgRating,
    ratings,
    inventory,
    unit,
    price,
    oldPrice,
    seller,
  } = prod
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(UserContext)

  const onAddCart = () => {
    if (!user) navigate("/signin")
    else {
      addToCart({ product: id, quantity: qty })
      setShowCart(true)
    }
  }

  return (
    <>
      {showCart && <Cart closeCart={setShowCart} />}
      <h2>{title}</h2>
      <RatingStars avgRating={avgRating} ratings={ratings} />
      <div>Seller: {seller.name}</div>
      <div>Availability: {inventory !== 0 ? "In Stock" : "Out of stock"}</div>
      <PriceCtr>
        <div>Unit: {unit}</div>
        Unit Price: KD {price} <OldPrice>KD {oldPrice}</OldPrice>
      </PriceCtr>
      {/* <WeightSelector unit={unit} price={price} setUnitPrice={setUnitPrice} /> */}
      <QuantitySelector
        qty={qty}
        setQty={setQty}
        qtyInStock={inventory}
        unitPrice={price}
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
  margin-bottom: 10px;
`

const OldPrice = styled.span`
  text-decoration: line-through;
  font-size: 12px;
  color: var(--red-dark);
  margin-left: 5px;
  font-style: italic;
`
export default ProductInfo
