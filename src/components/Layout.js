import React from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

import "normalize.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/css/main.css"
import Header from "./Header"

import Amplify from "aws-amplify"
import awsconfig from "../aws-exports"
Amplify.configure(awsconfig)

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
