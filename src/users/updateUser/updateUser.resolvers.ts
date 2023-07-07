import bcrypt from 'bcrypt';
import User from '../users.interfaces';
import { Resolver, Context } from '../../types';
import { protectResolver } from '../users.utils';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

const updateUser: Resolver = async (
  _root: any,
  { firstName, lastName, username, email, password, bio, avatar }: User,
  { loggedInUser, client }: Context,
) => {
  if (!loggedInUser) {
    return { ok: false, error: '사용자가 존재하지 않습니다.' };
  }

  try {
    let hash;
    if (password) {
      hash = await bcrypt.hash(password, 10);
    }

    const duplicatedUser = await client.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (duplicatedUser) {
      throw new Error('이미 존재하는 사용자입니다.');
    }

    const updatedUser = await client.user.update({
      where: { id: loggedInUser.id },
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

    if (!updatedUser) {
      throw new Error('사용자 정보를 수정할 수 없습니다.');
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
  }
};

export default {
  Upload: GraphQLUpload,
  Mutation: {
    updateUser: protectResolver(updateUser),
  },
};
