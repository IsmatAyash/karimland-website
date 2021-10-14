import React, { useState, useEffect, useContext } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

import SEO from "../components/SEO"
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
import TagsList from "../components/TagsList"
import { ProductContext } from "../context/products"

// get vegetables data using graphql here

const Vegetables = ({ data }) => {
  const { prodImages } = useContext(ProductContext)
  const [veges, setVeges] = useState([])

  const { items } = data.product.listProducts

  useEffect(() => {
    if (prodImages && items) {
      const prods = items.map(prod => {
        const idx = prod.image.split("/").pop()
        return {
          ...prod,
          image: prodImages.find(i => i.name === idx).image,
        }
      })
      setVeges(prods || [])
    }
  }, [prodImages, items])

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
          <TagsList products={veges} />
          {veges.length === 0 && <h3>No vegetables products available</h3>}
          <ProductList prods={veges} />
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    product {
      listProducts(filter: { prodType: { eq: "Veges" } }) {
        items {
          title
          id
          description
          avgRating
          image
          ratings
          quantity
          prices
          tags
          oldPrice
        }
      }
    }
  }
`

export default Vegetables
