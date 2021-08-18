import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import styled from "styled-components"

const Blogs = ({ data }) => {
  const { nodes: blogs } = data.allContentfulBlog
  return (
    <Layout>
      <SEO title="Blogs" />
      <main className="page">
        {blogs.map(blog => {
          const { title, slug, posted, image, content, id } = blog
          return (
            <>
              <BlogCtr key={id}>
                <BlogImageCtr>
                  <BlogImage image={getImage(image)} alt={title} />
                </BlogImageCtr>
                <BlogDetail>
                  <h5 style={{ marginBottom: 0 }}>{title}</h5>
                  <small>posetd on {posted}</small>
                  <BlogDescription>{renderRichText(content)}</BlogDescription>
                  <ReadMoreLink to={`/${slug}`}>Read More...</ReadMoreLink>
                </BlogDetail>
              </BlogCtr>
            </>
          )
        })}
      </main>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulBlog {
      nodes {
        id
        title
        slug
        posted(formatString: "MMMM D, YYYY hh:mm A")
        content {
          raw
        }
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: TRACED_SVG
            resizingBehavior: SCALE
          )
        }
      }
    }
  }
`

const BlogCtr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 50px;

  @media screen and (min-width: 992px) {
    flex-direction: row;
  }
`

const BlogImageCtr = styled.div`
  align-items: flex-start;
  @media screen and (min-width: 992px) {
    flex: 25%;
    height: 210px;
    margin-top: 0;
  }
`

const BlogImage = styled(GatsbyImage)`
  height: 20rem;
  border-radius: 10px;

  @media screen and (min-width: 992px) {
    height: 12rem;
    border-radius: 0;
  }
`

const BlogDetail = styled.div`
  display: flex;
  flex-direction: column;
  flex: 75%;
  padding: 10px 0;

  @media screen and (min-width: 992px) {
    margin: 0 20px;
    padding: 0;
  }
`

const BlogDescription = styled.div`
  margin: 17px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;

  @media screen and (min-width: 992px) {
    font-size: 1rem;
  }
`

const ReadMoreLink = styled(Link)`
  max-width: 200px;
  text-align: center;
  cursor: pointer;
  appearance: none;
  color: var(--grey-900);
  border: 1px solid var(--grey-800);
  border-radius: var(--borderRadius);
  letter-spacing: var(--letterSpacing);
  padding: 0.375rem 0.75rem;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-transform: capitalize;

  :hover {
    color: var(--white);
    background: var(--primary-700);
    box-shadow: var(--shadow-2);
  }

  @media screen and (min-width: 992px) {
    font-size: 0.85rem;
  }
`

export default Blogs
