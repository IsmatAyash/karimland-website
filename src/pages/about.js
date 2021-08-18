import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import FeaturedProduct from "../components/FeaturedProduct"
import SEO from "../components/SEO"

const About = ({ data }) => {
  const { body, images, title } = data.contentfulPages
  const pathToImage = getImage(images[0])
  return (
    <Layout>
      <SEO title="About " />
      <main className="page">
        <section className="about-page">
          <article>
            <div>{renderRichText(body)}</div>
            <Link to="/contact" className="btn btn-bgfg-colors">
              contact
            </Link>
          </article>
          <GatsbyImage image={pathToImage} alt={title} className="about-img" />
        </section>
        <FeaturedProduct />
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulPages(pagecode: { eq: "about" }) {
      body {
        raw
      }
      images {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
      title
    }
  }
`

export default About
