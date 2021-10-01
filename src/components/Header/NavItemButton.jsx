import React from "react"
import styled from "styled-components"

const NavItemButton = ({ icon, text, onClickBtn }) => {
  return (
    <Button small onClick={onClickBtn}>
      {icon && icon}
      {text}
    </Button>
  )
}

const Button = styled.button`
  width: 100%;
  background-color: transparent;
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

  @media screen and (min-width: 992px) {
    background-color: transparent;
  }
`

export default NavItemButton
