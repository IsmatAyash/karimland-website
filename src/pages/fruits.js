import React from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import AllFruits from "../components/AllFruits"
import SEO from "../components/SEO"

const Fruits = () => {
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
        <AllFruits />
      </main>
    </Layout>
  )
}

export default Fruits
