import React from "react"
import { Link } from "gatsby"
import setupTags from "../utils/setupTags"
import slugify from "slugify"

const TagsList = ({ products = [] }) => {
  const newTags = setupTags(products)
  if (!newTags.length) return null
  return (
    <div className="tag-container">
      <h4>Tags</h4>
      <div className="tags-list">
        {newTags.map((tag, idx) => {
          const [text, value] = tag
          const slug = slugify(text, { lower: true })
          return (
            <Link to={`/${slug}`} key={idx}>
              {text} ({value})
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TagsList
