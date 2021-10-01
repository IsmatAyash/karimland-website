import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/Layout"
import Products from "../components/Products"
import Orders from "../components/Orders"
import Profile from "../components/Profile"
import PrivateRoute from "../components/common/PrivateRoute"

const Logged = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path="/logged/products" component={Products} />
        <PrivateRoute path="/logged/profile" component={Profile} />
        <PrivateRoute path="/logged/orders" component={Orders} />
      </Router>
    </Layout>
  )
}

export default Logged
