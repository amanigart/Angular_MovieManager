import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comment, CommentToApi } from '../models/comment.model';
import { API_URL } from './api.injectables';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private _newCommentEvent$: Subject<boolean> = new Subject();
  private _deleteCommentEvent$: Subject<boolean> = new Subject();

  get newCommentEvent$(): Observable<boolean> {
    return this._newCommentEvent$.asObservable();
  }
  get deleteCommentEvent$(): Observable<boolean> {
    return this._deleteCommentEvent$.asObservable();
  }

  constructor(private _http: HttpClient) {}

  getMovieComments(id: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(API_URL + `Comment/${id}`);
  }

  createComment(comment: CommentToApi): void {
    this._http.post<CommentToApi>(API_URL + 'Comment', comment)
    .subscribe({
      next: () => this._newCommentEvent$.next(true),
      error: () => this._newCommentEvent$.next(false)
    });
  }

  deleteComment(id: number): void {
    this._http.delete(API_URL + `Comment/${id}`).subscribe({
      next: () => this._deleteCommentEvent$.next(true),
      error: () => this._deleteCommentEvent$.next(false)
    })
  }
}
