import React from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Bold, Text, UList } from "./Markdown"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Link } from "gatsby"

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.UL_LIST]: (node, children) => <UList>{children}</UList>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      if (node.data.target.file.contentType.substr(0, 5) === "image") {
        const pathToImage = getImage(node.data.target.gatsbyImageData)
        return <BlogImg image={pathToImage} alt={node.data.target.title} />
      } else
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
    [INLINES.EMBEDDED_ENTRY]: node => {
      return (
        <BlogLink to={`/${node.data.target.slug}`}>
          {node.data.target.title}
        </BlogLink>
      )
    },
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      return (
        <>
          <BlogLink to={`/${node.data.target.slug}`}>
            {node.data.target.title}
          </BlogLink>
          {/* <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre> */}
        </>
      )
    },
  },
}

const RichTextRender = ({ richText }) => {
  return <>{richText && renderRichText(richText, options)}</>
}

const BlogImg = styled(GatsbyImage)`
  object-fit: contain;
  border-radius: 10px;
`

const BlogLink = styled(Link)`
  font-family: sans-serif;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
`

export default RichTextRender
