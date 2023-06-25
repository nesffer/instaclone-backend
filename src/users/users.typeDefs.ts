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
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Query {
    getUser(username: String): User
    getUsers: [User]
  }
  type Mutation {
    createUser(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User
    login(username: String!, password: String!): LoginResult!
  }
`;
