import React, { useState, useContext } from "react"
// import { graphql } from "gatsby"
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
import SEO from "../components/SEO"
import { useQuery } from "@apollo/client"
import { GET_PRODUCTS_TAG } from "../graphql/queries"
import { ProductContext } from "../context/products"

const TagTemplate = ({ pageContext }) => {
  const { prodImages } = useContext(ProductContext)
  const [prods, setProds] = useState([])

  const { loading } = useQuery(GET_PRODUCTS_TAG, {
    variables: { tag: pageContext.tag },
    onCompleted: data => {
      const prods = data.productsTag.map(prod => {
        const idx = prod.image.split("/").pop()
        return { ...prod, image: prodImages.find(i => i.name === idx).image }
      })
      setProds(prods)
    },
  })

  return (
    <Layout>
      <SEO title={pageContext.tag} />
      <main className="page">
        <h2>{pageContext.tag}</h2>
        <div className="tag-products">
          {loading ? <div>Loading...</div> : <ProductList prods={prods} />}
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
