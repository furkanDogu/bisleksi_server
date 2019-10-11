import "module-alias/register";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";

import env from "./src/appConfig";
import schema from "./src/graphql";
import refreshTokenRouter from "./src/graphql/mutations/auth";
import initMongo from "./src/database/mongoDB";

(async () => {
  const app = express();

  app.use(cors());

  await initMongo();
  const apolloServer = new ApolloServer({
    schema,
    playground: Boolean(env.has_playground),
    context: context => ({
      ...context
    })
  });

  app.use("/", refreshTokenRouter);
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`🚀  Server ready at 4000`);
  });
})();
