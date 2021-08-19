import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

import { Bold, Heading1, Text } from "./Markdown"

const BlogBody = ({ content }) => {
  console.log(content)
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const pathToImage = getImage(node.data.target.gatsbyImageData)
        return <BlogImg image={pathToImage} alt={node.data.target.title} />
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
