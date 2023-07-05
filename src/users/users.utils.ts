import jwt from 'jsonwebtoken';
import client from '../client';
import { Context, Resolver } from '../types';

export const getUser = async (authorization: string) => {
  try {
    if (!authorization) return null;
    const token = authorization.split(' ')[1];
    const secretKey = process.env.SECRET_KEY || '';
    const verifiedToken = jwt.verify(token, secretKey);
    const id: number = (verifiedToken as { id: number }).id;
    const user = await client.user.findUnique({ where: { id } });
    if (!user) return null;
    return user;
  } catch (error) {
    return null;
  }
};

// 클로저를 이용한 Resolver 보호
export const protectedResolver = (resolver: Resolver) => (root: any, args: any, context: Context, info: any) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: '로그인이 필요합니다.',
    };
  }

  return resolver(root, args, context, info);
};
