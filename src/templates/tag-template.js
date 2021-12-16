import React from "react"
// import { graphql } from "gatsby"
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
import SEO from "../components/SEO"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS_TAG } from "../graphql/queries"

const TagTemplate = ({ pageContext }) => {
  const { data } = useQuery(GET_PRODUCTS_TAG, {
    variables: { tag: pageContext.tag },
  })
  const products = data.productsTag || []
  return (
    <Layout>
      <SEO title={pageContext.tag} />
      <main className="page">
        <h2>{pageContext.tag}</h2>
        <div className="tag-products">
          <ProductList prods={products} />
        </div>
      </main>
    </Layout>
  )
}

// export const query = graphql`
//   query GetTags($tag: String) {
//     product {
//       listProducts(filter: { tags: { contains: $tag } }) {
//         items {
//           id
//           title
//           oldPrice
//           prices
//           ratings
//           image
//           quantity
//         }
//       }
//     }
//   }
// `

export default TagTemplate
