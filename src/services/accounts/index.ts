import { ApolloServer } from 'apollo-server';
import { buildAccountsSchema } from './schema';

const startAccountsService = async (): Promise<void> => {
  const server = new ApolloServer({ schema: await buildAccountsSchema() });

  const port = (process.env.ACCOUNTS_SERVICE_PORT || 4001) as number;

  server.listen(port).then(({ url }) => {
    console.log(`accounts service running at ${url}`);
  });
};

startAccountsService();
