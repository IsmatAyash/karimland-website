import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProductList from "./ProductList"
import TagsList from "./TagsList"
import { API, graphqlOperation } from "aws-amplify"
import { listProducts } from "../graphql/queries"

// const getData = graphql`
//   {
//     vegs: allContentfulProduct(filter: { pagecode: { glob: "vegs-*" } }) {
//       nodes {
//         id
//         title
//         subtitle
//         image {
//           description
//           gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
//         }
//         content {
//           agriculture
//           instructions
//           usage
//           tags
//         }
//       }
//     }
//   }
// `

const AllVeges = () => {
  const [vegs, setVegs] = useState([])
  // const data = useStaticQuery(getData)
  // const { nodes: veges } = data.vegs

  useEffect(() => {
    fetchProds()
  }, [])

  const fetchProds = async () => {
    try {
      const { data } = await API.graphql(graphqlOperation(listProducts))
      setVegs(data)
    } catch (error) {
      console.log("Error while reading data", error)
    }
  }

  console.log("prods in allveges", vegs)
  return (
    <section className="products-container">
      {/* <TagsList products={veges} />
      <ProductList products={veges} /> */}
      {/* <ProdList /> */}
    </section>
  )
}

export default AllVeges
