import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
import Seo from "../components/Seo"

const TagTemplate = ({ data, pageContext }) => {
  const products = data.product.listProducts.items
  return (
    <Layout>
      <Seo title={pageContext.tag} />
      <main className="page">
        <h2>{pageContext.tag}</h2>
        <div className="tag-products">
          <ProductList prods={products} />
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query GetTags($tag: String) {
    product {
      listProducts(filter: { tags: { contains: $tag } }) {
        items {
          id
          title
          oldPrice
          prices
          ratings
          images
          quantity
        }
      }
    }
  }
`

export default TagTemplate
