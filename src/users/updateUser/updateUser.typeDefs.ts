import gql from 'graphql-tag';

export default gql`
  type UpdateUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateUser(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: String
    ): UpdateUserResult!
  }
`;
