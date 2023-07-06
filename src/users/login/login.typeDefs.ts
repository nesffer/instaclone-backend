import gql from 'graphql-tag';

export default gql`
  type LoginResult {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;
