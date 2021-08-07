import React, { useState } from "react"
import { Link } from "gatsby"
import { FaHome, FaBlog, FaInfoCircle } from "react-icons/fa"
import { GiFruitBowl, GiTomato, GiPhone } from "react-icons/gi"
import { FiAlignJustify } from "react-icons/fi"
import MenuLink from "./MenuLink"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const links = [
  { name: "home", icon: <FaHome style={{ marginRight: 3 }} /> },
  { name: "vegetables", icon: <GiTomato style={{ marginRight: 3 }} /> },
  { name: "fruits", icon: <GiFruitBowl style={{ marginRight: 3 }} /> },
  // { name: "shopping", icon: <FaShoppingCart style={{ marginRight: 3 }} /> },
  { name: "blogs", icon: <FaBlog style={{ marginRight: 3 }} /> },
  { name: "about", icon: <FaInfoCircle style={{ marginRight: 3 }} /> },
  { name: "contact", icon: <GiPhone style={{ marginRight: 3 }} /> },
]

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false)

  const toggle = () => {
    setShowLinks(!showLinks)
  }

  const width = 120
  const height = 90
  return (
    <NavBar showLinks={showLinks}>
      <NavbarCtr>
        <LinkImage to="/">
          <StaticImage
            width={width}
            height={height}
            src="../assets/images/logo.jpg"
            alt="karimland logo"
          />
        </LinkImage>
        <MobileBtn onClick={toggle}>
          <FiAlignJustify />
        </MobileBtn>
        <NavMenu showLinks={showLinks}>
          {links.map(lk => {
            return (
              <NavItem key={lk.name}>
                <MenuLink
                  icon={lk.icon}
                  onShow={() => setShowLinks(false)}
                  name={lk.name}
                />
              </NavItem>
            )
          })}
        </NavMenu>
      </NavbarCtr>
    </NavBar>
  )
}

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
  top: 0;
  z-index: 10;
  height: ${({ showLinks }) => (showLinks ? "32rem" : "7rem")};
  margin-bottom: 10px;

  @media screen and (min-width: 992px) {
    justify-content: center;
    align-items: center;
    transition: 0.8s all ease;
    background-color: var(--white);
    height: 7rem;
  }
`

const NavbarCtr = styled.div`
  display: block;
  width: 99%;

  @media screen and (min-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const MobileBtn = styled.button`
  display: block;
  padding: 0.15rem 0.5rem;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-40%, 150%);
  cursor: pointer;

  > svg {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 992px) {
    display: none;
  }
`

const NavMenu = styled.ul`
  display: ${({ showLinks }) => (showLinks ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  height: 100%;

  @media screen and (min-width: 992px) {
    display: flex;
    flex-direction: row;
  }
`

const NavItem = styled.li`
  display: flex;
  justify-content: center;
  height: 50px;
  border-top: 1px solid var(--grey-500);
  width: 100%;
  text-align: center;

  @media screen and (min-width: 992px) {
    border: none;
  }
`

const LinkImage = styled(Link)`
  flex: 1;
  margin: 10px;

  > img {
    width: 130px;
    margin-top: 5px;
  }
`
export default Navbar
