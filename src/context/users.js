import React, { useState, createContext } from "react"

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, updateUser: usr => setUser(usr) }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
