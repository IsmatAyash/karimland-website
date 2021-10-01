import React from "react"
import styled from "styled-components"

const Badge = ({ icon, amount, onShow }) => {
  return (
    <BadgeButton type="button" disabled={amount === 0} onClick={onShow}>
      {icon}
      <BadgeData>
        <CartQty>{amount}</CartQty>
      </BadgeData>
    </BadgeButton>
  )
}

const BadgeButton = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 50%;
  margin-right: 2rem;

  &:hover {
    background-color: transparent;
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
  }
`

const BadgeData = styled.span`
  position: absolute;
  top: -0.35rem;
  right: -0.2rem;
  background-color: red;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CartQty = styled.span`
  font-size: 0.6rem;
  color: var(--white);
  font-weight: bold;
`

export default Badge
