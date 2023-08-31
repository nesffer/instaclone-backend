import dotenv from 'dotenv';
import { getUser } from './users/users.utils.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { resolvers, typeDefs } from './schema.js';
import client from './client.js';

dotenv.config();

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
  csrfPrevention: false,
});

await server.start();

app.use(logger('tiny'));

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  graphqlUploadExpress(),
  expressMiddleware(server, {
    context: async ({ req }) => ({
      loggedInUser: await getUser(<string>req.headers.authorization),
      client,
    }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
