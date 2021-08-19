import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import BlogBody from "../components/BlogBody"
import styled from "styled-components"

const BlogTemplate = ({ data }) => {
  const { title, posted, author, content } = data.contentfulBlog
  return (
    <Layout>
      <main className="page">
        <BlogCtr>
          <h4 style={{ marginBottom: 0 }}>{title}</h4>
          <small style={{ marginBottom: 20 }}>
            posted by {author} on {posted}
          </small>
          <BlogBody content={content} />
          {/* <BlogCtr>{output}</BlogCtr> */}
          {/* <div>{renderRichText(content)}</div> */}
        </BlogCtr>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query GetBlog($id: String!) {
    contentfulBlog(id: { eq: $id }) {
      id
      title
      slug
      author
      posted(formatString: "MMM D, YYYY hh:mm A")
      content {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            title
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: TRACED_SVG
              width: 350
              quality: 100
              cornerRadius: 10
            )
          }
        }
      }
    }
  }
`

const BlogCtr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

export default BlogTemplate
