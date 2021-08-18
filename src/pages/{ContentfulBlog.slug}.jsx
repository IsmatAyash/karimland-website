import React from "react"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Layout from "../components/Layout"

const BlogTemplate = ({ data }) => {
  const { title, posted, author, content } = data.contentfulBlog
  return (
    <Layout>
      <main className="page">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h4 style={{ marginBottom: 0 }}>{title}</h4>
          <small style={{ marginBottom: 20 }}>
            posted by {author} on {posted}
          </small>
          <div>{renderRichText(content)}</div>
        </div>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query GetBlog($id: String) {
    contentfulBlog(id: { eq: $id }) {
      title
      posted(formatString: "MMMM D, YYYY hh:mm A")
      author
      image {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
      content {
        raw
      }
    }
  }
`

export default BlogTemplate
