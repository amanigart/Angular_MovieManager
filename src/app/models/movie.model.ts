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

export interface MovieToApi {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  realisatorID: number;
  scenaristID: number;
}

export interface MovieDropDown {
  id: number,
  title: string;
}
