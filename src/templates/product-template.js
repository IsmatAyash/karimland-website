import React, { useState, useEffect } from "react"
import { API, graphqlOperation } from "aws-amplify"
import { getProduct } from "../graphql/queries"

import Layout from "../components/Layout"
import ImageCarousel from "../components/ImageCarousel"
import ProductInfo from "../components/ProductInfo"
import Seo from "../components/Seo"
import ProductDetails from "../components/ProductDetails"

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
          graphqlOperation(getProduct, { id: pageContext.id })
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

  const { title, description, images, prices } = prod.getProduct || {}
  if (!unitPrice && prod.getProduct) {
    setUnitPrice(JSON.parse(prices[0]).price)
  }

  return (
    <Layout>
      {!loading && (
        <>
          <Seo title={title} description={JSON.parse(description[0]).detail} />
          <main className="page">
            <div className="product-page">
              <section className="product-hero">
                <ImageCarousel images={images} title={title} />
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
                <ProductDetails description={description} />
              </section>
            </div>
          </main>
        </>
      )}
    </Layout>
  )
}

export default ProductTemplate
