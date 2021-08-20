import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import styled from "styled-components"

const Blogs = ({ data }) => {
  const { nodes: blogs } = data.allContentfulBlog
  return (
    <Layout>
      <SEO title="Blogs" />
      <main className="page">
        {blogs.map((blog, idx) => {
          const { title, slug, posted, image, summary, id } = blog
          return (
            <React.Fragment key={`${id}-${idx}`}>
              <BlogCtr>
                <BlogImageCtr>
                  <BlogImage image={getImage(image)} alt={title} />
                </BlogImageCtr>
                <BlogDetail>
                  <h5 style={{ marginBottom: 0 }}>{title}</h5>
                  <small>posetd on {posted}</small>
                  <BlogDescription>{summary}...</BlogDescription>
                  <ReadMoreLink to={`/${slug}`}>Read More...</ReadMoreLink>
                </BlogDetail>
              </BlogCtr>
            </React.Fragment>
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
        title
        posted(formatString: "MMMMM D, YYYY hh:mm A")
        slug
        id
        summary
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
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

const BlogDescription = styled.p`
  margin: 17px 0;

  @media screen and (min-width: 992px) {
    font-size: 1rem;
  }
`

const ReadMoreLink = styled(Link)`
  max-width: 200px;
  text-align: center;
  color: var(--grey-900);
  border: 1px solid var(--grey-800);
  cursor: pointer;
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
