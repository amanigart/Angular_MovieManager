import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';
import { API_URL } from './api.injectables';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _http: HttpClient) { }

  getAllMovies(): Observable<Movie[]> {
    return this._http.get<Movie[]>(API_URL +'Movie');
  }

  getMovieById(id: number): Observable<Movie> {
    return this._http.get<Movie>(API_URL + `Movie/${id}`);
  }

  // getById(id: number): Observable<Movie> {
  //   return this.getAllMovies().pipe(filter(m => m.id === id))
  // }
}
