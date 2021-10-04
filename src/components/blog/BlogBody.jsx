import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { Bold, Text, Italic, Underline, UList, OList } from "./Markdown"

const BlogBody = ({ content }) => {
  console.log("content in blogbody", content)
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      [MARKS.ITALIC]: text => <Italic>{text}</Italic>,
      [MARKS.UNDERLINE]: text => <Underline>{text}</Underline>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.UL_LIST]: (node, children) => <UList>{children}</UList>,
      [BLOCKS.OL_LIST]: (node, children) => <OList>{children}</OList>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        console.log("Assets node BlogBody", node)
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
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        if (node.data.target)
          return (
            <Link to={`/${node.data.target.slug}`}>
              {node.data.target.title}
            </Link>
          )
      },
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        console.log("inline entry node", node)
        if (node.data.target)
          return (
            <Link to={`/${node.data.target.slug}`}>
              {node.data.target.title}
            </Link>
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
