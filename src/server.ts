import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => [
      { id: 1, title: "Hello", year: 2021 },
      { id: 2, title: "Hello", year: 2022 },
    ],
    movie: () => ({ id: 1, title: "Hello", year: 2021 }),
  },
  Mutation: {
    createMovie: (_: any, { title }: { title: string }): boolean => {
      console.log(title);
      return true;
    },
    deleteMovie: (_: any, { title }: { title: string }): boolean => {
      console.log(title);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
