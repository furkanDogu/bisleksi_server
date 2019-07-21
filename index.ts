import { ApolloServer } from "apollo-server";
import schema from "./src/schema";

const server = new ApolloServer({
  schema,
  playground: true
});

server.listen({ port: 5060 }).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
