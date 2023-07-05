import { getUser } from './users/users.utils';

require('dotenv').config();
import { ApolloServer } from 'apollo-server';
import schema from './schema';
import client from './client';

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(<string>req.headers.authorization),
    client,
  }),
});

const PORT: number = parseInt(process.env.PORT || '4000');

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
