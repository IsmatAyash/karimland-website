import React, { useState, useEffect, useContext } from "react"
import { ProductContext } from "../context/products"
import ProductList from "./ProductList"
import TagsList from "./TagsList"

const AllVeges = () => {
  const { products, loading } = useContext(ProductContext)
  const [vegs, setVegs] = useState([])

  useEffect(() => {
    setVegs(products.filter(p => p.prodType === "Veges"))
  }, [products])

  return (
    <section className="products-container">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <TagsList products={vegs} />
          <ProductList prods={vegs} />
        </>
      )}
    </section>
  )
}

export default AllVeges
