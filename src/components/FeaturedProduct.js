import React from "react"
import ProductList from "./ProductList"
import { useStaticQuery, graphql } from "gatsby"

const getData = graphql`
  {
    product {
      listProducts(filter: { featured: { eq: true } }) {
        items {
          id
          title
          images
          prices
          oldPrice
          avgRating
          quantity
        }
      }
    }
  }
`

const FeaturedProduct = () => {
  const data = useStaticQuery(getData)
  const { items: featured } = data.product.listProducts

  return (
    <section className="featured-products">
      <h5>Featured products</h5>
      <ProductList prods={featured} />
    </section>
  )
}

export default FeaturedProduct
