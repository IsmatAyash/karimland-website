import React, { useState, useEffect, createContext } from "react"
import { v4 as uuidv4 } from "uuid"
import { graphql, useStaticQuery } from "gatsby"
import { useMutation } from "@apollo/client"
import { ADD_ORDER } from "../graphql/mutations"

const ProductContext = createContext()

const getData = graphql`
  {
    prods: allMongodbKarimlandProducts(filter: { featured: { eq: true } }) {
      nodes {
        id
        title
        tags
        image
        inventory
        price
        oldPrice
        unit
        description {
          title
          detail
        }
        category
      }
    }
    images: allS3Object {
      nodes {
        id
        localFile {
          base
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
          }
        }
      }
    }
  }
`

const ProductProvider = ({ children }) => {
  const prodData = useStaticQuery(getData)
  const [featured, setFeatured] = useState([])
  const [prodImages, setProdImages] = useState([])
  const [addNewOrder] = useMutation(ADD_ORDER)

  useEffect(() => {
    const fetchProducts = async () => {
      const { nodes: items } = prodData.prods
      const { nodes: images } = prodData.images

      try {
        // get gatsby images and append to products array
        if (images.length && items.length) {
          setProdImages(
            images
              .filter(i => i.localFile)
              .map(node => ({
                name: node.localFile.base,
                image: node.localFile.childImageSharp.gatsbyImageData,
              }))
          )
          setFeatured(
            items.map(prod => {
              const idx = prod.image.split("/").pop()
              const obj = images.find(i => i.localFile?.base === idx)
              return {
                ...prod,
                image: obj.localFile.childImageSharp.gatsbyImageData || null,
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

  const checkout = async ({ details }) => {
    console.log("ORDERDETAILS TO WRITE in checkout ctx", details)
    try {
      // await API.graphql(graphqlOperation(processOrder, { input: payload }))
      await addNewOrder({ variables: { newOrder: details } })
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
