import React, { useContext } from "react"
import { stars } from "../utils/reviewStars"
import styled from "styled-components"
import WeightSelector from "./WeightSelector"
import QuantitySelector from "./QuantitySelector"
import { CartContext } from "../context/carts"

const ProductInfo = ({ prod, setUnitPrice, unitPrice, qty, setQty }) => {
  const { id, title, image, avgRating, ratings, quantity, prices, oldPrice } =
    prod
  const { addToCart } = useContext(CartContext)

  return (
    <>
      <h2>{title}</h2>
      <ReviewStars>
        {Array(5)
          .fill()
          .map((_, i) => (
            <div key={i}>{stars(i, avgRating)}</div>
          ))}
        {`${ratings} reviews`}
      </ReviewStars>
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
        onClick={() =>
          addToCart({ id, title, image, price: unitPrice, amount: qty })
        }
      >
        Add to Cart
      </button>
    </>
  )
}

const ReviewStars = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

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
