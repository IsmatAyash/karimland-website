import React, { useState, useEffect, createContext } from "react"
import { v4 as uuidv4 } from "uuid"
import { processOrder } from "../api/mutations"
import { graphql, useStaticQuery } from "gatsby"

const ProductContext = createContext()

// images: allS3Object {
//   nodes {
//     localFile {
//       base
//       childImageSharp {
//         gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
//       }
//     }
//   }
// }

// const getData = graphql`
//   {
//     product {
//       prods: listProducts(filter: { featured: { eq: true } }) {
//         items {
//           title
//           id
//           description
//           avgRating
//           image
//           ratings
//           quantity
//           prices
//           tags
//           oldPrice
//         }
//       }
//     }
//   }
// `
const prodData = []

const ProductProvider = ({ children }) => {
  // const prodData = useStaticQuery(getData)
  const [featured, setFeatured] = useState([])
  const [prodImages, setProdImages] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { items } = prodData.product.prods
      const { nodes } = prodData.images

      try {
        // get gatsby images and append to products array
        if (nodes) {
          setProdImages(
            nodes.map(node => ({
              name: node.localFile.base,
              image: node.localFile.childImageSharp.gatsbyImageData,
            }))
          )
          setFeatured(
            items.map(prod => {
              const idx = prod.image.split("/").pop()
              return {
                ...prod,
                image: prodImages.find(i => i.name === idx).image || null,
              }
            })
          )
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchProducts()
  }, [prodData])

  const checkout = async orderDetails => {
    const payload = {
      id: uuidv4(),
      ...orderDetails,
    }
    try {
      // await API.graphql(graphqlOperation(processOrder, { input: payload }))
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

  return (
    <ProductContext.Provider value={{ prodImages, featured, checkout }}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductProvider, ProductContext }
