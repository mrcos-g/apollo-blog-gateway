import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'world';
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
