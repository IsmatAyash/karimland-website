import React from "react"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import AllVeges from "../components/AllVeges"
import Seo from "../components/Seo"

const Vegetables = () => {
  return (
    <Layout>
      <main className="page">
        <Seo title="Vegetables" />
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
        <AllVeges />
      </main>
    </Layout>
  )
}

export default Vegetables
