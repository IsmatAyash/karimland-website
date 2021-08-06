import React from "react"
import ProductList from "./ProductList"
import { useStaticQuery, graphql } from "gatsby"

const getData = graphql`
  {
    allContentfulProduct(filter: { featured: { eq: true } }) {
      nodes {
        title
        subtitle
        image {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
        }
        id
      }
    }
  }
`

const FeaturedProduct = () => {
  const data = useStaticQuery(getData)
  const { nodes: featured } = data.allContentfulProduct

  return (
    <section className="featured-products">
      <h5>Featured products</h5>
      <ProductList products={featured} />
    </section>
  )
}

export default FeaturedProduct
