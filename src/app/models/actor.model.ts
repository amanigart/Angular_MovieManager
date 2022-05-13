export interface Actor {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
}

export interface ActorToApi {
  id: number;
  role: string;
  movieId: number,
  personId: number
}
