import client from "../client";
import Movie from "./movies.interfaces";

export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: void, { id }: Movie) =>
      client.movie.findUnique({ where: { id } }),
  },
};
