import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProductList from "./ProductList"
import TagsList from "./TagsList"

const getData = graphql`
  {
    fruit: allContentfulProduct(filter: { pagecode: { glob: "fruit-*" } }) {
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

const AllFruits = () => {
  const data = useStaticQuery(getData)
  const { nodes: fruits } = data.fruit

  return (
    <section className="products-container">
      <TagsList products={fruits} />
      <ProductList products={fruits} />
    </section>
  )
}

export default AllFruits
