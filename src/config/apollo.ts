import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway } from '@apollo/gateway';
import app from './app';

const startServer = async (): Promise<void> => {
  const serviceList = [{ name: 'accounts', url: `http://localhost:4001` }];

  const gateway = new ApolloGateway({ serviceList });

  const server = new ApolloServer({ gateway, subscriptions: false });

  const port = (process.env.PORT || 4000) as number;

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

export default startServer;
