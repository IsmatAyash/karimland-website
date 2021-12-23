import React, { useState } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { FaHome, FaBlog, FaInfoCircle } from "react-icons/fa"
import { GiFruitBowl, GiTomato, GiPhone } from "react-icons/gi"
import { FiAlignJustify } from "react-icons/fi"

import {
  NavBar,
  NavbarCtr,
  NavItem,
  MobileBtn,
  NavMenu,
  LinkImage,
} from "./NavbarElements"
import MenuLink from "./MenuLink"

const links = [
  { path: "/home", name: "home", icon: <FaHome style={{ marginRight: 3 }} /> },
  {
    path: "/products",
    name: "vegetables",
    sku: "Veges",
    icon: <GiTomato style={{ marginRight: 3 }} />,
  },
  {
    path: "/products",
    name: "fruits",
    sku: "Fruit",
    icon: <GiFruitBowl style={{ marginRight: 3 }} />,
  },
  {
    path: "/blogs",
    name: "blogs",
    icon: <FaBlog style={{ marginRight: 3 }} />,
  },
  {
    path: "/about",
    name: "about",
    icon: <FaInfoCircle style={{ marginRight: 3 }} />,
  },
  {
    path: "/contact",
    name: "contact",
    icon: <GiPhone style={{ marginRight: 3 }} />,
  },
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
            src="../../assets/images/logo.jpg"
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
                  sku={lk.sku}
                  onShow={() => setShowLinks(false)}
                  name={lk.name}
                  path={lk.path}
                />
              </NavItem>
            )
          })}
        </NavMenu>
      </NavbarCtr>
    </NavBar>
  )
}

export default Navbar
