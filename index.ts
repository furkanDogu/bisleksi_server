import "module-alias/register";
import { ApolloServer } from "apollo-server";

import env from "./src/appConfig";
import schema from "./src/graphql";
import initMongo from "./src/database/mongoDB";

initMongo();

const server = new ApolloServer({
  schema,
  playground: Boolean(env.has_playground),
  context: context => ({
    ...context
  })
});

server.listen({ port: 4000 }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
