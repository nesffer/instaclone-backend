import client from "../client";
import Movie from "./movies.interfaces";

export default {
  Mutation: {
    createMovie: (_: void, { title, year, genre }: Movie) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    updateMovie: (_: void, { id, title, year, genre }: Movie) =>
      client.movie.update({
        where: { id },
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_: void, { id }: Movie) =>
      client.movie.delete({ where: { id } }),
  },
};
