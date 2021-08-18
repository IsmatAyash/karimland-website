import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

const query = graphql`
  {
    site {
      siteMetadata {
        description
        title
        slogan
        author
      }
    }
  }
`

const SEO = ({ title, description }) => {
  const { site } = useStaticQuery(query)
  const metaDescription = description || site.siteMetadata.description
  return (
    <Helmet
      title={`${title} | ${site.siteMetadata.title}`}
      htmlAttributes={{ lang: "en" }}
    >
      <meta name="description" content={metaDescription} />
      <meta name="slogan" content={site.siteMetadata.solgan} />
      <meta name="author" content={site.siteMetadata.author} />
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  solgan: PropTypes.string,
  author: PropTypes.string,
}
