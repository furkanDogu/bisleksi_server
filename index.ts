import "module-alias/register";
import { ApolloServer } from "apollo-server";
import schema from "./src/composedSchema";

import initMongo from "./src/utils/mongoDB";

initMongo();

const server = new ApolloServer({
  schema,
  playground: true
});

server.listen({ port: 5060 }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
