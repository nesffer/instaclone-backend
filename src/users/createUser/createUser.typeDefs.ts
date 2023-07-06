import gql from 'graphql-tag';

export default gql`
  type CreateUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createUser(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
      bio: String
      avatar: String
    ): CreateUserResult!
  }
`;
