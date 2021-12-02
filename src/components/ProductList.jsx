import React from "react"
import { Link } from "gatsby"
import slugify from "slugify"
import styled from "styled-components"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

const ProductList = ({ prods = [] }) => {
  return (
    <div className="products-list">
      {prods.map(prod => {
        const { id, image, title, unit, price, oldPrice, inventory } = prod
        const slug = slugify(title, { lower: true })
        const pathToImage = getImage(image)

        return (
          <Link key={id} to={`/${slug}`} className="product">
            {/* <GatsbyImage
              image={pathToImage}
              alt={title}
              className="product-img"
            /> */}
            <StaticImage
              src="../assets/images/image-placeholder.png"
              alt="image placeholder"
              layout="fullWidth"
              className="product-img"
              placeholder="tracedSVG"
            />
            <h5>{title}</h5>
            {inventory === 0 ? (
              <p>Out of stock</p>
            ) : (
              <PriceCtr>
                KD {price} / {unit}
                {oldPrice && <OldPrice>KD {oldPrice}</OldPrice>}
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
  min-width: 10rem;
`
export default ProductList
