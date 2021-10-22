import { ApolloServer, gql } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { typeDefs } from "./models/typeDefs"
import { resolvers } from "./models/resolvers"
import express from "express"
import http from "http"
import mongoose from "mongoose"

async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({ app })
  await mongoose.connect("mongodb://localhost:27017/karimland", {
    useNewUrlParser: true,
  })
  console.log("connected to DB...")
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
