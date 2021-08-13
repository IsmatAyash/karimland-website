import React from "react"
import { getProd } from "../assets/data/fakeProdService"
import styled from "styled-components"
import QuantitySelector from "./QuantitySelector"
import WeightSelector from "./WeightSelector"
import { stars } from "../utils/reviewStars"

const ProductDetails = ({ setQtywgt, qtywgt, setPrice, price }) => {
  const prod = getProd("4")
  const { avgRating, title, ratings, quantity, prices, oldPrice } = prod
  if (!price) setPrice(prices[0].price)

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
      <div>Availability: In Stock</div>
      <PriceCtr>
        Unit Price: KD {price} <OldPrice>KD {oldPrice}</OldPrice>
      </PriceCtr>
      <WeightSelector prices={prices} setPrice={setPrice} />
      <QuantitySelector
        qtywgt={qtywgt}
        setQtywgt={setQtywgt}
        qtyInStock={quantity}
      />
      <PriceCtr>Price: KD {(qtywgt * price).toFixed(2)}</PriceCtr>
      <Button>Add to Cart</Button>
    </>
  )
}

const ReviewStars = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

const PriceCtr = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin-top: 20px;
`

const Button = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  color: var(--white);
  background: var(--primary-500);
`

const OldPrice = styled.span`
  text-decoration: line-through;
  font-size: 12px;
  color: var(--red-dark);
  margin-left: 5px;
  font-style: italic;
`

export default ProductDetails
