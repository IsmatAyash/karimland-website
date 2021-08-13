import React, { useEffect, useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { API, graphqlOperation } from "aws-amplify"
import { listProducts } from "../graphql/queries"
import slugify from "slugify"

const ProdList = () => {
  const [prods, setProds] = useState([])

  useEffect(() => fetchProds(), [])

  const fetchProds = async () => {
    try {
      const data = await API.graphql(graphqlOperation(listProducts))
      console.log("data as read by API", data)
      setProds(data)
    } catch (error) {
      console.log("Error while querying prods", error)
    }
  }

  console.log("prods in prodList", prods)

  return (
    <div className="products-list">
      <p>Hello from prodList</p>
      {/* {prods.map(prod => {
        const { id, image, title, prices } = item
        const slug = slugify(title, { lower: true })
        return (
          <Link key={id} to={`/${slug}`} className="product">
            <StaticImage
              src={image}
              layout="constrained"
              placeholder="tracedSVG"
              alt={title}
              className="product-img"
            />
            <h5>{title}</h5>
            <p style={{ fontWeight: "bold" }}>KD {prices.items[0].price}</p>
          </Link>
        )
      })} */}
    </div>
  )
}

export default ProdList
