import { getUser } from './users/users.utils';

require('dotenv').config();
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from './schema';
import client from './client';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from '@apollo/server/standalone';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
  csrfPrevention: true,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      loggedInUser: await getUser(<string>req.headers.authorization),
      client,
    }),
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
