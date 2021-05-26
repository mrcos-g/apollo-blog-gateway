if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

import 'reflect-metadata';

import startServer from './config/apollo';

startServer();
