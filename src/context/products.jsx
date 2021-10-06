import React, { useState, useEffect, createContext } from "react"
import { API, graphqlOperation } from "aws-amplify"
import { v4 as uuidv4 } from "uuid"
import { processOrder } from "../api/mutations"
import { graphql, useStaticQuery } from "gatsby"

const ProductContext = createContext()

const getData = graphql`
  {
    allS3Object {
      nodes {
        localFile {
          ext
          base
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
          }
        }
      }
    }
    product {
      listProducts(filter: { featured: { eq: true } }) {
        items {
          title
          id
          description
          avgRating
          image
          ratings
          quantity
          prices
          tags
          oldPrice
        }
      }
    }
  }
`

const ProductProvider = ({ children }) => {
  const prodData = useStaticQuery(getData)
  const [featured, setFeatured] = useState([])
  const [prodImages, setProdImages] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [prodData])

  const checkout = async orderDetails => {
    const payload = {
      id: uuidv4(),
      ...orderDetails,
    }
    try {
      await API.graphql(graphqlOperation(processOrder, { input: payload }))
      console.log("Order is successful")
      return {
        statusCode: "SUCCESS",
        msg: "Payment processed and order created successfully",
      }
    } catch (err) {
      console.log(err)
      return {
        statusCode: "ERROR",
        msg: `something went wrong please check your card info and retry`,
      }
    }
  }

  const fetchProducts = async () => {
    const { items } = prodData.product.listProducts
    const { nodes } = prodData.allS3Object || null
    try {
      // Switch authMode to API_KEY for public access
      // const { data } = await API.graphql({
      //   query: listProducts,
      //   authMode: "API_KEY",
      // })

      // get gatsby images and append to products array
      if (nodes) {
        setProdImages(nodes)
        setFeatured(
          items.map(prod => {
            const idx = prod.image.split("/").pop()
            return {
              ...prod,
              image: nodes.find(i => i.localFile.base === idx).localFile
                .childImageSharp.gatsbyImageData,
            }
          })
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ProductContext.Provider value={{ prodImages, featured, checkout }}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductProvider, ProductContext }
