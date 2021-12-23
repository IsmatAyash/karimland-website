import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { IconContext } from "react-icons"

const MenuLink = ({ icon, sku, name, path, onShow }) => {
  return (
    <IconContext.Provider value={{ color: "var(--grey-1000)" }}>
      <NavbtnLink
        to={name === "home" ? "/" : `${path}`}
        state={{ sku: sku }}
        onClick={onShow}
        activeStyle={{ color: "var(--primary-700)" }}
      >
        {icon}
        {name}
      </NavbtnLink>
    </IconContext.Provider>
  )
}

const NavbtnLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  max-height: 50px;
  font-size: 1.1rem;
  text-transform: capitalize;
  color: var(--grey-1000);
  transition: 0.3s ease-in-out all;
  border-radius: var(--borderRadius);
  min-width: 150px;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: var(--green-light);
  }

  @media screen and (min-width: 992px) {
    justify-content: center;
    font-size: 1rem;
    min-width: 100px;
  }
`

export default MenuLink
