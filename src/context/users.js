import React, { useState, useEffect, createContext } from "react"
import { Hub, Auth } from "aws-amplify"

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const updUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        setUser({
          id: user.attributes.sub,
          username: user.username,
          email: user.attributes.email,
        })
      } catch {
        setUser(null)
      }
    }
    Hub.listen("auth", updUser) // listen for login/signup events

    // we are not using async to wait for updateUser, so there will be a flash of page where the user is assumed not to be logged in. If we use a flag
    updUser() // check manually the first time because we won't get a Hub event
    return () => Hub.remove("auth", updUser) // cleanup
  }, [])

  return (
    <UserContext.Provider value={{ user, updateUser: usr => setUser(usr) }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
