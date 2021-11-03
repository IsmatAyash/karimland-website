import { error, success } from "consola"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { applyMiddleware } from "graphql-middleware"
import expressJwt from "express-jwt"
import mongoose from "mongoose"
import { join } from "path"

import { PORT, IN_PROD, DB, BASE_URL, SECRET } from "./config"
import { resolvers, typeDefs } from "./graphql"
import * as AppModels from "./models"
import permissions from "./graphql/permissions"

const startServer = async () => {
  try {
    const app = express()
    app.use(express.static(join(__dirname, "./uploads")))
    app.use(
      expressJwt({
        secret: SECRET,
        algorithms: ["HS256"],
        credentialsRequired: false,
      })
    )

    mongoose.set("debug", !IN_PROD)
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    success({ badge: true, message: `🚀 DB Connected Successfully` })

    const server = new ApolloServer({
      schema: applyMiddleware(
        makeExecutableSchema({ typeDefs, resolvers }),
        permissions
      ),
      context: ({ req }) => {
        const user = req.user || null
        return { user, ...AppModels }
      },
      plugins: [
        IN_PROD
          ? ApolloServerPluginLandingPageGraphQLPlayground()
          : ApolloServerPluginLandingPageDisabled(),
      ],
    })

    await server.start()
    server.applyMiddleware({ app })

    app.listen(PORT, () =>
      success({
        badge: true,
        message: `🚀 Server started on ${BASE_URL}${PORT}${server.graphqlPath}`,
      })
    )
  } catch (err) {
    error({ badge: true, message: err.message })
  }
}

startServer()
