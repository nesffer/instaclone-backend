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
  },
};
