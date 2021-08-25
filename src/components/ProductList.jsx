import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"

const ProductList = ({ prods = [] }) => {
  return (
    <div className="products-list">
      {prods.map(prod => {
        const { id, image, title, prices, oldPrice, quantity } = prod
        const slug = slugify(title, { lower: true })

        return (
          <Link key={id} to={`/${slug}`} className="product">
            <img src={image} alt={title} className="product-img" />
            <h5>{title}</h5>
            {quantity === 0 ? (
              <p>Out of stock</p>
            ) : (
              <PriceCtr>
                From: KD {JSON.parse(prices[0]).price}
                <OldPrice>KD {oldPrice}</OldPrice>
              </PriceCtr>
            )}
          </Link>
        )
      })}
    </div>
  )
}

const OldPrice = styled.span`
  text-decoration: line-through;
  font-size: 12px;
  color: var(--red-dark);
  margin-left: 5px;
  font-style: italic;
  margin-left: 10px;
`

const PriceCtr = styled.div`
  color: var(--grey-800);
  font-size: 12px;
  font-weight: bolder;
`
export default ProductList
