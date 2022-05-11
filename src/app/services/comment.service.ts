import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { API_URL } from './api.injectables';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http: HttpClient) {}

  getMovieComments(id: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(API_URL + `Comment/${id}`);
  }

  getMovieCommentsIds(): Observable<number[]> {
    return this._http.get<number[]>(API_URL + 'Comment')
  }

  createComment(comment: Comment): void {
    this._http.post(API_URL + 'Comment', comment);
  }
}
