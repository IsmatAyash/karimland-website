import React, { useContext } from "react"
import ProductList from "./ProductList"
import { ProductContext } from "../context/products"

const FeaturedProduct = () => {
  const { products } = useContext(ProductContext)
  return (
    <section className="featured-products">
      <h5>Featured products</h5>
      <ProductList prods={products.filter(p => !!p.featured)} />
    </section>
  )
}

export default FeaturedProduct
