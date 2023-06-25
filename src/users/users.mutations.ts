import client from "../client";
import User from "./users.interfaces";
import bcrypt from "bcrypt";

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

        // FIXME: JWT Token 발행으로 수정
        return { ok: true, token: "Coming soon!" };
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
