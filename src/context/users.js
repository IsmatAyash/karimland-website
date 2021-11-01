import React, { useState, useEffect, createContext } from "react"

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser({
      email: "ismat.ayash@gmail.com",
      name: "Ismat Ayash",
      password: "$2b$12$Kup4dsmH3z.cMi8kMfiEY.0rNSUzuLKVjMvgA/EbZ1rPlWq1cjZpy",
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, updateUser: usr => setUser(usr) }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
