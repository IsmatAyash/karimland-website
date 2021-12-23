import React, { useState, useEffect, useContext } from "react"
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserCircle,
  FaEdit,
} from "react-icons/fa"
import { MdLanguage, MdArrowDropDown, MdList } from "react-icons/md"
import styled from "styled-components"
import { UserContext } from "../../context/users"
import { CartContext } from "../../context/carts"
import Cart from "../ProductInfo/Cart"
import NavItemLink from "./NavItemLink"
import NavItemButton from "./NavItemButton"
import Badge from "./Badge"
import { navigate } from "gatsby"

const Header = () => {
  const { user, updateUser } = useContext(UserContext)
  const { cart, clearCart, getCart } = useContext(CartContext)
  const [showCart, setShowCart] = useState(false)
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (user) {
      getCart(user.user.id)
      setToken(localStorage.getItem("token"))
    }
  }, [cart])

  const signOut = async () => {
    updateUser(null)
    // clearCart()
    navigate("/")
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <Nav>
      {showCart && <Cart closeCart={setShowCart} />}
      <NavList>
        <NavListItem>
          <MdLanguage />
          Language
          <MdArrowDropDown />
          <NavSubList>
            <NavItemLink path="/" text="English" />
            <NavItemLink path="/" text="Arabic" />
          </NavSubList>
        </NavListItem>
        {user?.user ? (
          <NavListItem>
            <FaUserCircle />
            {user.user?.name}
            <MdArrowDropDown />
            <NavSubList>
              {user.user?.role === "admin" && (
                <NavItemLink
                  path="/logged/products"
                  text="Products"
                  icon={<FaEdit />}
                />
              )}
              <NavItemLink
                path="/logged/profile"
                text="My Profile"
                icon={<FaUserCircle />}
              />
              <NavItemLink
                path="/logged/orders"
                text="My Orders"
                icon={<MdList />}
              />
              <NavItemButton
                text="Sign Out"
                icon={<FaSignOutAlt />}
                onClickBtn={signOut}
              />
            </NavSubList>
          </NavListItem>
        ) : (
          <NavItemLink icon={<FaSignInAlt />} text="Sign In" path="/signin" />
        )}
        <Badge
          icon={<FaShoppingCart className="react-icons" />}
          count={cart?.items.length || 0}
          onShow={() => setShowCart(true)}
          token={token}
        />
      </NavList>
    </Nav>
  )
}

const Nav = styled.div`
  width: 98vw;
  box-shadow: var(--shadow-1);
  background-color: var(--grey-1000);
  color: var(--grey-100);
  min-height: 2.2rem;
`

const NavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  margin: 0;
`

const NavListItem = styled.li`
  position: relative;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  min-width: 10rem;
  height: 100%;

  &:hover,
  &:focus {
    background-color: var(--green-light);
  }
`

const NavSubList = styled.ul`
  position: absolute;
  top: 2.8rem;
  box-shadow: var(--shadow-2);
  width: 100%;
  padding: 0.5rem;
  background-color: var(--grey-1000);
  z-index: 99;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  display: none;
  /* opacity: 0;
  visibility: hidden;
  transition: opacity 200ms ease-in-out; */

  ${NavListItem}:hover & {
    /* opacity: 1;
    visibility: visible; */
    display: block;
  }
`

export default Header
