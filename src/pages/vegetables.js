import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { useQuery } from "@apollo/client"

import SEO from "../components/SEO"
import Layout from "../components/Layout"
import TagsList from "../components/TagsList"
import { GET_PRODUCTS } from "../graphql/queries"
import ProductList from "../components/ProductList"

const Vegetables = ({ data }) => {
  const { nodes: images } = data.allS3Object
  const [veges, setVeges] = useState([])
  const [errorMessage, setErrorMessage] = useState(undefined)

  const { loading } = useQuery(GET_PRODUCTS, {
    variables: { cat: "Veges", page: 1, limit: 10 },
    onCompleted: prodData => {
      const prods = prodData.products.products.map(prod => {
        const idx = prod.image.split("/").pop()
        const imageObj = images.find(i => i.localFile?.base === idx)?.localFile
          .childImageSharp
        return { ...prod, image: imageObj }
      })
      setVeges(prods)
    },
    onError: error => setErrorMessage(error.message),
  })

  return (
    <Layout>
      <main className="page">
        <SEO title="Vegetables" />
        <header className="hero">
          <StaticImage
            src="../assets/images/tomatos2.jpg"
            alt="vegetable page tomatos image"
            layout="fullWidth"
            className="hero-img"
            placeholder="tracedSVG"
          />
          <div className="hero-container">
            <div className="hero-text">
              <h2>Organic Vegetables</h2>
              <h4>Farm to Table</h4>
            </div>
          </div>
        </header>
        <section className="products-container">
          {loading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <h3>{errorMessage}</h3>
          ) : null}
          {veges ? (
            <>
              <TagsList products={veges} />
              <ProductList prods={veges} />
            </>
          ) : (
            <h3>No Vegtable products available.</h3>
          )}
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allS3Object {
      nodes {
        localFile {
          base
          childImageSharp {
            gatsbyImageData(placeholder: TRACED_SVG, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`

export default Vegetables
