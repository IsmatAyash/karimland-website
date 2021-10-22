export const resolvers = {
  Query: {
    hello: () => "Hello from gql",
  },
  Mutation: {
    createCat: (_, { name }) => {
      const kitty = new Cat({ name })
      return kitty.save()
    },
  },
}
