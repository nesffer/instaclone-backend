import gql from 'graphql-tag';

export default gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    password: String!
    bio: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    getUser(username: String): User
    getUsers: [User]
  }
`;
