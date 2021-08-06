import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
import SEO from "../components/SEO"

const TagTemplate = ({ data, pageContext }) => {
  const products = data.allContentfulProduct.nodes
  return (
    <Layout>
      <SEO title={pageContext.tag} />
      <main className="page">
        <h2>{pageContext.tag}</h2>
        <div className="tag-products">
          <ProductList products={products} />
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query getTags($tag: String) {
    allContentfulProduct(
      filter: { content: { tags: { eq: $tag } } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        title
        subtitle
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
        id
      }
    }
  }
`

export default TagTemplate
