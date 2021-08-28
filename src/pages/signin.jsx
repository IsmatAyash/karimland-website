import React, { useEffect, useContext } from "react"
import { Hub, Auth } from "aws-amplify"
import Layout from "../components/Layout"
import { UserContext } from "../context/users"
import { withAuthenticator } from "@aws-amplify/ui-react"

const Signin = () => {
  const { updateUser } = useContext(UserContext)

  useEffect(() => {
    const updUser = async () => {
      try {
        const usr = await Auth.currentAuthenticatedUser()
        updateUser(usr)
      } catch {
        updateUser(null)
      }
    }
    Hub.listen("auth", updUser) // listen for login/signup events

    // we are not using async to wait for updateUser, so there will be a flash of page where the user is assumed not to be logged in. If we use a flag
    updUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove("auth", updUser) // cleanup
  }, [])

  return (
    <Layout>
      <h3>Sign In </h3>
    </Layout>
  )
}

export default withAuthenticator(Signin)
