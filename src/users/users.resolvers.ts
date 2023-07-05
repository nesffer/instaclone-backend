import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Query: {
    async getUser(_root, { username }, { client }) {
      return client.user.findUnique({ where: { username } });
    },
    async getUsers(_root, _args, { client }) {
      return client.user.findMany();
    },
  },
};

export default resolvers;
