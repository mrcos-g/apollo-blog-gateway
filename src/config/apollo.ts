import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import app from './app';

@Resolver()
class HelloResolver {
  @Query(() => String)
  public async hello() {
    return 'hello world';
  }
}

const startServer = async (): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({ schema });

  const port = (process.env.PORT || 4000) as number;

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

export default startServer;
