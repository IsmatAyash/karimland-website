import { isApolloError } from "@apollo/client"

export function inputErrHandler(err) {
  if (isApolloError(err)) {
    if (
      err.networkError &&
      typeof window !== "undefined" &&
      !window.navigator.online
    ) {
      return {
        errMsg: "No internet connection, please check your borwser?",
        valErr: [],
      }
    } else {
      for (const gqlErr of err.graphQLErrors) {
        if (gqlErr.extensions?.code === "BAD_USER_INPUT")
          return { errMsg: err.message, valErr: [] }
        if (gqlErr.extensions?.code === "INTERNAL_SERVER_ERROR") {
          if (Array.isArray(gqlErr.extensions?.exception.inner)) {
            const array = gqlErr.extensions?.exception.inner.map(f => ({
              path: f.path,
              message: f.message,
            }))
            return {
              errMsg: gqlErr.message,
              valErr: { ...normalizeErrors(array) },
            }
          }
        }
      }
    }
  } else return { errMsg: `An error occured ${err}`, valErr: [] }
}

const normalizeErrors = errors => {
  return errors.reduce((acc, val) => {
    acc[val.path] = val.message
    return acc
  }, {})
}
