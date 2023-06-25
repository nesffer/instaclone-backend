import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }
  type updateUserResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Mutation {
    updateUser(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
    ): updateUserResult!
  }
`;
