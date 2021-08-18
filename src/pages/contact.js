import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import FeaturedProduct from "../components/FeaturedProduct"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import SEO from "../components/SEO"

const Contact = ({ data }) => {
  const { body } = data.contentfulPages
  return (
    <Layout>
      <main className="page">
        <SEO title="contact" />
        <section className="contact-page">
          <article className="contact-info">
            <div>{renderRichText(body)} </div>
          </article>
          <article>
            <form
              className="form contact-form"
              action="https://formspree.io/f/moqykykp"
              method="POST"
            >
              <div className="form-row">
                <label htmlFor="name">Your name</label>
                <input type="text" name="name" id="name"></input>
              </div>
              <div className="form-row">
                <label htmlFor="name">Your email</label>
                <input type="email" name="email" id="email"></input>
              </div>
              <div className="form-row">
                <label htmlFor="message">message</label>
                <textarea name="message" id="message"></textarea>
              </div>
              <button type="submit" className="btn block btn-bgfg-colors">
                Submit
              </button>
            </form>
          </article>
        </section>
        <FeaturedProduct />
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulPages(pagecode: { eq: "contact" }) {
      body {
        raw
      }
    }
  }
`

export default Contact
