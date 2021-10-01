import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const NavItemLink = ({ icon, text, path }) => {
  return (
    <NavListItemLink to={path}>
      {icon && icon}
      {text}
    </NavListItemLink>
  )
}

const NavListItemLink = styled(Link)`
  padding: 0.5rem 0.5rem;
  transition: background-color 200ms ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
  color: var(--grey-100);

  &:hover,
  &:focus {
    background-color: var(--green-light);
  }
`

export default NavItemLink
