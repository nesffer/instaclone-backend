import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
    deleteMovie(id: Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: () => client.movie.findFirst(),
  },
  Mutation: {
    createMovie: (_: any, { title, year, genre }: Movie) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    updateMovie: (_: any, { id, title, year, genre }: Movie) =>
      client.movie.update({
        where: { id },
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_: any, { id }: Movie) =>
      client.movie.delete({ where: { id } }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
