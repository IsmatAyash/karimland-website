import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProductList from "./ProductList"
import TagsList from "./TagsList"

const getData = graphql`
  {
    product {
      listProducts(filter: { prodType: { eq: "fruit" } }) {
        items {
          id
          title
          quantity
          images
          prices
          oldPrice
          orders
          ratings
          avgRating
          description
          tags
        }
      }
    }
  }
`

const AllFruits = () => {
  const data = useStaticQuery(getData)
  const { items: fruits } = data.product.listProducts

  return (
    <section className="products-container">
      <TagsList products={fruits} />
      <ProductList prods={fruits} />
    </section>
  )
}

export default AllFruits
