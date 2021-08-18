import React from "react"
import { FaShoppingCart, FaLanguage } from "react-icons/fa"
import { Link } from "gatsby"
import styled from "styled-components"

const Header = () => {
  return (
    <HeaderBar>
      <LinkIconWrapper>
        <FaLanguage className="react-icons" />
        <HeaderIconLink to="/">English</HeaderIconLink>
        <HeaderIconLink to="/">Arabic</HeaderIconLink>
      </LinkIconWrapper>
      <VerticalLine>|</VerticalLine>
      <HeaderIconLink to="/">
        <FaShoppingCart className="react-icons" />
        <CartQty>100</CartQty>
      </HeaderIconLink>
      <VerticalLine>|</VerticalLine>
      <SigninLink to="/">Sign In</SigninLink>
    </HeaderBar>
  )
}

const HeaderBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--grey-1000);
  height: 2rem;
`

const LinkIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`

const HeaderIconLink = styled(Link)`
  color: var(--grey-50);
  font-size: 12px;
  margin-right: 10px;
  margin-left: 10px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: var(--green-light);
  }
`

const SigninLink = styled(Link)`
  color: white;
  margin-right: 20px;
  font-size: 12px;

  &:hover {
    transition: all 0.2s ease-in-out;
    color: var(--green-light);
  }
`

const VerticalLine = styled.span`
  color: var(--grey-50);
  margin-left: 15px;
  margin-right: 15px;
`

const CartQty = styled.span`
  font-weight: bold;
  font-size: 14px;
`

export default Header
