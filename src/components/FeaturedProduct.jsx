import React, { useContext } from "react"
import ProductList from "./ProductList"
import { ProductContext } from "../context/products"

const FeaturedProduct = () => {
  const { featured } = useContext(ProductContext)
  console.log("featured", featured)
  return (
    <section className="featured-products">
      <h5>Featured products</h5>
      <ProductList prods={featured} />
    </section>
  )
}

export default FeaturedProduct
