import bcrypt from 'bcrypt';
import User from '../users.interfaces';
import { Context, Resolver } from '../../types';
import { protectResolver } from '../users.utils';

const createUser: Resolver = async (
  _root,
  { firstName, lastName, username, email, password, bio, avatar }: User,
  { client }: Context,
) => {
  try {
    const existingUser = await client.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new Error('이미 존재하는 사용자입니다.');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = client.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hash,
        bio,
        avatar,
      },
    });

    if (!user) {
      throw new Error('사용자를 생성할 수 없습니다.');
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
  }
};

export default {
  Mutation: {
    createUser: protectResolver(createUser),
  },
};
