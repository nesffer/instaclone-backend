import client from "../client";
import User from "./users.interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createUser: async (
      _: void,
      { firstName, lastName, username, email, password }: User
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          throw new Error("이미 존재하는 사용자입니다.");
        }

        const hash = await bcrypt.hash(password, 10);

        return client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hash,
          },
        });
      } catch (error) {
        return error;
      }
    },
    login: async (_: void, { username, password }: User) => {
      try {
        const user = await client.user.findUnique({ where: { username } });

        if (!user) {
          throw new Error("존재하지 않는 사용자입니다.");
        }

        const passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) {
          throw new Error("비밀번호가 틀렸습니다.");
        }

        const payload = { id: user.id };
        const secretKey =
          process.env.SECRET_KEY || "AlF8tKm03KI5L1KdMnzxw6KIo7BnMjuj";
        const expiresIn = process.env.EXPIRES_IN || "1d";
        const token = jwt.sign(payload, secretKey, { expiresIn });

        return { ok: true, token };
      } catch (error: unknown) {
        let errorMessage = "";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        return { ok: false, error: errorMessage };
      }
    },
  },
};
