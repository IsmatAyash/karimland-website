import React, { useState, useEffect, createContext } from "react"
import { API, graphqlOperation } from "aws-amplify"
import { v4 as uuidv4 } from "uuid"
import { listProducts } from "../api/queries"
import { processOrder } from "../api/mutations"
import { graphql, useStaticQuery } from "gatsby"

const ProductContext = createContext()

const getProdImages = graphql`
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
  }
`

const ProductProvider = ({ children }) => {
  const images = useStaticQuery(getProdImages)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [images])

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
    try {
      setLoading(true)
      // Switch authMode to API_KEY for public access
      const { data } = await API.graphql({
        query: listProducts,
        authMode: "API_KEY",
      })
      const products = data.listProducts.items

      // get gatsby images and append to products array
      if (images) {
        const { nodes } = images.allS3Object
        setProducts(
          products.map(prod => {
            const idx = prod.image.split("/").pop()
            return {
              ...prod,
              image: nodes.find(i => i.localFile.base === idx).localFile
                .childImageSharp.gatsbyImageData,
            }
          })
        )
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ProductContext.Provider value={{ products, loading, checkout }}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductProvider, ProductContext }
