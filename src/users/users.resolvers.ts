import { Context, Resolver } from '../types';
import { protectResolver } from './users.utils';
import { User } from '@prisma/client';

const getUser: Resolver = async (_root: any, { username }: User, { client }: Context) => {
  return client.user.findUnique({ where: { username } });
};

const getUsers: Resolver = async (_root: any, _args: any, { client }: Context) => {
  return client.user.findMany();
};

export default {
  Query: {
    getUser: protectResolver(getUser),
    getUsers: protectResolver(getUsers),
  },
};
