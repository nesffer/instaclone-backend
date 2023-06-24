import client from "../client";

export default {
  Query: {
    getUser: async (_: void, { username }: { username: string }) =>
      client.user.findUnique({ where: { username } }),
    getUsers: async () => client.user.findMany(),
  },
};
