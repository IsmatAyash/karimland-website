import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import styled from "styled-components"
import RichTextRender from "../components/blog/RichTextRender"

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
          <RichTextRender richText={content} />
        </BlogCtr>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query GetBlogById($id: String!) {
    contentfulBlog(id: { eq: $id }) {
      contentful_id
      title
      author
      posted(formatString: "MMMM D, YYYY hh:mm A", locale: "en-US")
      content {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            title
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
            file {
              contentType
              url
            }
          }
          ... on ContentfulPages {
            __typename
            id
            contentful_id
            slug
            title
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
