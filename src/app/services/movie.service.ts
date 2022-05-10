import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Movie, MovieToApi } from '../models/movie.model';
import { API_URL } from './api.injectables';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _deleteOperationSuccessful: Subject<boolean> = new Subject();

  get deleteOperationSuccessful(): Observable<boolean> {
    return this._deleteOperationSuccessful.asObservable();
  }

  constructor(private _http: HttpClient) { }

  getAllMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(API_URL +'Movie');
  }

  getMovieById(id: number): Observable<Movie> {
    return this._http.get<Movie>(API_URL + `Movie/${id}`);
  }

  createMovie(movie: MovieToApi): void {
    this._http.post(API_URL + 'Movie', movie, {responseType: 'text'}).subscribe({
      next: () => console.log(movie),
      error: (error) => console.log(error)
    });
  }

  deleteMovie(id: number): void {
    this._http.delete(API_URL + `Movie/${id}`, {responseType: 'text'}).subscribe({
      next: () => {
        this._deleteOperationSuccessful.next(true);
      },
      error: (error) => {
        console.log(error);
        this._deleteOperationSuccessful.next(false);
      }
    });
  }

}
