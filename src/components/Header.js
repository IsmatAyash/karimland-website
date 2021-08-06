import React from "react"
import { FaShoppingCart, FaLanguage } from "react-icons/fa"

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        background: "var(--grey-1000)",
        height: "4rem",
        color: "var(--white)",
      }}
    >
      <button
        style={{ marginRight: 20, display: "flex", alignItems: "center" }}
      >
        آلعربيه
        <FaLanguage
          style={{
            width: "30px",
            height: "30px",
            marginRight: 10,
            marginLeft: 10,
          }}
        />
      </button>
      <FaShoppingCart
        style={{ width: "30px", height: "30px", marginRight: 20 }}
      />
      <button style={{ marginRight: 20, marginLeft: 20 }}>Sign In</button>
    </div>
  )
}

export default Header
