import { ApolloServer } from 'apollo-server-express';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import app from './app';

export interface IContext {
  user: string;
}

const startServer = async (): Promise<void> => {
  const serviceList = [{ name: 'accounts', url: `http://localhost:4001` }];

  const gateway = new ApolloGateway({
    serviceList,
    buildService({ url }) {
      return new RemoteGraphQLDataSource<IContext>({
        url,
        willSendRequest({ request, context }) {
          if (request && request.http && context.user) {
            request.http.headers.set('user', context.user ? JSON.stringify(context.user) : '');
          }
        },
      });
    },
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ req }) => {
      const user = req.user || '';
      return { user };
    },
  });

  const port = (process.env.PORT || 4000) as number;

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

export default startServer;
