import React, { useState, useContext } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { useQuery } from "@apollo/client"

import SEO from "../components/SEO"
import Layout from "../components/Layout"
import TagsList from "../components/TagsList"
import { GET_PRODUCTS } from "../graphql/queries"
import ProductList from "../components/ProductList"
import { ProductContext } from "../context/products"

const Products = ({ location }) => {
  const { state } = location // passed params from Navbar and MenuLink
  const { prodImages } = useContext(ProductContext)
  const [veges, setVeges] = useState([])
  const [errorMessage, setErrorMessage] = useState(undefined)

  const { loading } = useQuery(GET_PRODUCTS, {
    variables: { cat: state?.sku, page: 1, limit: 10 },
    fetchPolicy: "no-cache",
    onCompleted: prodData => {
      const prods = prodData.products.products.map(prod => {
        const idx = prod.image.split("/").pop()
        return { ...prod, image: prodImages.find(i => i.name === idx).image }
      })
      setVeges(prods)
    },
    onError: error => setErrorMessage(error.message),
  })

  return (
    <Layout>
      <main className="page">
        <SEO title={state?.sku === "Veges" ? "Vegetables" : "Fruits"} />
        <header className="hero">
          {state?.sku === "Veges" ? (
            <StaticImage
              src="../assets/images/tomatos2.jpg"
              alt="Veges and fruits image"
              layout="fullWidth"
              className="hero-img"
              placeholder="tracedSVG"
            />
          ) : (
            <StaticImage
              src="../assets/images/fruits.jpg"
              alt="Veges and fruits image"
              layout="fullWidth"
              className="hero-img"
              placeholder="tracedSVG"
            />
          )}
          <div className="hero-container">
            <div className="hero-text">
              <h2>
                {`Organic ${state?.sku === "Veges" ? "Vegetables" : "Fruits"}`}
              </h2>
              <h4>Farm to Table</h4>
            </div>
          </div>
        </header>
        <section className="products-container">
          {loading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <small>{errorMessage}</small>
          ) : null}
          {veges ? (
            <>
              <TagsList products={veges} />
              <ProductList prods={veges} />
            </>
          ) : (
            <h3>
              {`No ${state.sku === "Veges" ? "Vegetables" : "Fruits"} products
              available.`}
            </h3>
          )}
        </section>
      </main>
    </Layout>
  )
}

export default Products
