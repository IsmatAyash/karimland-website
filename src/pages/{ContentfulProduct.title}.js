import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BsClock, BsClockHistory, BsPeople } from "react-icons/bs"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import ProductDetails from "../components/ProductDetails"

const ProductTemplate = ({ data }) => {
  const [qtywgt, setQtywgt] = useState(0)
  const [price, setPrice] = useState()
  const {
    title,
    subtitle,
    content,
    description: { description },
    image,
  } = data.contentfulProduct
  const pathToImage = getImage(image)
  const { tags, agriculture, instructions, usage } = content
  return (
    <Layout>
      <SEO title={title} description={description} />
      <main className="page">
        <div className="product-page">
          <section className="product-hero">
            <GatsbyImage
              image={pathToImage}
              alt={title}
              className="about-img"
            />
            <article className="product-info">
              <ProductDetails
                qtywgt={qtywgt}
                setQtywgt={setQtywgt}
                price={price}
                setPrice={setPrice}
              />
              {/* <h2>{title}</h2>
              <p>{description}</p>
              <div className="product-icons">
                <article>
                  <BsClock />
                  <h5>{subtitle}</h5>
                </article>
                <article>
                  <BsClockHistory />
                  <h5>{title}</h5>
                </article>
                <article>
                  <BsPeople />
                  <h5>10</h5>
                </article>
              </div> */}
              <div className="product-tags">
                Tags:{" "}
                {tags.map((tag, idx) => {
                  return (
                    <Link to={`/${tag}`} key={idx}>
                      {tag}
                    </Link>
                  )
                })}
              </div>
            </article>
          </section>
          <section className="product-content">
            <article>
              <h4>Instructions</h4>
              {instructions.map((item, idx) => {
                return (
                  <div key={idx} className="single-instruction">
                    <header>
                      <p>step {idx + 1}</p>
                      <div></div>
                    </header>
                    <p>{item}</p>
                  </div>
                )
              })}
            </article>
            <article className="second-column">
              <div>
                <h4>Agriculture</h4>
                {agriculture.map((item, idx) => {
                  return (
                    <p key={idx} className="single-ingridient">
                      {item}
                    </p>
                  )
                })}
              </div>
              <div>
                <h4>Usage</h4>
                {usage.map((item, idx) => {
                  return (
                    <p key={idx} className="single-tool">
                      {item}
                    </p>
                  )
                })}
              </div>
            </article>
          </section>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query getSingleProduct($title: String) {
    contentfulProduct(title: { eq: $title }) {
      title
      content {
        agriculture
        instructions
        usage
        tags
      }
      image {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
      subtitle
      description {
        description
      }
    }
  }
`

export default ProductTemplate
