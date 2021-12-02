import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"

import SEO from "../components/SEO"
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
import TagsList from "../components/TagsList"
import { GET_PRODUCTS } from "../graphql/queries"
import { useQuery } from "@apollo/client"

const Vegetables = () => {
  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
    variables: { cat: "Veges", page: 1, limit: 5 },
    fetchPolicy: "network-only",
    errorPolicy: "all",
  })
  const [veges, setVeges] = useState([])
  console.log({ error })

  // const { items } = []

  console.log("PRODUCTS DATA", data)
  useEffect(() => {
    setVeges(data?.products.products || [])
  }, [data])
  console.log("VEGES", veges)

  let errorMessage = undefined
  if (error) {
    if (
      error.networkError &&
      typeof window !== "undefined" &&
      !window.navigator.online
    ) {
      errorMessage = "No internet connection, please check your borwser?"
    } else {
      errorMessage = "An error occured."
    }
  }

  // useEffect(() => {
  // if (prodImages && items) {
  //   const prods = items.map(prod => {
  //     const idx = prod.image.split("/").pop()
  //     return {
  //       ...prod,
  //       image: prodImages.find(i => i.name === idx).image,
  //     }
  //   })
  // setVeges(data || [])
  // }
  // }, [data])

  return (
    <Layout>
      <main className="page">
        <SEO title="Vegetables" />
        <header className="hero">
          <StaticImage
            src="../assets/images/tomatos2.jpg"
            alt="vegetable page tomatos image"
            layout="fullWidth"
            className="hero-img"
            placeholder="tracedSVG"
          />
          <div className="hero-container">
            <div className="hero-text">
              <h2>Organic Vegetables</h2>
              <h4>Farm to Table</h4>
            </div>
          </div>
        </header>
        <section className="products-container">
          {loading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <h3>{errorMessage}</h3>
          ) : null}
          {data ? (
            <>
              <TagsList products={veges} />
              <ProductList prods={veges} />
            </>
          ) : (
            <h3>No Vegtable products available.</h3>
          )}
        </section>
      </main>
    </Layout>
  )
}

export default Vegetables
