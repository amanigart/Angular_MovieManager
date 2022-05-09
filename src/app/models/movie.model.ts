import { Actor } from "./actor.model";
import { Person } from "./person.model";

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  realisator: Person;
  scenarist: Person;
  actors: Actor[];
}
