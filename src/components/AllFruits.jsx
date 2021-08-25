import React, { useState, useEffect, useContext } from "react"
import { ProductContext } from "../context/products"

import ProductList from "./ProductList"
import TagsList from "./TagsList"

const AllFruits = () => {
  const { products, loading } = useContext(ProductContext)
  const [fruits, setFruits] = useState([])

  useEffect(() => {
    setFruits(products.filter(p => p.prodType === "Fruit"))
  }, [products])

  return (
    <section className="products-container">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <TagsList products={fruits} />
          <ProductList prods={fruits} />
        </>
      )}
    </section>
  )
}

export default AllFruits
