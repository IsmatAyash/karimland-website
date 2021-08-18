import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import SEO from "../components/SEO"

const Home = ({ data }) => {
  const { body, images } = data.contentfulPages

  return (
    <Layout>
      <SEO title="Home " />
      <main className="page">
        <header className="hero">
          <StaticImage
            src="../assets//images/organicfarm.jpg"
            alt="organic farm"
            className="hero-img"
            placeholder="tracedSVG"
            layout="fullWidth"
          />
          <div className="hero-container">
            <div className="hero-text">
              <h2>Karimland Organic Farm</h2>
              <h4>Farm to Table</h4>
            </div>
          </div>
        </header>
        <section>
          <div style={{ width: "100%" }}>{renderRichText(body)}</div>
          {images.map((image, idx) => (
            <GatsbyImage
              image={getImage(image)}
              alt={image.title}
              className="product-img"
              key={image.id}
              style={{ margin: 10 }}
            />
          ))}
          <p>{images[2].description}</p>
        </section>
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulPages(pagecode: { eq: "home" }) {
      body {
        raw
      }
      images {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: TRACED_SVG
          width: 300
          height: 200
        )
        title
        description
        id
      }
      title
    }
  }
`

export default Home
