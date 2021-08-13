import React from "react"

// aws config auth
// import Amplify from "aws-amplify"
// import awsconfig from "../aws-exports"

// import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import Layout from "../components/Layout"

// Amplify.configure(awsconfig)

const ShoppingCart = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h1>Shopping cart</h1>
      </div>
    </Layout>
  )
}

export default ShoppingCart
