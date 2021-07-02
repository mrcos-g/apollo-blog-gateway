import express, { ErrorRequestHandler } from 'express';
import jwt from 'express-jwt';
import JwksClient from 'jwks-rsa';

const app = express();

const jwtCheck = jwt({
  secret: JwksClient.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ['RS256'],
  credentialsRequired: false,
});

app.use(jwtCheck, ((error, req, res, next) => {
  if (error.code === 'invalid_token') {
    return next();
  }
  return next(error);
}) as ErrorRequestHandler);

export default app;
