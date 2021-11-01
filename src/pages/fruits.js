import React, { useState, useEffect, useContext } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ProductList from "../components/ProductList"
import TagsList from "../components/TagsList"
import { ProductContext } from "../context/products"

const Fruits = () => {
  const { prodImages } = useContext(ProductContext)
  const [fruits, setFruits] = useState([])

  const { items } = []

  useEffect(() => {
    if (prodImages && items) {
      const prods = items.map(prod => {
        const idx = prod.image.split("/").pop()
        return {
          ...prod,
          image: prodImages.find(i => i.name === idx).image,
        }
      })
      setFruits(prods || [])
    }
  }, [prodImages, items])

  return (
    <Layout>
      <main className="page">
        <SEO title="Fruits" />
        <header className="hero">
          <StaticImage
            src="../assets/images/fruits.jpg"
            alt="fruits image"
            placeholder="tracedSVG"
            layout="fullWidth"
            className="hero-img"
          />
          <div className="hero-container">
            <div className="hero-text">
              <h2>Organic fruits</h2>
              <h4>Farm to Table</h4>
            </div>
          </div>
        </header>
        <section className="products-container">
          <TagsList products={fruits} />
          {fruits.length === 0 && <h3>No fruits products available</h3>}
          <ProductList prods={fruits} />
        </section>
      </main>
    </Layout>
  )
}

// export const query = graphql`
//   {
//     product {
//       listProducts(filter: { prodType: { eq: "Fruit" } }) {
//         items {
//           title
//           id
//           description
//           avgRating
//           image
//           ratings
//           quantity
//           prices
//           tags
//           oldPrice
//         }
//       }
//     }
//   }
// `

export default Fruits
