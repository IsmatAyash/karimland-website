import React, { useState, useEffect } from "react"
import { API, graphqlOperation } from "aws-amplify"
import { getProduct } from "../api/queries"

import Layout from "../components/Layout"
import ProductInfo from "../components/ProductInfo"
import SEO from "../components/SEO"
import Tabs from "../components/Tabs"

const ProductTemplate = ({ pageContext }) => {
  const [qty, setQty] = useState(0)
  const [unitPrice, setUnitPrice] = useState(0)
  const [prod, setProd] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProds = async () => {
      // setLoading(true)
      try {
        const { data } = await API.graphql(
          graphqlOperation(getProduct, {
            id: pageContext.id,
            authMode: "API_KEY",
          })
        )
        setProd(data)
        setLoading(false)
      } catch (error) {
        console.log("Error while reading products in product template", error)
        setLoading(false)
      }
    }
    fetchProds()
  }, [loading, pageContext.id])

  const { title, description, image, prices } = prod.getProduct || {}
  if (!unitPrice && prod.getProduct) {
    setUnitPrice(JSON.parse(prices[0]).price)
  }

  return (
    <Layout>
      {!loading && (
        <>
          <SEO title={title} description={JSON.parse(description[0]).detail} />
          <main className="page">
            <div className="product-page">
              <section className="product-hero">
                <img
                  src={image}
                  alt={title}
                  width="100%"
                  style={{ borderRadius: "10px" }}
                />
                <article className="product-info">
                  <ProductInfo
                    prod={prod.getProduct}
                    setUnitPrice={setUnitPrice}
                    unitPrice={unitPrice}
                    qty={qty}
                    setQty={setQty}
                  />
                </article>
              </section>
              <section>
                <Tabs description={description} />
              </section>
            </div>
          </main>
        </>
      )}
    </Layout>
  )
}

export default ProductTemplate
