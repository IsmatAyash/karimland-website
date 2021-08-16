import React, { useState, useEffect } from "react"
import ProductList from "./ProductList"
import TagsList from "./TagsList"
import { API, graphqlOperation } from "aws-amplify"
import { listProducts } from "../graphql/queries"

const AllVeges = () => {
  const [vegs, setVegs] = useState([])

  useEffect(() => {
    fetchProds()
  }, [])

  // const todoDetails = {
  //   name: 'Todo 1',
  //   description: 'Learn AWS AppSync'
  // };

  // const newTodo = await API.graphql({ query: mutations.createTodo, variables: {input: todoDetails}});

  const fetchProds = async () => {
    const filter = { prodType: { eq: "veges" } }
    try {
      const { data } = await API.graphql(
        graphqlOperation(listProducts, { filter: filter })
      )
      setVegs(data.listProducts.items)
    } catch (error) {
      console.log("Error while reading data", error)
    }
  }

  return (
    <section className="products-container">
      <TagsList products={vegs} />
      {vegs && <ProductList prods={vegs} />}
    </section>
  )
}

export default AllVeges
