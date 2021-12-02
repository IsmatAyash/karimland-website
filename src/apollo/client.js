import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client"
import fetch from "isomorphic-fetch"
import { onError } from "@apollo/client/link/error"

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
  // headers: {
  //   Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
  // },
  fetch,
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
})
