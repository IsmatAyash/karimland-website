import { ApolloClient, InMemoryCache, from } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"
import fetch from "isomorphic-fetch"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"

const httpLink = new createUploadLink({
  uri: `${process.env.GRAPHQL_ENDPOINT}/graphql`,
  fetch,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)

    if (typeof window !== "undefined" && !window.navigator.online)
      alert("Check your internet connection or browser")
    else alert("Some other Network Error occured.")
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  }
})

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})
