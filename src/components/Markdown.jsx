import React from "react"

export const Bold = ({ children }) => <strong>{children}</strong>

export const Text = ({ children }) => (
  <p style={{ fontSize: "16px" }}>{children}</p>
)

export const Heading1 = ({ children }) => (
  <h1 style={{ fontSize: "30px" }}>{children}</h1>
)
