export interface Comment {
  id: number;
  content: string;
  postDate: Date;
  userID: number;
  movieID: number;
}

export interface CommentToApi {
  id?: number;
  content: string;
  postDate: string;
  userID: number;
  movieID: number;
}
