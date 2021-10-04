import React from "react"

export const Heading1 = ({ children }) => (
  <h1 style={{ fontSize: "30px" }}>{children}</h1>
)
export const Bold = ({ children }) => <strong>{children}</strong>
export const Italic = ({ children }) => <span>{children}</span>
export const Underline = ({ children }) => (
  <span
    style={{
      textUnderlineOffset: "0.5rem",
      textDecorationThickness: "2rem",
      textDecoration: "underline",
    }}
  >
    {children}
  </span>
)
export const Text = ({ children }) => (
  <p style={{ fontSize: "16px" }}>{children}</p>
)
export const UList = ({ children }) => (
  <ul style={{ listStyleType: "circle", marginLeft: 30, lineHeight: 0.7 }}>
    {children}
  </ul>
)
export const OList = ({ children }) => (
  <ol style={{ lineHeight: 1.5 }}>{children}</ol>
)

export const BQoute = ({ children }) => <blockquote>{children}</blockquote>
