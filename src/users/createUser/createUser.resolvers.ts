import bcrypt from "bcrypt";
import User from "../users.interfaces";
import client from "../../client";

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

        const user = client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hash,
          },
        });

        if (!user) {
          throw new Error("사용자를 생성할 수 없습니다.");
        }

        return { ok: true, user };
      } catch (error) {
        if (error instanceof Error) {
          return { ok: false, error: error.message };
        }
      }
    },
  },
};
