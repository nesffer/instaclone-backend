import bcrypt from "bcrypt";
import User from "../users.interfaces";
import client from "../../client";

export default {
  Mutation: {
    updateUser: async (
      _: void,
      { firstName, lastName, username, email, password }: User
    ) => {
      try {
        const hash = await bcrypt.hash(password, 10);

        const user = client.user.update({
          where: { username },
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hash,
          },
        });

        if (!user) {
          throw new Error("사용자 정보를 수정할 수 없습니다.");
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
