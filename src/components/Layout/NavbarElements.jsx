import styled from "styled-components"
import { Link } from "gatsby"

export const NavBar = styled.nav`
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

export const NavbarCtr = styled.div`
  display: block;
  width: 99%;

  @media screen and (min-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
export const MobileBtn = styled.button`
  display: block;
  padding: 0.15rem 0.5rem;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-40%, 150%);
  cursor: pointer;
  background-color: var(--primary-500);
  color: var(--white);

  > svg {
    font-size: 1.5rem;
  }

  @media screen and (min-width: 992px) {
    display: none;
  }
`

export const NavMenu = styled.ul`
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

export const NavItem = styled.li`
  display: flex;
  justify-content: center;
  height: 50px;
  border-top: 1px solid var(--grey-500);
  width: 100%;
  text-align: center;
  text-decoration: none;

  @media screen and (min-width: 992px) {
    border: none;
  }
`

export const LinkImage = styled(Link)`
  flex: 1;
  margin: 10px;

  > img {
    width: 130px;
    margin-top: 5px;
  }
`
