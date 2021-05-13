if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

import server from './config/apollo';
import app from './config/app';

const port = (process.env.PORT || 4000) as number;

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});
