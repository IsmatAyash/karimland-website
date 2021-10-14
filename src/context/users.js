import React, { useState, useEffect, createContext } from "react"
import { Auth } from "aws-amplify"

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const forceSignout = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()
        if (user) {
          await Auth.signOut()
          setUser(null)
        }
      } catch {
        setUser(null)
      }
    }
    forceSignout()
  }, [])

  return (
    <UserContext.Provider value={{ user, updateUser: usr => setUser(usr) }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
