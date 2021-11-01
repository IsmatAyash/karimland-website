import { not, and, or, rule, shield } from "graphql-shield"

function checkPermission(user, permission) {
  if (user && user["https://spaceapi.com/graphql"]) {
    return user["https://spaceapi.com/graphql"].permissions.includes(permission)
  }
  return false
}

function checkRole(user, role) {
  if (user && user["https://spaceapi.com/graphql"]) {
    return user["https://spaceapi.com/graphql"].role === role
  }
  return false
}

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null
})

const isAdmin = rule()((parent, args, { user }) => {
  return checkRole(user, "admin")
})

const isSeller = rule()((parent, args, { user }) => {
  return checkRole(user, "seller") === role
})

const canReadAnyUser = rule()((parent, args, { user }) => {
  return checkPermission(user, "read:any_user")
})

const canReadOwnUser = rule()((parent, args, { user }) => {
  return checkPermission(user, "read:own_user")
})

const isReadingOwnUser = rule()((parent, { id }, { user }) => {
  return user && user.sub === id
})

export default shield({
  Query: {
    users: or(
      and(isAuthenticated, isReadingOwnUser, canReadOwnUser),
      and(isAuthenticated, isAdmin)
    ),
    getUser: or(
      and(isAuthenticated, isReadingOwnUser, canReadOwnUser),
      and(isAuthenticated, isAdmin)
    ),
  },
  Mutation: {
    registerUser: and(isAuthenticated, isAdmin),
    createProduct: and(isAuthenticated, or(isAdmin, isSeller)),
  },
})
