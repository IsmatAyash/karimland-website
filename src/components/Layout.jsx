import React from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

import "normalize.css"
import "../assets/css/main.css"
import Header from "./Header"
import { ProductProvider } from "../context/products"

// import Amplify from "aws-amplify"
// import awsconfig from "../aws-exports"
// Amplify.configure(awsconfig)

const Layout = ({ children }) => {
  return (
    <ProductProvider>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </ProductProvider>
  )
}

export default Layout
