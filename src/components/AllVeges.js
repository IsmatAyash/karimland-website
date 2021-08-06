import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProductList from "./ProductList"
import TagsList from "./TagsList"

const getData = graphql`
  {
    vegs: allContentfulProduct(filter: { pagecode: { glob: "vegs-*" } }) {
      nodes {
        id
        title
        subtitle
        image {
          description
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
        content {
          agriculture
          instructions
          usage
          tags
        }
      }
    }
  }
`

const AllVeges = () => {
  const data = useStaticQuery(getData)
  const { nodes: veges } = data.vegs

  return (
    <section className="products-container">
      <TagsList products={veges} />
      <ProductList products={veges} />
    </section>
  )
}

export default AllVeges
