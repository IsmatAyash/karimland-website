import React, { ReactElement } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"

const Heading1 = ({ children }) => (
  <h1 style={{ fontSize: "30px" }}>{children}</h1>
)
const Bold = ({ children }) => <strong>{children}</strong>
const Text = ({ children }) => <p style={{ fontSize: "16px" }}>{children}</p>
const UList = ({ children }) => (
  <ul style={{ listStyleType: "circle", marginLeft: 30, lineHeight: 0.7 }}>
    {children}
  </ul>
)
const OList = ({ children }) => <ol style={{ lineHeight: 0.9 }}>{children}</ol>
// const Hyperlink = (props): ReactElement => <Link {...props} />

const BlogBody = ({ content }) => {
  console.log(content)
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.UL_LIST]: (node, children) => <UList>{children}</UList>,
      [BLOCKS.OL_LIST]: (node, children) => <OList>{children}</OList>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const pathToImage = getImage(node.data.target.gatsbyImageData)
        if (pathToImage)
          return <BlogImg image={pathToImage} alt={node.data.target.title} />
        else
          return (
            <iframe
              src={node.data.target.file.url}
              height="400"
              width="100%"
              frameBorder="0"
              scrolling="no"
              title={node.data.target.title}
              allow="accelerometer; autoplay;"
              allowFullScreen
            />
          )
      },
    },
  }
  return <BlogCtr>{renderRichText(content, options)}</BlogCtr>
}

const BlogCtr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 95%;
`

const BlogImg = styled(GatsbyImage)`
  object-fit: contain;
  border-radius: 10px;
`

export default BlogBody
