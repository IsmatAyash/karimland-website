import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import slugify from "slugify"

const ProductList = ({ products = [] }) => {
  return (
    <div className="products-list">
      {products.map(product => {
        const { id, image, title, subtitle } = product
        const slug = slugify(title, { lower: true })
        const pathToImage = getImage(image.gatsbyImageData)
        return (
          <Link key={id} to={`/${slug}`} className="product">
            <GatsbyImage
              image={pathToImage}
              alt={title}
              className="product-img"
            />
            <h5>{title}</h5>
            <p>{subtitle}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductList
