import React, { useContext } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { UserContext } from "../../context/users"
import { Auth } from "aws-amplify"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext)

  if (!user) {
    navigate("/signin")
    return null
  }

  if (user.username !== "admin") {
    navigate("/")
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

export default PrivateRoute
