import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../users.interfaces.js';
import client from '../../client.js';
import { Resolvers } from '../../types.js';

const resolvers: Resolvers = {
  Mutation: {
    async login(_root: void, { username, password }: User) {
      try {
        const user = await client.user.findUnique({ where: { username } });

        if (!user) {
          throw new Error('존재하지 않는 사용자입니다.');
        }

        const passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) {
          throw new Error('비밀번호가 틀렸습니다.');
        }

        const payload = { id: user.id };
        const secretKey = process.env.SECRET_KEY;
        const expiresIn = process.env.EXPIRES_IN;

        if (!secretKey || !expiresIn) {
          throw new Error('환경변수가 설정되어 있지 않습니다.');
        }

        const token = jwt.sign(payload, secretKey, { expiresIn });

        return { ok: true, token };
      } catch (error: any) {
        return { ok: false, error: error.message };
      }
    },
  },
};

export default resolvers;
