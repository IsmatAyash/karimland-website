import React, { useState, useContext } from "react"
import { AmplifySignOut } from "@aws-amplify/ui-react"
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
import Modal from "./Modal"
import Auth from "@aws-amplify/auth"

const Header = () => {
  const { user } = useContext(UserContext)
  const { cart, total } = useContext(CartContext)
  const [showCart, setShowCart] = useState(false)

  return (
    <div className="header-bar">
      {showCart && <Modal closeModal={setShowCart} />}
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
          <button
            disabled={total === 0}
            small
            onClick={() => setShowCart(true)}
          >
            <FaShoppingCart className="react-icons" />
            <CartQty>{cart.length || 0}</CartQty>
          </button>
        </li>
        {!user ? (
          <li>
            <button
              style={{ fontSize: 14, color: "var(--white)" }}
              small
              onClick={() => Auth.signIn()}
            >
              <FaSignInAlt style={{ marginRight: 5 }} />
              Sign In
            </button>
            {/* <Link to="/signin">
        <FaSignInAlt className="react-icons" />
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>
          Sign In
        </span>
      </Link> */}
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
                <AmplifySignOut buttonText="Sign Out"></AmplifySignOut>
                {/* <Link to="/">
            <FaSignOutAlt className="react-icons" />
            Sign Out
          </Link> */}
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
  color: var(--grey-100);
`

export default Header
