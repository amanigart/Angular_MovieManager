import { Movie } from "./movie.model";

export interface PersonDetails {
  id: number;
  lastName: string;
  firstName: string;
  realMovies: Movie[];
  scenMovies: Movie[];
  actAs: [{
    role: string;
    movieTitle: string;
    movieID: number;
  }]
}
