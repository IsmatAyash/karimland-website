import React, { useState, useContext } from "react"
import { useQuery } from "@apollo/client"

import { GET_PRODUCT } from "../graphql/queries"
import Layout from "../components/Layout"
import ProductInfo from "../components/ProductInfo"
import SEO from "../components/SEO"
import Tabs from "../components/ProductInfo/Tabs"
import { ProductContext } from "../context/products"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProductTemplate = ({ pageContext }) => {
  const { prodImages } = useContext(ProductContext)
  const [qty, setQty] = useState(0)
  const [prod, setProd] = useState(null)
  const [gImage, setGimage] = useState({})

  const { loading } = useQuery(GET_PRODUCT, {
    variables: { id: pageContext.id },
    onCompleted: data => {
      setProd(data.getProduct)
      const idx = data.getProduct.image.split("/").pop()
      const gatsbyImage = prodImages.find(i => i.name === idx).image
      setGimage(getImage(gatsbyImage))
    },
    onError: error => console.log("Error", error),
  })

  if (loading) return <p>Loading...</p>

  return (
    <Layout>
      {prod && (
        <>
          <SEO title={prod.title} description={prod.description[0].detail} />
          <main className="page">
            <div className="product-page">
              <section className="product-hero">
                <GatsbyImage
                  image={gImage}
                  alt={prod.title}
                  width="100%"
                  style={{ borderRadius: "10px" }}
                />
                <article>
                  <ProductInfo prod={prod} qty={qty} setQty={setQty} />
                </article>
              </section>
              <section>
                <Tabs description={prod.description} />{" "}
              </section>
            </div>
          </main>
        </>
      )}
    </Layout>
  )
}

export default ProductTemplate
