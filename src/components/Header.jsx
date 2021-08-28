import React, { useContext } from "react"
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserCircle,
  FaEdit,
} from "react-icons/fa"
import { MdLanguage, MdArrowDropDown, MdList } from "react-icons/md"
import { Link } from "gatsby"
import styled from "styled-components"
import { UserContext } from "../context/users"
import { CartContext } from "../context/carts"

const Header = () => {
  const { user } = useContext(UserContext)
  const { cart } = useContext(CartContext)

  return (
    <div className="header-bar">
      <ul>
        <li>
          <Link to="/">
            <MdLanguage className="react-icons" />
            Language
            <MdArrowDropDown className="react-icons" />{" "}
          </Link>
          <ul>
            <li>
              <Link to="/">
                <span style={{ fontSize: "14px" }}>English</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span style={{ fontSize: "14px" }}>Arabic</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/cart">
            <FaShoppingCart className="react-icons" />
            <CartQty>{cart.length || 0}</CartQty>
          </Link>
        </li>
        {!user ? (
          <li>
            <Link to="/signin">
              <FaSignInAlt className="react-icons" />
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                Sign In
              </span>
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/">
              <FaUser className="react-icons" />
              <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                {user.username}
              </span>
              <MdArrowDropDown className="react-icons" />{" "}
            </Link>
            <ul>
              {user && user.username === "admin" && (
                <li>
                  <Link to="/admin">
                    <FaEdit className="react-icons" />
                    Products
                  </Link>
                </li>
              )}
              <li>
                <Link to="/">
                  <FaUserCircle className="react-icons" />
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/">
                  <MdList className="react-icons" />
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FaSignOutAlt className="react-icons" />
                  Sign Out
                </Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  )
}

const CartQty = styled.span`
  font-weight: bold;
  font-size: 14px;
`

export default Header
