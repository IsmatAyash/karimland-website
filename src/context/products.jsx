import React, { useState, useEffect, createContext } from "react"
import { v4 as uuidv4 } from "uuid"
import { graphql, useStaticQuery } from "gatsby"
import { ApolloError, useMutation } from "@apollo/client"
import { ADD_ORDER, PROCESS_PAYMENT } from "../graphql/mutations"

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
  const [stripePayment] = useMutation(PROCESS_PAYMENT)

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

  const checkout = async ({ details, token, total }) => {
    try {
      const { data, error: err } = await stripePayment({
        variables: { token, total },
      })
      if (err) return "PROCESS PAYMENT ERROR"
      if (data.processPayment) {
        const { data, error } = await addNewOrder({
          variables: { newOrder: details },
        })
        if (error) return "ERROR"
        if (data) return "SUCCESS"
      }
    } catch (err) {
      console.log(err)
      throw new ApolloError(err.message)
    }
  }

  return (
    <ProductContext.Provider value={{ prodImages, featured, checkout }}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductProvider, ProductContext }
