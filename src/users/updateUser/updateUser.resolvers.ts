import { createWriteStream } from 'fs';
import bcrypt from 'bcrypt';
import User from '../users.interfaces.js';
import { Context, Resolver } from '../../types.js';
import { protectResolver } from '../users.utils.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

const updateUser: Resolver = async (
  _root: any,
  { firstName, lastName, username, email, password, bio, avatar }: User,
  { loggedInUser, client }: Context,
) => {
  // avatar 이미지 파일 저장
  const { filename, createReadStream }: any = await avatar;
  const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(`${process.cwd()}/uploads/${newFilename}`);
  readStream.pipe(writeStream);

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
